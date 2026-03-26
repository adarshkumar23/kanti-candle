import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dsjcagw6y';
const API_KEY    = process.env.CLOUDINARY_API_KEY    || '592748371292611';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'PYbS1VvvV6vCRyaK3hjP5W9WXbc';

/** SHA-1 sign exactly the params you send — keys sorted, no extras */
function sign(params: Record<string, string>): string {
  const payload = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return createHash('sha1').update(payload + API_SECRET).digest('hex');
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const contentType = request.headers.get('content-type') || '';
    let buffer: Buffer;
    let filename: string;

    if (contentType.includes('multipart/form-data')) {
      /* ── sent as FormData (future-proof) ── */
      const fd   = await request.formData();
      const file = fd.get('file') as File | null;
      if (!file) return NextResponse.json({ error: 'No file field in form' }, { status: 400 });
      buffer   = Buffer.from(await file.arrayBuffer());
      filename = file.name;
    } else {
      /* ── raw binary body: fetch('/api/upload?filename=…', { body: file }) ── */
      const { searchParams } = new URL(request.url);
      filename = searchParams.get('filename') || `upload-${Date.now()}.jpg`;
      const ab = await request.arrayBuffer();
      if (!ab.byteLength)
        return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
      buffer = Buffer.from(ab);
    }

    /* ── Cloudinary signed upload (folder only — no public_id conflict) ── */
    const timestamp = String(Math.round(Date.now() / 1000));
    const folder    = 'kanti-candles';

    // Sign ONLY the params that will be in the form (folder + timestamp)
    const signature = sign({ folder, timestamp });

    const form = new FormData();
    form.append('file',      new Blob([buffer]));
    form.append('api_key',   API_KEY);
    form.append('timestamp', timestamp);
    form.append('folder',    folder);
    form.append('signature', signature);

    const cloudRes  = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: form }
    );
    const cloudData = await cloudRes.json();

    if (!cloudData.secure_url) {
      console.error('[upload] Cloudinary rejected:', cloudData);
      return NextResponse.json(
        { error: cloudData.error?.message || 'Cloudinary upload failed' },
        { status: 500 }
      );
    }

    /* ── save URL to gallery table (non-fatal) ── */
    try {
      await prisma.galleryImage.create({ data: { url: cloudData.secure_url } });
    } catch (dbErr) {
      console.warn('[upload] gallery DB insert skipped:', dbErr);
    }

    return NextResponse.json({ url: cloudData.secure_url, success: true });
  } catch (err: any) {
    console.error('[upload] unexpected error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

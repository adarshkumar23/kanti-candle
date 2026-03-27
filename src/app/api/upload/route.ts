import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dsjcagw6y';
const API_KEY    = process.env.CLOUDINARY_API_KEY    || '592748371292611';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'PYbS1VvvV6vCRyaK3hjP5W9WXbc';

const MIME: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg',
  png: 'image/png',  webp: 'image/webp',
  gif: 'image/gif',  avif: 'image/avif',
};

function sign(params: Record<string, string>): string {
  const payload = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
  return createHash('sha1').update(payload + API_SECRET).digest('hex');
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    /* ── 1. Read the file bytes ── */
    const contentType = request.headers.get('content-type') || '';
    let buffer: Buffer;
    let filename: string;

    if (contentType.includes('multipart/form-data')) {
      const fd   = await request.formData();
      const file = fd.get('file') as File | null;
      if (!file) return NextResponse.json({ error: 'No file field in form' }, { status: 400 });
      buffer   = Buffer.from(await file.arrayBuffer());
      filename = file.name;
    } else {
      // raw binary: fetch('/api/upload?filename=foo.jpg', { method:'POST', body: file })
      const { searchParams } = new URL(request.url);
      filename = searchParams.get('filename') || `upload-${Date.now()}.jpg`;
      const ab = await request.arrayBuffer();
      if (!ab.byteLength)
        return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
      buffer = Buffer.from(ab);
    }

    /* ── 2. Build base64 data URI (most reliable for server→Cloudinary) ── */
    const ext      = filename.split('.').pop()?.toLowerCase() ?? 'jpg';
    const mime     = MIME[ext] ?? 'image/jpeg';
    const dataUri  = `data:${mime};base64,${buffer.toString('base64')}`;

    /* ── 3. Sign upload params ── */
    const timestamp = String(Math.round(Date.now() / 1000));
    const folder    = 'kanti-candles';
    const signature = sign({ folder, timestamp });

    /* ── 4. POST to Cloudinary ── */
    const form = new FormData();
    form.append('file',      dataUri);   // data URI string — always accepted
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
      console.error('[upload] Cloudinary error:', JSON.stringify(cloudData));
      return NextResponse.json(
        { error: cloudData.error?.message || 'Upload to Cloudinary failed' },
        { status: 500 }
      );
    }

    /* ── 5. Save URL in gallery (non-fatal) ── */
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

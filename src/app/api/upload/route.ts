import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CLOUD_NAME  = process.env.CLOUDINARY_CLOUD_NAME  || 'dsjcagw6y';
const API_KEY     = process.env.CLOUDINARY_API_KEY     || '592748371292611';
const API_SECRET  = process.env.CLOUDINARY_API_SECRET  || 'PYbS1VvvV6vCRyaK3hjP5W9WXbc';

function sign(params: Record<string, string>): string {
  const str = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return createHash('sha1').update(str + API_SECRET).digest('hex');
}

export const config = { api: { bodyParser: false } };

export async function POST(request: Request): Promise<NextResponse> {
  try {
    /* ── collect the raw bytes ── */
    const contentType = request.headers.get('content-type') || '';
    let buffer: Buffer;
    let filename: string;

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const file = form.get('file') as File | null;
      if (!file) return NextResponse.json({ error: 'No file in form data' }, { status: 400 });
      buffer   = Buffer.from(await file.arrayBuffer());
      filename = file.name;
    } else {
      // raw binary body (sent by gallery/product uploader via fetch with body: file)
      const { searchParams } = new URL(request.url);
      filename = searchParams.get('filename') || `upload-${Date.now()}.jpg`;
      const ab = await request.arrayBuffer();
      if (!ab.byteLength) return NextResponse.json({ error: 'Empty body received' }, { status: 400 });
      buffer = Buffer.from(ab);
    }

    /* ── build signed upload params ── */
    const timestamp = String(Math.round(Date.now() / 1000));
    const folder    = 'kanti-candles';
    const publicId  = `${folder}/${Date.now()}_${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    const sigParams = { folder, public_id: publicId, timestamp };
    const signature = sign(sigParams);

    /* ── post to Cloudinary ── */
    const form = new FormData();
    form.append('file',       new Blob([buffer]));
    form.append('api_key',    API_KEY);
    form.append('timestamp',  timestamp);
    form.append('folder',     folder);
    form.append('public_id',  publicId);
    form.append('signature',  signature);

    const cloudRes  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: form,
    });
    const cloudData = await cloudRes.json();

    if (!cloudData.secure_url) {
      console.error('Cloudinary error:', cloudData);
      return NextResponse.json(
        { error: cloudData.error?.message || 'Cloudinary upload failed' },
        { status: 500 }
      );
    }

    /* ── persist to gallery (best-effort) ── */
    try {
      await prisma.galleryImage.create({ data: { url: cloudData.secure_url } });
    } catch (dbErr) {
      // not fatal — product uploads don't need a gallery row
      console.warn('DB gallery insert skipped:', dbErr);
    }

    return NextResponse.json({ url: cloudData.secure_url, success: true });
  } catch (err: any) {
    console.error('Upload route error:', err);
    return NextResponse.json({ error: err.message || 'Unexpected error' }, { status: 500 });
  }
}

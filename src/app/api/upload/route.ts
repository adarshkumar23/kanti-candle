import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(buffer: Buffer, mimeType: string, filename: string) {
  const b64 = buffer.toString('base64');
  const dataUri = `data:${mimeType};base64,${b64}`;
  return cloudinary.uploader.upload(dataUri, {
    folder: 'kanti-candles',
    public_id: filename.replace(/\.[^.]+$/, ''),
    overwrite: false,
    unique_filename: true,
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ error: 'Storage not configured.' }, { status: 503 });
    }

    const contentType = request.headers.get('content-type') || '';
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || `upload-${Date.now()}.jpg`;

    let buffer: Buffer;
    let mimeType: string;

    if (contentType.includes('multipart/form-data')) {
      // FormData upload (e.g. from admin products page)
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (!file) return NextResponse.json({ error: 'No file in form data.' }, { status: 400 });
      buffer = Buffer.from(await file.arrayBuffer());
      mimeType = file.type || 'image/jpeg';
    } else {
      // Raw binary upload (e.g. fetch with body: file)
      buffer = Buffer.from(await request.arrayBuffer());
      mimeType = contentType.split(';')[0] || 'image/jpeg';
    }

    const result = await uploadToCloudinary(buffer, mimeType, filename);

    try { await prisma.galleryImage.create({ data: { url: result.secure_url } }); } catch {}

    return NextResponse.json({ url: result.secure_url, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

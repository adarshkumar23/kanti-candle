import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ error: 'Storage not configured.' }, { status: 503 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      // Try raw body upload (filename in query)
      const { searchParams } = new URL(request.url);
      const filename = searchParams.get('filename') || `upload-${Date.now()}.jpg`;
      const buffer = Buffer.from(await request.arrayBuffer());
      const b64 = buffer.toString('base64');
      const dataUri = `data:image/jpeg;base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'kanti-candles',
        public_id: filename.replace(/\.[^.]+$/, ''),
        overwrite: false,
        unique_filename: true,
      });
      try { await prisma.galleryImage.create({ data: { url: result.secure_url } }); } catch {}
      return NextResponse.json({ url: result.secure_url, success: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const b64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'kanti-candles',
      overwrite: false,
      unique_filename: true,
    });
    try { await prisma.galleryImage.create({ data: { url: result.secure_url } }); } catch {}
    return NextResponse.json({ url: result.secure_url, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

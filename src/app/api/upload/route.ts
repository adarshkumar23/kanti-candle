import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN is not configured. Go to your Vercel project → Storage → Create Blob Store, then redeploy." },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || 'admin-upload.jpg';

    if (!request.body) {
      return NextResponse.json({ error: "No file body received" }, { status: 400 });
    }

    const blob = await put(filename, request.body, {
      access: 'public',
    });

    await prisma.galleryImage.create({ data: { url: blob.url } });

    return NextResponse.json(blob);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

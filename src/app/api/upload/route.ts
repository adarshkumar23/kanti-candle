import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Support both naming conventions: custom store prefix or default
    const token =
      process.env.kanticandles_READ_WRITE_TOKEN ||
      process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: 'Storage not configured. Add kanticandles_READ_WRITE_TOKEN to your environment variables and redeploy.' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || `upload-${Date.now()}.jpg`;

    if (!request.body) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    const blob = await put(filename, request.body, { access: 'public', token, addRandomSuffix: true });

    await prisma.galleryImage.create({ data: { url: blob.url } });

    return NextResponse.json({ url: blob.url, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || 'admin-upload.jpg';

    if (!request.body) {
      return NextResponse.json({ error: "No file body to upload" }, { status: 400 });
    }

    const blob = await put(filename, request.body, {
      access: 'public',
    });

    // Save strictly to the Postgres Cloud DB natively 
    await prisma.galleryImage.create({ data: { url: blob.url } });

    return NextResponse.json(blob);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

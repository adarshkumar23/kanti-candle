import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This endpoint just saves an already-uploaded image URL to the DB.
// The actual file upload happens client-side to Cloudinary (no token needed).
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    await prisma.galleryImage.create({ data: { url } });

    return NextResponse.json({ url, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

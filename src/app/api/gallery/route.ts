import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(images);
  } catch (err: any) {
    console.error('[gallery GET]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: 'url is required' }, { status: 400 });

    const image = await prisma.galleryImage.create({ data: { url } });
    return NextResponse.json(image);
  } catch (err: any) {
    console.error('[gallery POST]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[gallery DELETE]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

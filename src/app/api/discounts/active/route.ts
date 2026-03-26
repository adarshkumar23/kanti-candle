import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// GET active discounts visible to customers (for product pages / banners)
export async function GET() {
  try {
    const now = new Date();
    const discounts = await prisma.discount.findMany({
      where: {
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } },
        ],
      },
      select: {
        id: true,
        code: true,
        description: true,
        type: true,
        value: true,
        minOrder: true,
        appliesToAll: true,
        categories: true,
        expiresAt: true,
      },
      orderBy: { value: "desc" },
    });

    return NextResponse.json(discounts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

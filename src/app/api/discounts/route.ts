import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// GET all discounts (admin listing)
export async function GET() {
  try {
    const discounts = await prisma.discount.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(discounts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST - create new discount
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, description, type, value, minOrder, maxUses, isActive, appliesToAll, categories, expiresAt } = body;

    if (!code || !value) {
      return NextResponse.json({ error: "Code and value are required" }, { status: 400 });
    }

    // Check for duplicate code
    const existing = await prisma.discount.findUnique({ where: { code: code.toUpperCase() } });
    if (existing) {
      return NextResponse.json({ error: "A discount with this code already exists" }, { status: 409 });
    }

    const discount = await prisma.discount.create({
      data: {
        code: code.toUpperCase(),
        description: description || null,
        type: type || "percentage",
        value: parseFloat(value),
        minOrder: minOrder ? parseFloat(minOrder) : 0,
        maxUses: maxUses ? parseInt(maxUses) : 0,
        isActive: isActive !== false,
        appliesToAll: appliesToAll !== false,
        categories: categories || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json(discount);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE a discount
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Discount ID is required" }, { status: 400 });
    }

    await prisma.discount.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH - toggle active status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "Discount ID is required" }, { status: 400 });
    }

    const discount = await prisma.discount.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(discount);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// POST - validate a discount code for the cart
export async function POST(request: Request) {
  try {
    const { code, cartTotal, categories } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Discount code is required" }, { status: 400 });
    }

    const discount = await prisma.discount.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!discount) {
      return NextResponse.json({ error: "Invalid discount code" }, { status: 404 });
    }

    if (!discount.isActive) {
      return NextResponse.json({ error: "This discount code is no longer active" }, { status: 400 });
    }

    if (discount.expiresAt && new Date(discount.expiresAt) < new Date()) {
      return NextResponse.json({ error: "This discount code has expired" }, { status: 400 });
    }

    if (discount.maxUses > 0 && discount.usedCount >= discount.maxUses) {
      return NextResponse.json({ error: "This discount code has reached its usage limit" }, { status: 400 });
    }

    if (cartTotal && discount.minOrder > 0 && cartTotal < discount.minOrder) {
      return NextResponse.json({
        error: `Minimum order of ₹${discount.minOrder.toLocaleString("en-IN")} required for this code`,
      }, { status: 400 });
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (discount.type === "percentage") {
      discountAmount = Math.round((cartTotal || 0) * (discount.value / 100));
    } else {
      discountAmount = discount.value;
    }

    // Increment used count
    await prisma.discount.update({
      where: { id: discount.id },
      data: { usedCount: discount.usedCount + 1 },
    });

    return NextResponse.json({
      valid: true,
      discount: {
        id: discount.id,
        code: discount.code,
        description: discount.description,
        type: discount.type,
        value: discount.value,
        discountAmount,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

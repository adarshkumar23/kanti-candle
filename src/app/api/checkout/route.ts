import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      throw new Error("Razorpay keys are missing in environment variables.");
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const { amount, receipt } = await request.json();

    // Amount must be in the smallest currency unit (paise for INR)
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order });
  } catch (err: any) {
    console.error("Razorpay Order Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

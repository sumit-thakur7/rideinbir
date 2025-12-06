import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    
    // FIX: Amount needs to be in paise (x 100)
    const amountInPaisa = Math.round(amount * 100); 

    const order = await razorpay.orders.create({
      amount: amountInPaisa,
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}

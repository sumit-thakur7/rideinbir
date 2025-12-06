import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/db';
import Booking from '@/lib/models/Booking';
import User from '@/lib/models/User';

export async function POST(req: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      bookingDetails 
    } = await req.json();

    await connectDB();

    // 1. Signature Verify
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
    }

    // 2. Find or Create User
    let user = await User.findOne({ email: bookingDetails.email });

    if (!user) {
      user = await User.create({
        name: bookingDetails.name,
        email: bookingDetails.email,
        role: 'user',
        password: 'generated_pass_' + Math.random().toString(36)
      });
    }

    // 3. Save Booking
    const newBooking = await Booking.create({
      userId: user._id,
      service: bookingDetails.packageName,
      date: new Date(bookingDetails.date),
      amount: bookingDetails.amount,
      status: 'confirmed',
      paymentStatus: 'paid',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      guests: bookingDetails.guests
    });

    return NextResponse.json({ success: true, bookingId: newBooking._id }, { status: 200 });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

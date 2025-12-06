import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const RideBooking = mongoose.models.RideBooking;

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // FIX: Email ko Lowercase mein convert karke search karo
    const cleanEmail = email.toLowerCase().trim();

    const myBookings = await RideBooking.find({ userEmail: cleanEmail }).sort({ createdAt: -1 });
    
    return NextResponse.json(myBookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const RideBooking = mongoose.models.RideBooking;

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const params = await props.params; // Await params for Next.js 15
    const booking = await RideBooking.findById(params.id);
    
    if (!booking) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

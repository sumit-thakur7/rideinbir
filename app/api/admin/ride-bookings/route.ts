import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const RideBookingSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  phone: String,
  vehicles: Array,
  totalAmount: Number,
  paidAmount: Number,
  paymentMode: String,
  startDate: String,
  days: Number,
  status: { type: String, default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now },
});

const RideBooking = mongoose.models.RideBooking || mongoose.model('RideBooking', RideBookingSchema, 'ridebookings');

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export async function GET() {
  await connectDB();
  const bookings = await RideBooking.find({}).sort({ createdAt: -1 });
  return NextResponse.json(bookings);
}

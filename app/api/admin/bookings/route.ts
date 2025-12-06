import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'

export async function GET() {
  try {
    await connectDB()
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
    
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

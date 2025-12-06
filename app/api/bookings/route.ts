import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.config'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    // Fetch bookings for current user
    const bookings = await Booking.find({ 
      userId: session.user.id 
    }).sort({ createdAt: -1 })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Bookings fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { service, date, amount } = await req.json()

    if (!service || !date || !amount) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    await connectDB()

    const booking = await Booking.create({
      userId: session.user.id,
      service,
      date,
      amount,
      status: 'pending',
      paymentStatus: 'unpaid'
    })

    return NextResponse.json({ 
      message: 'Booking created successfully',
      booking 
    }, { status: 201 })
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

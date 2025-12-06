import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'

type Props = {
  params: Promise<{ id: string }>
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    const body = await req.json()
    
    await connectDB()
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json(updatedBooking)
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    
    await connectDB()
    const deletedBooking = await Booking.findByIdAndDelete(id)

    if (!deletedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Booking deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Pilot from '@/lib/models/Pilot'

type Props = {
  params: Promise<{ id: string }>
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    const body = await req.json()
    
    await connectDB()
    
    const updatedPilot = await Pilot.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )

    if (!updatedPilot) {
      return NextResponse.json({ error: 'Pilot not found' }, { status: 404 })
    }

    return NextResponse.json(updatedPilot)
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    
    await connectDB()
    const deletedPilot = await Pilot.findByIdAndDelete(id)

    if (!deletedPilot) {
      return NextResponse.json({ error: 'Pilot not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Pilot deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

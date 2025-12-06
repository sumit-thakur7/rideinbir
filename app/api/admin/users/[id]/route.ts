import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

type Props = {
  params: Promise<{ id: string }>
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    const body = await req.json()
    
    await connectDB()
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).select('-password')

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    
    await connectDB()
    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'User deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

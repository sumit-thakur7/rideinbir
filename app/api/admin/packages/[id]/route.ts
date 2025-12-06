import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Package from '@/lib/models/Package'

type Props = {
  params: Promise<{ id: string }>
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    const body = await req.json()
    
    await connectDB()
    
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )

    if (!updatedPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    return NextResponse.json(updatedPackage)
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    
    await connectDB()
    const deletedPackage = await Package.findByIdAndDelete(id)

    if (!deletedPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Package deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Package from '@/lib/models/Package'

export async function GET() {
  try {
    await connectDB()
    const packages = await Package.find({ isActive: true }).sort({ price: 1 })
    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}

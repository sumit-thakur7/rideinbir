import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Pilot from '@/lib/models/Pilot'

export async function GET() {
  try {
    await connectDB()
    const pilots = await Pilot.find().sort({ createdAt: -1 })
    return NextResponse.json(pilots)
  } catch (error) {
    console.error('Error fetching pilots:', error)
    return NextResponse.json({ error: 'Failed to fetch pilots' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    await connectDB()

    // Convert certifications string to array if it's a string
    const certifications = typeof data.certifications === 'string'
      ? data.certifications.split(',').map((cert: string) => cert.trim())
      : data.certifications || []

    const pilot = await Pilot.create({
      ...data,
      certifications
    })

    return NextResponse.json(pilot, { status: 201 })
  } catch (error) {
    console.error('Error creating pilot:', error)
    return NextResponse.json({ error: 'Failed to create pilot' }, { status: 500 })
  }
}

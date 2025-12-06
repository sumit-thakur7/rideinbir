import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Package from '@/lib/models/Package'

// Helper function to convert comma-separated string to array, trimming whitespace
const toArray = (data: any) => 
  typeof data === 'string' 
    ? data.split(',').map((item: string) => item.trim()).filter(item => item.length > 0) 
    : data || []

export async function GET() {
  try {
    await connectDB()
    const packages = await Package.find().sort({ createdAt: -1 })
    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    await connectDB()

    const packageData = await Package.create({
      ...data,
      features: toArray(data.features),
      included: toArray(data.included),
      excluded: toArray(data.excluded),
      // MAPPING NEW FIELDS TO ARRAY
      prerequisites: toArray(data.prerequisites),
      soloFlightExperience: toArray(data.soloFlightExperience),
      trainingProgram: toArray(data.trainingProgram),
      safetyAndSupport: toArray(data.safetyAndSupport),
      whatToBring: toArray(data.whatToBring),
      // END NEW FIELDS
    })

    return NextResponse.json(packageData, { status: 201 })
  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 })
  }
}

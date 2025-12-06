import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'
import Package from '@/lib/models/Package'

export async function GET() {
  try {
    await connectDB()

    // 1. Total Bookings Count
    const totalBookings = await Booking.countDocuments()

    // 2. Total Revenue (Sum of amount)
    const revenueResult = await Booking.aggregate([
      { $match: { paymentStatus: { $ne: 'failed' } } }, // Sirf successful payments jodo
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ])
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0

    // 3. Active Packages Count
    const totalPackages = await Package.countDocuments()

    return NextResponse.json({
      bookings: totalBookings,
      revenue: totalRevenue,
      packages: totalPackages
    })
  } catch (error) {
    console.error('Stats Error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

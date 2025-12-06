import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { connectDB } from '@/lib/db'
import Booking from '@/lib/models/Booking'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle payment success
    if (event.event === 'payment.captured') {
      await connectDB()
      
      const paymentId = event.payload.payment.entity.id
      const orderId = event.payload.payment.entity.order_id

      await Booking.findOneAndUpdate(
        { razorpayOrderId: orderId },
        { 
          paymentStatus: 'paid',
          razorpayPaymentId: paymentId,
          status: 'confirmed'
        }
      )
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}

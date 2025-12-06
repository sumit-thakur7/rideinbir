import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
  amount: { type: Number, required: true },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: { type: Date, default: Date.now }
})

const Booking = mongoose.models?.Booking || mongoose.model('Booking', BookingSchema)

export default Booking

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const RideBookingSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  phone: String,
  vehicles: Array,
  totalAmount: Number,
  paidAmount: Number,
  paymentMode: String,
  paymentId: String,
  startDate: String,
  days: Number,
  status: { type: String, default: 'Confirmed' },
  paymentStatus: String,
  bookedBy: String,
  createdAt: { type: Date, default: Date.now },
});

const RideBooking = mongoose.models.RideBooking || mongoose.model('RideBooking', RideBookingSchema, 'ridebookings');

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Data Cleanup
    const cleanEmail = body.userEmail.toLowerCase().trim();
    const bookedByEmail = body.bookedBy ? body.bookedBy.toLowerCase().trim() : cleanEmail;
    
    // Status Logic
    let finalStatus = 'Pending';
    if (body.paymentMode === 'full') {
        finalStatus = 'Confirmed';
    }

    const bookingData = {
        ...body,
        userEmail: cleanEmail,
        bookedBy: bookedByEmail,
        status: finalStatus,
        paymentStatus: body.paymentMode === 'full' ? 'Paid' : 'Partial'
    };

    // 1. Save to DB
    const newBooking = await RideBooking.create(bookingData);
    const dueAmount = body.totalAmount - body.paidAmount;

    // 2. Send Detailed Email
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        const serviceNames = body.vehicles.map((v:any) => v.name).join(', ');

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #DC2626; padding: 20px; text-align: center; color: white;">
                    <h1 style="margin: 0;">Ride In Bir</h1>
                    <p style="margin: 5px 0 0;">Booking Confirmation</p>
                </div>
                
                <div style="padding: 20px;">
                    <p>Hello <strong>${body.userName}</strong>,</p>
                    <p>Your booking has been successfully received! Here are your complete trip details.</p>

                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-top: 0;">📌 Booking Details</h3>
                        <p><strong>Booking ID:</strong> #${newBooking._id.toString().slice(-6).toUpperCase()}</p>
                        <p><strong>Service/Vehicle:</strong> ${serviceNames}</p>
                        <p><strong>Start Date:</strong> ${body.startDate}</p>
                        <p><strong>Duration:</strong> ${body.days} Days</p>
                    </div>

                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-top: 0;">👤 Customer Info</h3>
                        <p><strong>Name:</strong> ${body.userName}</p>
                        <p><strong>Phone:</strong> ${body.phone}</p>
                        <p><strong>Email:</strong> ${cleanEmail}</p>
                    </div>

                    <div style="background-color: #fff4e5; padding: 15px; border-radius: 8px; border: 1px solid #ffe0b2;">
                        <h3 style="color: #d35400; border-bottom: 1px solid #f5c6cb; padding-bottom: 10px; margin-top: 0;">💰 Payment Summary</h3>
                        <table style="width: 100%;">
                            <tr><td>Total Amount:</td><td style="text-align: right;"><strong>₹${body.totalAmount}</strong></td></tr>
                            <tr><td>Paid Now:</td><td style="text-align: right; color: green;"><strong>- ₹${body.paidAmount}</strong></td></tr>
                            <tr><td style="padding-top: 10px;"><strong>Balance Due:</strong></td><td style="text-align: right; padding-top: 10px; color: #d32f2f; font-size: 18px;"><strong>₹${dueAmount}</strong></td></tr>
                        </table>
                        ${dueAmount > 0 ? '<p style="font-size: 12px; color: #666; text-align: center; margin-top: 10px;">(Please pay the remaining amount at the location)</p>' : '<p style="color: green; text-align: center; font-weight: bold;">Fully Paid ✅</p>'}
                    </div>

                    <p style="text-align: center; margin-top: 30px; color: #888; font-size: 12px;">
                        Thank you for choosing Ride In Bir!<br>
                        Contact us: +91 9876543210
                    </p>
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: '"Ride In Bir" <' + process.env.EMAIL_USER + '>',
            to: cleanEmail, // Client
            bcc: process.env.EMAIL_USER, // Admin (Sumit)
            subject: `Booking #${newBooking._id.toString().slice(-6)} Confirmed - ${body.userName}`,
            html: emailHtml,
        });

        console.log("✅ Detailed Email Sent!");

    } catch (emailError) { console.error("Email Error:", emailError); }
    
    return NextResponse.json({ success: true, bookingId: newBooking._id });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}

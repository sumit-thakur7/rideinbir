import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const RideBooking = mongoose.models.RideBooking;

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

// Email Sender Helper
const sendStatusEmail = async (email: string, name: string, status: string, id: string, amountPaid: number) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        let subject = `Booking Update: #${id.slice(-6)}`;
        let message = `Your booking status has been updated to: <strong>${status}</strong>`;
        
        if (status === 'Completed') {
            subject = `Full Payment Received! - Ride In Bir`;
            message = `
                <h2 style="color: green;">Payment Successful!</h2>
                <p>Thank you <strong>${name}</strong>. We have received your remaining payment.</p>
                <p>Your booking is now <strong>Fully Paid & Completed</strong>.</p>
                <p><strong>Total Paid:</strong> ₹${amountPaid}</p>
                <p>See you soon in Bir!</p>
            `;
        }

        await transporter.sendMail({
            from: '"Ride In Bir" <' + process.env.EMAIL_USER + '>',
            to: email,
            bcc: process.env.EMAIL_USER, // Admin Copy
            subject: subject,
            html: `<div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px;">${message}</div>`
        });
        console.log("Email Sent!");
    } catch (e) { console.error("Email Error:", e); }
};

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const params = await props.params;
    const body = await req.json();
    
    // Update in DB
    const updated = await RideBooking.findByIdAndUpdate(params.id, body, { new: true });

    // Send Email if requested
    if (body.sendEmail && updated) {
        await sendStatusEmail(updated.userEmail, updated.userName, updated.status, updated._id.toString(), updated.paidAmount);
    }
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Update Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const params = await props.params;
    await RideBooking.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete Failed' }, { status: 500 });
  }
}

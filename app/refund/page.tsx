'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPolicy() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-black mb-8 text-red-600">Refund & Cancellation Policy</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Weather Cancellation (100% Refund)</h2>
            <p>Safety is our priority. If paragliding is cancelled due to <strong>bad weather, strong winds, or rain</strong>, you are entitled to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-white">
                <li>A <strong>100% Refund</strong> of your booking amount.</li>
                <li>OR, Reschedule your flight to the next available date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Customer Cancellation</h2>
            <p>If you wish to cancel your booking, the following charges apply:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>7 Days before trip:</strong> 90% Refund.</li>
                <li><strong>3-6 Days before trip:</strong> 50% Refund.</li>
                <li><strong>Less than 48 Hours:</strong> No Refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. Refund Timeline</h2>
            <p>Processed refunds will be credited back to the original source of payment (Bank/UPI/Card) within <strong>5-7 business days</strong>.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}

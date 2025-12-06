'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-black mb-8 text-red-600">Terms & Conditions</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>Welcome to Ride In Bir. By booking an activity with us, you agree to the following terms:</p>
          
          <h3 className="text-lg font-bold text-white">1. Adventure Risk</h3>
          <p>Paragliding, Trekking, and Camping involve inherent risks. While we take all safety measures, Ride In Bir is not liable for accidental injuries caused by factors beyond our control.</p>

          <h3 className="text-lg font-bold text-white">2. Medical Fitness</h3>
          <p>Participants must declare any medical conditions (Heart issues, Epilepsy, Pregnancy) before booking. Pilots reserve the right to deny flight if a guest is deemed unfit or under the influence of alcohol.</p>

          <h3 className="text-lg font-bold text-white">3. Booking & Payment</h3>
          <p>A booking is considered confirmed only after the advance payment is received. The remaining balance must be paid at the time of arrival.</p>

          <h3 className="text-lg font-bold text-white">4. Goverment ID</h3>
          <p>It is mandatory to carry a valid Government ID proof during the activity.</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}

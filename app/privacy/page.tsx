'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-black mb-8 text-red-600">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>At <strong>Ride In Bir</strong>, we are committed to protecting your privacy. This policy outlines how we handle your personal information.</p>
          
          <h3 className="text-lg font-bold text-white">1. Information We Collect</h3>
          <p>We collect information such as your Name, Email, Phone Number, and Payment Details strictly for the purpose of booking your adventure activities.</p>

          <h3 className="text-lg font-bold text-white">2. How We Use Your Data</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>To process bookings and send confirmations.</li>
            <li>To contact you regarding schedule changes or weather updates.</li>
            <li>We <strong>DO NOT</strong> sell or share your data with third-party advertisers.</li>
          </ul>

          <h3 className="text-lg font-bold text-white">3. Payment Security</h3>
          <p>All payments are processed securely through <strong>Razorpay</strong>. We do not store your credit/debit card details on our servers.</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}

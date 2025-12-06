'use client'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactForm() {
  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Info Cards */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
          <p className="text-gray-400 mb-12">
            Reach out to us directly or fill the form. Our team usually responds within 2 hours.
          </p>

          <div className="grid gap-6">
            {/* Phone Card */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-start gap-4 hover:border-red-600 transition-colors group">
              <div className="bg-zinc-800 p-3 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Call Us</h4>
                <p className="text-gray-400 text-sm mb-1">Mon-Sun, 9am - 8pm</p>
                <a href="tel:+919876543210" className="text-white font-bold hover:text-red-500 transition">+91 98159 94420</a><br/>
                <a href="tel:+918894013298" className="text-white font-bold hover:text-red-500 transition">+91 88940 13298</a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-start gap-4 hover:border-red-600 transition-colors group">
              <div className="bg-zinc-800 p-3 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Email Us</h4>
                <p className="text-gray-400 text-sm mb-1">For booking inquiries</p>
                <a href="mailto:hello@rideinbir.com" className="text-white font-bold hover:text-red-500 transition">rideinbir@gmail.com</a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-start gap-4 hover:border-red-600 transition-colors group">
              <div className="bg-zinc-800 p-3 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Visit Office</h4>
                <p className="text-gray-400 text-sm">Near Landing Site, Bir Billing, Himachal Pradesh, 176077</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <h3 className="text-2xl font-black text-black mb-6">Send a Message</h3>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input type="text" placeholder="Your Good name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 text-black transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" placeholder="+91 98..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 text-black transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input type="email" placeholder="" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 text-black transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea rows={4} placeholder="I want to book for 4 people..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 text-black transition-colors"></textarea>
            </div>

            <button className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}

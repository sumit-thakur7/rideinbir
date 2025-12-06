'use client'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ShieldCheck, FileText, Lock, RefreshCcw } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white relative border-t border-zinc-900">
      
      {/* CTA Strip */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-wide">Ready to Fly?</h3>
            <p className="text-red-100 text-sm font-medium">Slots fill up fast in season!</p>
          </div>
          <Link href="/packages" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-red-600 transition-all shadow-lg text-sm">
            Book Now ➔
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-zinc-800 pb-16">
          
          {/* 1. Brand */}
          <div>
            <h2 className="text-3xl font-black mb-4 flex items-center gap-2 tracking-tighter">
              RIDE IN <span className="text-red-600">BIR</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Official booking partner for Bir Billing Paragliding. We ensure 100% safety, government-certified pilots, and high-quality equipment.
            </p>
            <div className="flex items-center gap-2 text-green-500 font-bold text-xs bg-zinc-900 w-fit px-3 py-1.5 rounded-lg border border-zinc-800">
              <ShieldCheck className="w-4 h-4" /> Govt. Approved
            </div>
          </div>

          {/* 2. Activities (Only Real Links) */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-red-600 pl-3">Adventures</h3>
            <ul className="space-y-3">
              <li><Link href="/services/tandem-paragliding" className="text-zinc-400 hover:text-red-500 text-sm transition">Paragliding</Link></li>
              <li><Link href="/services/camping-bonfire" className="text-zinc-400 hover:text-red-500 text-sm transition">Camping</Link></li>
              <li><Link href="/services/trekking" className="text-zinc-400 hover:text-red-500 text-sm transition">Trekking</Link></li>
              <li><Link href="/services/bike-scooty-rental" className="text-zinc-400 hover:text-red-500 text-sm transition">Bike Rental</Link></li>
            </ul>
          </div>

          {/* 3. Legal & Support (New Pages) */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-red-600 pl-3">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/refund" className="text-zinc-400 hover:text-white text-sm flex items-center gap-2 group">
                  <RefreshCcw className="w-4 h-4 group-hover:text-red-500"/> Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-400 hover:text-white text-sm flex items-center gap-2 group">
                  <FileText className="w-4 h-4 group-hover:text-red-500"/> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-white text-sm flex items-center gap-2 group">
                  <Lock className="w-4 h-4 group-hover:text-red-500"/> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white text-sm flex items-center gap-2 group">
                  <Phone className="w-4 h-4 group-hover:text-red-500"/> Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-red-600 pl-3">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                <span>Bir Billing, Himachal Pradesh, 176077</span>
              </li>
             
              {/* Phone 1 */}
              <li className="flex items-center gap-4 text-zinc-400 text-sm">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <a href="tel:+919815994420" className="hover:text-white transition font-bold">
                  +91 98159 94420
                </a>
              </li>

              {/* Phone 2 */}
              <li className="flex items-center gap-4 text-zinc-400 text-sm">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <a href="tel:+918894013298" className="hover:text-white transition font-bold">
                  +91 88940 13298
                </a>
              </li>
              
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                <a href="mailto:rideinbir@gmail.com" className="hover:text-white">rideinbir@gmail.com</a>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com/rideinbir" target="_blank" className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white transition-all border border-zinc-800">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white transition-all border border-zinc-800">
                <Facebook className="w-5 h-5" />
              </a>
               <a
                href="https://x.com/rideinbir"
                target="_blank"
                className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white transition-all duration-300 border border-zinc-800"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Ride in Bir. All rights reserved.
          </p>
          <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-[10px] font-bold text-blue-400">VISA</div>
             <div className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-[10px] font-bold text-orange-400">MasterCard</div>
             <div className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-[10px] font-bold text-green-400">UPI</div>
          </div>
        </div>

      </div>
    </footer>
  )
}

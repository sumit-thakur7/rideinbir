'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="bg-black min-h-screen text-white  py-20 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center relative overflow-hidden pt-10 py-15 px-4">
        
        {/* Background Text Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
            <h1 className="text-[20vw] font-black text-white">404</h1>
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
            
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800 shadow-2xl">
                <AlertTriangle size={40} className="text-red-600" />
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-4">Lost in the Mountains?</h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The page you are looking for seems to have gone off-roading. 
                It might have been removed, renamed, or is temporarily unavailable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pb-10 py-10">
                <Link 
                    href="/" 
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-red-900/20"
                >
                    <Home size={20} /> Back to Home
                </Link>
                
                <Link 
                    href="/contact" 
                    className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 px-8 py-4 rounded-full font-bold transition-all"
                >
                    <MapPin size={20} /> Contact Support
                </Link>
            </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

'use client'
import { Instagram, Twitter, ShieldCheck, Star } from 'lucide-react'

export default function Pilots() {
  const pilots = [
    { 
      name: "Amit Thakur", 
      role: "Chief Pilot", 
      exp: "12+", 
      flights: "5000+",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop" 
    },
    { 
      name: "Rahul Rana", 
      role: "Instructor", 
      exp: "08+", 
      flights: "3200+",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop" 
    },
    { 
      name: "Suresh Kumar", 
      role: "Senior Pilot", 
      exp: "10+", 
      flights: "4100+",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop" 
    },
    { 
      name: "Vijay Singh", 
      role: "Tandem Pro", 
      exp: "15+", 
      flights: "6000+",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop" 
    },
  ]

  return (
    <section className="py-24 bg-white relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-3">
              <ShieldCheck className="w-5 h-5" />
              <span>Safety First</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black leading-tight">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">ELITE</span> SQUAD
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-right mt-6 md:mt-0 leading-relaxed font-medium">
            Flying isn't just a hobby for us; it's a discipline. 
            Meet the government-certified experts who make your safety their obsession.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {pilots.map((pilot, idx) => (
            <div key={idx} className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-2xl hover:-translate-y-3 transition-all duration-500">
              
              {/* Image Container */}
              <div className="h-96 overflow-hidden relative">
                <img 
                  src={pilot.img} 
                  alt={pilot.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>

                {/* Top Badge */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-yellow-400" /> Certified
                </div>

                {/* Social Icons (Reveal on Hover) */}
                <div className="absolute top-4 left-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  <button className="bg-white p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-blue-400 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Yellow Line */}
                <div className="w-12 h-1 bg-yellow-500 mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">{pilot.name}</h3>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">{pilot.role}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-4 mt-2">
                  <div>
                    <span className="block text-xl font-black text-white">{pilot.exp}</span>
                    <span className="text-xs text-gray-500">Years Exp.</span>
                  </div>
                  <div>
                    <span className="block text-xl font-black text-white">{pilot.flights}</span>
                    <span className="text-xs text-gray-500">Safe Flights</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

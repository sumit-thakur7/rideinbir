'use client'
import { Bike, Gauge, Fuel, Map, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Rentals() {
  const vehicles = [
    {
      name: "Honda Activa 6G",
      type: "Scooty",
      price: "800",
      features: ["Automatic", "Lightweight", "2 Helmets"],
      img: "https://images.unsplash.com/photo-1591638236759-c25391a26b67?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Royal Enfield Classic",
      type: "Cruiser Bike",
      price: "1500",
      features: ["350cc Engine", "Powerful", "Mountain Ready"],
      img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Hero Xpulse 200",
      type: "Off-Road Bike",
      price: "1200",
      features: ["Off-road Tyres", "High Ground Clearance", "Adventure"],
      img: "https://images.unsplash.com/photo-1625052905570-fa0d59352b7d?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "MTB Mountain Cycle",
      type: "Bicycle",
      price: "500",
      features: ["Eco Friendly", "Fitness", "Forest Trails"],
      img: "https://images.unsplash.com/photo-1532298229144-0ec0c57e36cf?q=80&w=800&auto=format&fit=crop"
    }
  ]

  return (
    <section className="py-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800 pb-8">
          <div>
            <span className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-xs">Explore on Wheels</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 leading-tight">
              BIKE & SCOOTY <span className="text-red-600">RENTALS</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-right mt-6 md:mt-0">
            Explore the monasteries, cafes, and hidden waterfalls of Bir at your own pace.
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle, idx) => (
            <div key={idx} className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all duration-300 hover:-translate-y-2">
              
              {/* Image Area */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={vehicle.img} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-xs font-bold text-white uppercase">{vehicle.type}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {vehicle.features.map((feature, i) => (
                    <span key={i} className="text-[10px] bg-zinc-800 text-gray-300 px-2 py-1 rounded-md border border-zinc-700">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price & Action */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Per Day</p>
                    <p className="text-2xl font-black text-yellow-500">₹{vehicle.price}</p>
                  </div>
                  <Link href="/contact">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <ArrowRight className="w-5 h-5 text-black group-hover:text-white" />
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Info Strip */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-6 rounded-2xl flex items-center gap-4 border border-zinc-800">
             <div className="bg-red-600/20 p-3 rounded-full text-red-600"><Fuel className="w-6 h-6"/></div>
             <div>
               <h4 className="font-bold text-white">Full Tank Option</h4>
               <p className="text-xs text-gray-400">Available on request</p>
             </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl flex items-center gap-4 border border-zinc-800">
             <div className="bg-blue-600/20 p-3 rounded-full text-blue-500"><Gauge className="w-6 h-6"/></div>
             <div>
               <h4 className="font-bold text-white">Well Maintained</h4>
               <p className="text-xs text-gray-400">Regularly serviced fleet</p>
             </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl flex items-center gap-4 border border-zinc-800">
             <div className="bg-yellow-600/20 p-3 rounded-full text-yellow-500"><Map className="w-6 h-6"/></div>
             <div>
               <h4 className="font-bold text-white">Free Map Guide</h4>
               <p className="text-xs text-gray-400">Best routes provided</p>
             </div>
          </div>
        </div>

      </div>
    </section>
  )
}

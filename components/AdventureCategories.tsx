'use client'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function AdventureCategories() {
  
  const activities = [
    { title: "Paragliding", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800" },
    { title: "Camping", img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800" },
    // { title: "Jeep Safari", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800" },
    { title: "Bungee Rocket", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800" },
    { title: "Trekking", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800" },
    // { title: "Mountain Biking", img: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=800" },
    { title: "Waterfall Trek", img: "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?q=80&w=800" },
    { title: "Sky Cycling", img: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=800" },
  ]

  return (
    <section className="py-16 bg-black text-white relative overflow-hidden border-t border-zinc-900">
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 60s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 px-6">
          <span className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Adrenaline Awaits</span>
          <h2 className="text-3xl md:text-5xl font-black mb-2 mt-2">UNLEASH THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">WILD</span></h2>
        </div>

        {/* Infinite Slider Container */}
        <div className="relative group w-full overflow-hidden">
          
          {/* Gradient Masks */}
          <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          {/* The Scrolling Track */}
          <div className="animate-scroll flex gap-4 px-4">
            {[...activities, ...activities].map((activity, idx) => (
              <Link key={`${activity.title}-${idx}`} href="/packages" className="relative flex-shrink-0">
                
                {/* Card Container (Reduced Size) */}
                <div className="relative h-[300px] w-[200px] md:w-[240px] rounded-2xl overflow-hidden transition-all duration-500 ease-in-out hover:w-[320px] group/card cursor-pointer border border-zinc-800 hover:border-red-600/50 grayscale hover:grayscale-0">
                  
                  {/* Image */}
                  <img 
                    src={activity.img} 
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  
                  {/* Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full">
                    <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                      
                      {/* Title & Icon */}
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-lg font-bold text-white leading-none">{activity.title}</h3>
                        <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Hidden Description (Reveals on Hover) */}
                      <p className="text-gray-400 text-xs opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 leading-tight">
                        Book {activity.title.toLowerCase()} now.
                      </p>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

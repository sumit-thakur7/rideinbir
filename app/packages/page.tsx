'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Wind, Mountain, Tent, Bike, Map, Car, Home, GraduationCap } from 'lucide-react';

const allPackages = [
  {
    id: 1,
    title: "Tandem Paragliding",
    price: "₹3,000",
    link: "/services/tandem-paragliding",
    // image: "/images/packages/tandem-paragliding.jpg",
    image: "packages/img/36.jpeg",  
    desc: "Fly from the world's 2nd highest site. Experience the thrill of free flight over the Himalayas.",
    icon: <Wind size={24} className="text-blue-500"/>
  },
  {
    id: 2,
    title: "Camping & Bonfire",
    price: "₹1,200",
    link: "/services/camping-bonfire",
    // image: "/images/packages/camping-bonfire.jpg", 
    image: "packages/img/20.jpeg", 
    desc: "Stay under a million stars. Luxury tents, delicious food, music, and warm bonfire vibes.",
    icon: <Tent size={24} className="text-yellow-500"/>
  },
  {
    id: 3,
    title: "Paragliding Courses",
    price: "₹15,000",
    link: "/services/paragliding-courses",
    // image: "/images/packages/paragliding-course.jpg",
    image: "packages/img/40.jpeg",
    desc: "Don't just be a passenger, be a pilot. Learn to fly solo with our P1, P2 & P3 certification courses.",
    icon: <GraduationCap size={24} className="text-purple-500"/>
  },
  {
    id: 4,
    title: "Trekking Adventures",
    price: "₹1,500",
    link: "/services/trekking",
    // image: "/images/packages/trekking.jpg",
    image: "packages/img/34.jpeg", 
    desc: "Explore hidden trails. Rajgundha Valley, Hanuman Garh, and secret waterfalls.",
    icon: <Mountain size={24} className="text-green-500"/>
  },
  {
    id: 5,
    title: "Bike & Scooty Rental",
    price: "₹500",
    link: "/services/bike-scooty-rental",
    // image: "/images/packages/bike-scooty.jpg",
    image: "packages/img/41.jpeg", 
    desc: "Rent Himalayan, Xpulse, or Scooty to explore Bir Billing at your own pace.",
    icon: <Bike size={24} className="text-red-500"/>
  },
  {
    id: 6,
    title: "Hotels & Resorts",
    price: "₹800",
    link: "/services/hotels-resorts",
    // image: " /images/packages/hotels-resorts.jpg",
    image: "packages/img/31.jpeg",
    desc: "Premium stays, hostels, and resorts. Find the perfect accommodation for your trip.",
    icon: <Home size={24} className="text-orange-500"/>
  },
  // {
  //   id: 7,
  //   title: "Jeep Safari 4x4",
  //   price: "₹2,500",
  //   link: "/services/jeep-safari",
  //   // image: "/images/packages/jeep-safari.jpg",
  //   image: "packages/img/44.png",  
  //   desc: "Off-road adventure in open-top Gypsies and Thars. Sunset points and waterfall visits.",
  //   icon: <Car size={24} className="text-zinc-400"/>
  // },
  // {
  //   id: 8,
  //   title: "Mountain Biking (MTB)",
  //   price: "₹500",
  //   link: "/services/mountain-biking",
  //   // image: "/images/packages/mtb-biking.jpg",
  //   image: "packages/img/33.png",
  //   desc: "Conquer the rugged trails of Bir with our premium MTB cycle rentals.",
  //   icon: <Map size={24} className="text-teal-500"/>
  // }
];

export default function Packages() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      
      {/* HERO SECTION */}
      <div className="relative pt-40 pb-20 px-4 text-center border-b border-zinc-800 bg-zinc-900/50">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
          Our <span className="text-red-600">Packages</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Curated experiences for every adventurer. From flying high in the sky to camping under the stars, we have it all.
        </p>
      </div>

      {/* PACKAGES GRID */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allPackages.map((pkg) => (
            <Link href={pkg.link} key={pkg.id} className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/20">
              
              {/* Image Area */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90"/>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-full text-white shadow-lg">
                  {pkg.icon}
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold bg-red-600 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                        Starts @ {pkg.price}
                    </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 relative">
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-red-500 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {pkg.desc}
                </p>
                
                <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
                  Explore Package <ArrowRight size={18} className="ml-2 text-red-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

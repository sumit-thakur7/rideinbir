'use client';

import Link from 'next/link';
import { ArrowUpRight, Wind, Mountain, Tent, Bike, Map, Car, Home, GraduationCap } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// TypeScript Interface define kiya taaki code strict aur safe rahe
interface Service {
  id: number;
  title: string;
  price: string;
  link: string;
  image: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    title: "Paragliding Joyride",
    price: "₹3,000",
    link: "/services/tandem-paragliding",
    image: "/home/image/1.jpeg",
    icon: <Wind className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Camping & Bonfire",
    price: "₹1,200",
    link: "/services/camping-bonfire",
    image: "/home/image/11.jpeg",
    icon: <Tent className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Bike Rentals",
    price: "₹500",
    link: "/services/bike-scooty-rental",
    image: "/home/image/17.jpeg",
    icon: <Bike className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Fly Courses (P1/P2)",
    price: "₹15,000",
    link: "/services/paragliding-courses",
    image: "/home/image/10.jpeg",
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    id: 5,
    title: "Trekking",
    price: "₹1,500",
    link: "/services/trekking",
    image: "/home/image/5.jpeg",
    icon: <Mountain className="w-5 h-5" />
  },
  // {
  //   id: 6,
  //   title: "Jeep Safari",
  //   price: "₹2,500",
  //   link: "/services/jeep-safari",
  //   image: "/home/image/12.jpeg",
  //   icon: <Car className="w-5 h-5" />
  // },
  // {
  //   id: 7,
  //   title: "Mountain Biking",
  //   price: "₹500",
  //   link: "/services/mountain-biking",
  //   image: "/home/image/9.jpeg",
  //   icon: <Map className="w-5 h-5" />
  // },
  {
    id: 6,
    title: "Hotels & Resorts",
    price: "₹800",
    link: "/services/hotels-resorts",
    image: "/home/image/8.jpeg",
    icon: <Home className="w-5 h-5" />
  }
];

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Har card 0.1s ke gap par load hoga (Premium feel)
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 } 
  }
};

export default function Packages() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Glow - Animated Pulse */}
      <motion.div 
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header with Animation */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-red-500 font-bold tracking-widest uppercase text-xs">Adventure Awaits</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
              CURATED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">EXPERIENCES</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/packages" className="hidden md:flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition group">
              View All Packages 
              <motion.span whileHover={{ x: 3, y: -3 }}>
                <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Grid Layout with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((pkg) => (
            <motion.div key={pkg.id} variants={cardVariants}>
              <Link href={pkg.link} className="group relative h-[400px] rounded-3xl overflow-hidden block cursor-pointer border border-zinc-800 hover:border-red-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/20">
                
                {/* Background Image - CSS Scale is cleaner for images than JS */}
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Icon Badge */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full text-white border border-white/20 group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300 shadow-lg">
                  {pkg.icon}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col h-full justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-red-400 text-xs font-extrabold uppercase tracking-widest mb-2">Starts @ {pkg.price}</p>
                    <h3 className="text-2xl font-black text-white leading-tight mb-4">{pkg.title}</h3>
                    
                    {/* RED BUTTON - Added Tap/Hover animation */}
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-red-600/20"
                    >
                      Book Now <ArrowUpRight size={18} />
                    </motion.button>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center md:hidden"
        >
          <Link href="/packages" className="inline-flex items-center gap-2 bg-zinc-800 text-white px-6 py-3 rounded-full font-bold text-sm">
            View All Packages <ArrowUpRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
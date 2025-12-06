'use client'
import { Camera, Play, Instagram, ArrowUpRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

// Animation Variants Define kiye taaki code clean rahe
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Items ek ke baad ek aayenge
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function Gallery() {
  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-left md:flex-row justify-between items-end mb-16">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <span className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-xs">Visual Diary</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-2 leading-none">
              LIFE IN THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">CLOUDS</span>
            </h2>
          </motion.div>

          {/* INSTAGRAM USERNAME */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mt-6 md:mt-0"
          >
            <div className="h-px w-16 bg-zinc-800"></div>
            <a 
              href="https://www.instagram.com/rideinbir/" 
              target="_blank"
              className="text-gray-400 text-sm font-medium hover:text-white transition"
            >
              @rideinbir
            </a>
          </motion.div>
        </div>

        {/* Bento Grid Layout with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[700px]"
        >
          
          {/* Item 1 - Featured Big Shot */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden cursor-pointer"
          >
            <img 
              src="/image/sunset.png"
              alt="Sunset paragliding"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
            
            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <Camera className="w-3 h-3" /> Featured Shot
              </span>
            </div>

            <div className="absolute bottom-8 left-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-1">Sunset Flight</p>
              <h3 className="text-3xl font-bold">Golden Hour at 8000ft</h3>
            </div>
          </motion.div>

          {/* Item 2 - Video Thumbnail */}
          <motion.div 
            variants={itemVariants}
            className="relative group rounded-3xl overflow-hidden cursor-pointer border border-zinc-800"
          >
            <img 
              src="https://thrillmonks.com/adminpanel/uploads/productblog/1727348012_productblogbig.jpg" 
              alt="Video Thumbnail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              {/* Play Button Pulse Animation */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-transform"
              >
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-bold bg-red-600 px-2 py-1 rounded">WATCH FILM</span>
            </div>
          </motion.div>

          {/* Item 3 - Standard Image */}
          <motion.div 
            variants={itemVariants}
            className="relative group rounded-3xl overflow-hidden cursor-pointer"
          >
             <img 
              src="/image/bir.png" 
              alt="Bir Landscape"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                 <MapPin className="w-3 h-3" /> Billing Top
               </span>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom Bar / CTA - Slide Up Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
        >

          {/* CLICKABLE FOLLOW US BOX */}
          <a 
            href="https://www.instagram.com/rideinbir/" 
            target="_blank"
            className="bg-zinc-900 rounded-3xl p-6 flex items-center justify-between group hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-800"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-red-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors">Follow Us</h4>
                <p className="text-xs text-gray-400">Join 15k+ Adventurers</p>
              </div>
            </div>
            <motion.div whileHover={{ x: 5, y: -5 }}>
              <ArrowUpRight className="text-zinc-500 group-hover:text-white transition-colors" />
            </motion.div>
          </a>

          {/* View Full Gallery Button */}
          <Link href="/gallery" className="bg-white rounded-3xl p-6 flex items-center justify-between group hover:bg-red-600 transition-colors duration-300">
             <div>
                <h4 className="font-bold text-black text-xl group-hover:text-white transition-colors">View All Photos</h4>
                <p className="text-xs text-gray-500 group-hover:text-red-100 font-medium">Explore the full archive ➔</p>
             </div>
             <motion.div 
               whileHover={{ rotate: 45 }}
               className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white/20 transition-colors"
             >
                <ArrowUpRight className="text-black group-hover:text-white" />
             </motion.div>
          </Link>

        </motion.div>

      </div>
    </section>
  )
}
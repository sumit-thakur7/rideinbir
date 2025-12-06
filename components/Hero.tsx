'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ROTATING_WORDS: string[] = [
  "THRILL",
  "FREEDOM",
  "ADVENTURE",
  "SKY",
  "DREAM"
]

export default function Hero() {
  const [index, setIndex] = useState<number>(0)

  // Word rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ROTATING_WORDS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    // CHANGE IS HERE: min-h-[80vh] for mobile, md:min-h-screen for desktop
    <div className="relative min-h-[70vh] md:min-h-screen w-full flex items-center overflow-hidden bg-black">
      
      {/* 1. Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover md:object-right"
          autoPlay
          loop
          muted
          playsInline
          src="https://videos.pexels.com/video-files/2324326/2324326-uhd_2560_1440_25fps.mp4"
        ></video>

        {/* Gradient Adjustments for Mobile Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent/20"></div>
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 pt-16 md:pt-0 content-center h-full">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center mt-4 md:mt-0"
        >
          {/* Top Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-4 md:mb-8"
          >
            <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
              #1 Adventure in India
            </span>
            <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide">
              Bir Billing, Himachal
            </span>
          </motion.div>

          {/* Massive Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.95] mb-4 md:mb-6 min-h-[140px] sm:min-h-[160px] md:min-h-[200px]">
            LIVE THE<br />
            {' '}
            <span className="text-yellow-500 inline-block align-top">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[index]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="block"
                >
                  {ROTATING_WORDS[index]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-base sm:text-lg md:text-xl font-light mb-6 md:mb-10 max-w-md leading-relaxed border-l-2 border-gray-700 pl-4 md:pl-6"
          >
            Escape the ordinary. Fly with world-class pilots at 8000ft. 
            <br className="hidden sm:block" />
            <span className="text-white font-semibold block sm:inline mt-1 sm:mt-0">Your wings are waiting.</span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
          >
            <Link 
              href="/packages" 
              className="w-full sm:w-auto bg-red-600 text-white px-8 py-4 md:px-10 md:py-5 font-bold text-base md:text-lg hover:bg-red-700 transition-all shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] flex items-center justify-center gap-3 rounded-full"
            >
              Start Booking
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side Stats */}
        <div className="hidden md:flex flex-col justify-end items-end pb-20 pointer-events-none">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.8, duration: 0.8 }}
             className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl max-w-xs text-right"
           >
              <div className="text-3xl md:text-4xl font-black text-white mb-1">2,400<span className="text-red-600 text-xl md:text-2xl">m</span></div>
              <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6">Take-off Altitude</p>
              
              <div className="text-3xl md:text-4xl font-black text-white mb-1">50<span className="text-yellow-500 text-xl md:text-2xl">k+</span></div>
              <p className="text-gray-400 text-xs md:text-sm">Safe Flights Completed</p>
           </motion.div>
        </div>

      </div>

      {/* Decorative Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-black origin-left"
      ></motion.div>
    </div>
  )
}
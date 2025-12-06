'use client'
import { MapPin, Mountain, Wind, Video, LucideIcon } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

// Interface define kiya taaki Typescript khush rahe
interface Step {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: LucideIcon;
}

export default function HowItWorks() {
  const steps: Step[] = [
    { 
      id: "01", 
      title: "Reporting", 
      subtitle: "The Beginning",
      desc: "Arrive at our exclusive base in Tibetan Colony. Meet your pilot & quick registration.", 
      icon: MapPin 
    },
    { 
      id: "02", 
      title: "The Ascent", 
      subtitle: "Off-Road Safari",
      desc: "Experience a thrilling 1-hour 4x4 jeep ride through pine forests to the takeoff site (2400m).", 
      icon: Mountain 
    },
    { 
      id: "03", 
      title: "Take Flight", 
      subtitle: "Adrenaline Rush",
      desc: "Gear up, run a few steps, and lift off. Sail through the clouds for 15-30 minutes.", 
      icon: Wind 
    },
    { 
      id: "04", 
      title: "Touchdown", 
      subtitle: "Memories Forever",
      desc: "Smooth landing at the sunset point. Collect your raw GoPro footage & enjoy tea.", 
      icon: Video 
    }
  ]

  // Types for Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 border-b border-zinc-800 pb-8 gap-6 md:gap-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-xs">The Roadmap</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mt-2 tracking-tight">
              FLIGHT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">PATH</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-md text-left md:text-right font-medium text-sm md:text-base"
          >
            From the ground to the clouds, we've designed a seamless experience for you.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-0"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              // Tailwind responsive classes logic (same as before)
              className={`
                group relative p-6 md:p-10 
                border-zinc-800 
                border-b md:border-b-0 md:border-l 
                ${index === steps.length - 1 ? 'border-b-0' : ''} 
                hover:bg-red-600 transition-all duration-500 ease-out cursor-default
              `}
            >
              
              {/* Step Number */}
              <div className="flex justify-between items-start mb-6 md:mb-10">
                <span className="text-4xl md:text-5xl font-black text-zinc-800 group-hover:text-red-800/50 transition-colors duration-300">
                  {step.id}
                </span>
                
                <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-900 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-red-600 transition-all duration-300 shadow-sm border border-zinc-700 group-hover:border-white">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <span className="text-[10px] md:text-xs font-bold text-yellow-500 group-hover:text-white uppercase tracking-wider mb-2 block 
                  opacity-100 transform translate-y-0 
                  md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 
                  transition-all duration-500">
                  {step.subtitle}
                </span>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-red-100 transition-colors duration-300">
                  {step.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
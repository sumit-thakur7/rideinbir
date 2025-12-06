'use client'

export default function ContactHero() {
  return (
    <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2600&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
        <span className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">
          24/7 Support
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
          GET IN <span className="text-red-600">TOUCH</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto">
          Have questions about flying? Want to book a group tour? 
          We are here to help you plan the perfect adventure.
        </p>
      </div>
    </div>
  )
}

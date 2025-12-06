'use client'

export default function GalleryHero() {
  return (
    <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505160743313-302d96944743?q=80&w=2600&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center mt-20 px-4">
        <p className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-xs mb-4">
          Through The Lens
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-2">
          VISUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">DIARY</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
          Witness the world from 8000ft. Real moments, raw emotions, and the beauty of Bir Billing.
        </p>
      </div>
    </div>
  )
}

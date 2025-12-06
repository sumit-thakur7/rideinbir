'use client'
import { useState } from 'react'
import { MapPin, ZoomIn } from 'lucide-react'

export default function GalleryGrid() {
  const [filter, setFilter] = useState('All')
  const [visibleCount, setVisibleCount] = useState(10) // Start with 10

  const categories = ['All', 'Flying', 'Camping', 'Scenery', 'Pilots']

  // Aapka Purana Data (Sirf 6 photos)
  const sourceImages = [
        {
      id: 1,
      src: "/image/sun.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 3,
      src: "/image/highaltitude.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 4,
      src: "/gallery/birtop/151.webp",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 5,
      src: "/image/pre-flight.png",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 6,
      src: "/image/takeoff.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 7,
      src: "/gallery/flying/3.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 8,
      src: "/gallery/camping/11.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 9,
      src: "/gallery/flying/4.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 10,
      src: "/gallery/birtop/152.webp",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 11,
      src: "/gallery/pilots/DSC_0019.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 12,
      src: "/gallery/flying/25.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 13,
      src: "/gallery/flying/26.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 14,
      src: "/gallery/camping/20.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 15,
      src: "/gallery/flying/27.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 16,
      src: "/gallery/birtop/153.jpg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 17,
      src: "/gallery/pilots/DSC_0041.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 18,
      src: "/gallery/flying/36.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 19,
      src: "/gallery/flying/42.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 20,
      src: "/gallery/camping/21.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 21,
      src: "/gallery/flying/43.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 22,
      src: "/gallery/birtop/154.jpeg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 23,
      src: "/gallery/pilots/DSC_0212.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 24,
      src: "/gallery/flying/44.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 25,
      src: "/gallery/flying/52.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 26,
      src: "/gallery/camping/51.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 27,
      src: "/gallery/flying/53.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 28,
      src: "/gallery/birtop/155.jpeg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 29,
      src: "/gallery/pilots/DSC_0216.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 30,
      src: "/gallery/flying/55.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 31,
      src: "/gallery/flying/56.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 32,
      src: "/gallery/camping/59.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 33,
      src: "/gallery/flying/57.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 34,
      src: "/gallery/birtop/156.jpeg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 35,
      src: "/gallery/pilots/DSC_0218.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 36,
      src: "/gallery/flying/58.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 37,
      src: "/gallery/flying/60.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 38,
      src: "/gallery/camping/61.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 39,
      src: "/gallery/flying/62.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 40,
      src: "/gallery/birtop/157.webp",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 41,
      src: "/gallery/pilots/DSC_0311.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 42,
      src: "/gallery/flying/63.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 43,
      src: "/gallery/flying/64.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 44,
      src: "/gallery/camping/71.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 45,
      src: "/gallery/flying/65.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 46,
      src: "/gallery/birtop/159.jpeg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 47,
      src: "/gallery/pilots/DSC_0313.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 48,
      src: "/gallery/flying/66.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 49,
      src: "/gallery/flying/67.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 50,
      src: "/gallery/camping/103.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 51,
      src: "/gallery/flying/68.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 52,
      src: "/gallery/birtop/161.webp",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 53,
      src: "/gallery/pilots/DSC_0324.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 54,
      src: "/gallery/flying/69.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 55,
      src: "/gallery/flying/101.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 56,
      src: "/gallery/camping/105.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 57,
      src: "/gallery/flying/102.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 58,
      src: "/gallery/birtop/163.jpg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 59,
      src: "/gallery/pilots/DSC_0326.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 60,
      src: "/gallery/flying/104.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },
        {
      id: 61,
      src: "/gallery/flying/106.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 62,
      src: "/gallery/camping/113.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 63,
      src: "/gallery/flying/107.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 64,
      src: "/gallery/birtop/164.jpeg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 65,
      src: "/gallery/pilots/DSC_0329.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 66,
      src: "/gallery/flying/108.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 67,
      src: "/gallery/flying/109.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 68,
      src: "/gallery/camping/118.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 69,
      src: "/gallery/flying/110.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 70,
      src: "/gallery/birtop/165.jpeg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 71,
      src: "/gallery/pilots/DSC_0523.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 72,
      src: "/gallery/flying/111.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 73,
      src: "/gallery/flying/112.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 74,
      src: "/gallery/camping/129.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 75,
      src: "/gallery/flying/114.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 76,
      src: "/gallery/birtop/167.webp",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 77,
      src: "/gallery/pilots/DSC_0759.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 78,
      src: "/gallery/flying/115.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 79,
      src: "/gallery/flying/116.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 80,
      src: "/gallery/camping/131.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 81,
      src: "/gallery/flying/117.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 82,
      src: "/gallery/birtop/169.webp",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 83,
      src: "/gallery/pilots/DSC_0763.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 84,
      src: "/gallery/flying/119.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 85,
      src: "/gallery/flying/120.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 86,
      src: "/gallery/camping/133.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 87,
      src: "/gallery/flying/121.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 88,
      src: "/gallery/birtop/170.jpg",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 89,
      src: "/gallery/pilots/DSC_3669.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 90,
      src: "/gallery/flying/122.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 91,
      src: "/gallery/flying/123.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 92,
      src: "/gallery/camping/134.png",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 93,
      src: "/gallery/flying/124.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 94,
      src: "/gallery/birtop/151.webp",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    {
      id: 95,
      src: "/gallery/pilots/DSC_3675.JPG",
      category: "Pilots",
      title: "Pre-Flight Check",
      size: "small"
    },
    {
      id: 96,
      src: "/gallery/flying/125.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },

    {
      id: 97,
      src: "/gallery/flying/126.png",
      category: "Flying",
      title: "The Golden Hour",
      size: "large"
    },
    {
      id: 98,
      src: "/gallery/birtop/",
      category: "Camping",
      title: "Night Under Stars",
      size: "small"
    },
    {
      id: 99,
      src: "/gallery/flying/127.png",
      category: "Flying",
      title: "High Altitude",
      size: "small"
    },
    {
      id: 100,
      src: "/gallery/birtop/161.webp",
      category: "Scenery",
      title: "Billing Top View",
      size: "tall"
    },
    
    {
      id: 101,
      src: "/gallery/flying/128.png",
      category: "Flying",
      title: "Takeoff Action",
      size: "wide"
    },
  ]

  // --- MAGIC: Ye unhi 6 photos ko 10 baar repeat karke 60 bana dega ---
  // Aapko kuch rename nahi karna padega.
  const images = Array(10).fill(sourceImages).flat().map((img, i) => ({
    ...img,
    id: i // Unique ID for React
  }));

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter)

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10)
  }

  return (
    <section className="py-16 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setVisibleCount(10); }}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                filter === cat 
                  ? 'bg-red-600 border-red-600 text-white' 
                  : 'bg-transparent border-zinc-800 text-gray-400 hover:border-white hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {filteredImages.slice(0, visibleCount).map((img, index) => (
            <div 
              key={`${img.id}-${index}`}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-zinc-800
                ${img.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${img.size === 'tall' ? 'md:row-span-2' : ''}
                ${img.size === 'wide' ? 'md:col-span-2' : ''}
                animate-in fade-in duration-700
              `}
            >
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                   <MapPin className="w-3 h-3" /> Bir Billing
                </span>
                <h3 className="text-white text-xl font-bold">{img.title}</h3>
              </div>
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <div className="text-center mt-16">
            <button 
              onClick={handleLoadMore}
              className="text-gray-500 hover:text-white text-sm font-bold border-b border-gray-500 hover:border-white pb-1 transition-all"
            >
              Load More Photos
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
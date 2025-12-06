'use client'
import { useEffect, useState } from 'react'
import { Star, Quote, CheckCircle } from 'lucide-react'

export default function ReviewsSlider() {
  const reviews = [
    // OLD + NEW 9 REVIEWS
    {
      name: "Rohan Das",
      location: "Bangalore",
      text: "I was terrified of heights, but the pilot made me feel so safe. Amazing experience!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      highlight: false
    },
    {
      name: "Emily Clark",
      location: "UK, Traveler",
      text: "Bir Billing is something else. Beautiful, peaceful sky flying!",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      highlight: true
    },
    {
      name: "Vikram & Neha",
      location: "Delhi (Couple)",
      text: "Sunset flight was magical. GoPro footage 10/10!",
      img: "https://randomuser.me/api/portraits/men/85.jpg",
      highlight: false
    },

    {
      name: "Arjun Mehta",
      location: "Mumbai",
      text: "First time paragliding — felt super safe. Instructors are pro!",
      img: "https://randomuser.me/api/portraits/men/19.jpg",
      highlight: false
    },
    {
      name: "Samantha Roy",
      location: "Canada",
      text: "The views of Bir valley took my breath away!",
      img: "https://randomuser.me/api/portraits/women/28.jpg",
      highlight: true
    },
    {
      name: "Kabir Sinha",
      location: "Chandigarh",
      text: "Smooth takeoff and landing. Great team!",
      img: "https://randomuser.me/api/portraits/men/74.jpg",
      highlight: false
    },

    {
      name: "Neeraj Verma",
      location: "Jaipur",
      text: "Totally worth it! Very friendly pilot.",
      img: "https://randomuser.me/api/portraits/men/10.jpg",
      highlight: true
    },
    {
      name: "Aisha Khan",
      location: "Dubai",
      text: "Clear sky, stunning mountains — unforgettable moment!",
      img: "https://randomuser.me/api/portraits/women/54.jpg",
      highlight: false
    },
    {
      name: "Harsh & Meera",
      location: "Hyderabad",
      text: "Couple ride was dreamy! Loved it.",
      img: "https://randomuser.me/api/portraits/men/22.jpg",
      highlight: false
    }
  ]

  const totalPages = Math.ceil(reviews.length / 3)
  const [page, setPage] = useState(0)

  // Auto-scroll every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const start = page * 3
  const visible = [
    reviews[start],
    reviews[(start + 1) % reviews.length],
    reviews[(start + 2) % reviews.length],
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black mb-12">
          What Flyers Say ✨
        </h2>

        {/* Slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700">
          {visible.map((review, idx) => (
            <div 
              key={idx}
              className={`relative p-8 rounded-3xl ${
                review.highlight 
                  ? 'bg-black text-white shadow-xl scale-[1.02]' 
                  : 'bg-gray-50 text-gray-800 border'
              }`}
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 opacity-10" />

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg leading-relaxed font-medium mb-8">
                "{review.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-700/20">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500">
                  <img src={review.img} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    {review.name}
                    <CheckCircle className="w-3 h-3 text-blue-500" />
                  </h4>
                  <p className="text-xs text-gray-400">
                    {review.location} • <span className="text-green-500">Verified Flyer</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 gap-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                page === i ? 'bg-yellow-500 scale-125' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>

      </div>
    </section>
  )
}


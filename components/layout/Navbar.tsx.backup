'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
                alt="Bir Billing"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900"> Ride in Bir</h1>
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Ready to Fly</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={`flex items-center gap-2 text-sm font-semibold ${isActive('/') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
              Home
            </Link>

            <Link href="/packages" className={`flex items-center gap-2 text-sm font-semibold ${isActive('/packages') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
              Packages
            </Link>

            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button className={`flex items-center gap-1 text-sm font-semibold ${pathname.startsWith('/services') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" /></svg>
                Services
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                  <Link href="/services/tandem-flights" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"><span className="text-sm font-medium text-gray-700">✈️ Tandem Flights</span></Link>
                  <Link href="/services/training-courses" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"><span className="text-sm font-medium text-gray-700">📚 Training Courses</span></Link>
                  <Link href="/services/equipment-rental" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"><span className="text-sm font-medium text-gray-700">📦 Equipment Rental</span></Link>
                </div>
              )}
            </div>

            <Link href="/pilots" className={`flex items-center gap-2 text-sm font-semibold ${isActive('/pilots') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
              Pilots
            </Link>

            <Link href="/gallery" className={`flex items-center gap-2 text-sm font-semibold ${isActive('/gallery') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
              Gallery
            </Link>

            <Link href="/contact" className={`flex items-center gap-2 text-sm font-semibold ${isActive('/contact') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-sm font-medium text-gray-700 hover:text-orange-600">Dashboard</Link>
                <button onClick={handleLogout} className="text-sm font-medium text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-orange-600">🔑 Login</Link>
                <Link href="/signup" className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg">🚀 Sign Up</Link>
              </>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <Link href="/" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg">🏠 Home</Link>
            <Link href="/packages" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg">📦 Packages</Link>
            <Link href="/pilots" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg">👨‍✈️ Pilots</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

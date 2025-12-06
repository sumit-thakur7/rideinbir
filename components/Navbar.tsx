
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  const services = [
    { name: " Tandem Paragliding", href: "/services/tandem-paragliding" },
    { name: " Paragliding Courses", href: "/services/paragliding-courses" },
    { name: " Camping & Bonfire", href: "/services/camping-bonfire" },
    { name: " Trekking Packages", href: "/services/trekking" },
    // { name: " Mountain Biking", href: "/services/mountain-biking" },
    // { name: " 4x4 Jeep Safari", href: "/services/jeep-safari" },
    { name: " Bike & Scooty Rental", href: "/services/bike-scooty-rental" },
    { name: " Hotels & Resorts", href: "/services/hotels-resorts" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setIsScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY]) 

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData && userData !== "undefined" && userData !== "null") {
        try {
            setUser(JSON.parse(userData))
        } catch (e) {
            console.error("Corrupt data, clearing...")
            localStorage.removeItem('user')
        }
    }
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <>
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled 
            ? 'bg-black/95 backdrop-blur-xl py-3 shadow-2xl border-b border-white/5' 
            : 'bg-transparent py-4 md:py-5' // Reduced mobile padding here
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
                {/* Reduced Logo Size for Mobile */}
                <div className="relative w-9 h-9 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-red-600/20 group-hover:ring-red-600 transition-all duration-300">
                  <img src="/logo/rideinbir.jpeg" alt="Ride in Bir" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter">
                    Ride in <span className="text-red-600 drop-shadow-lg">Bir</span>
                  </h1>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-10">
              <Link href="/" className="font-bold text-white hover:text-red-500 transition relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/packages" className="font-bold text-white hover:text-red-500 transition relative group">
                Packages
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 font-bold text-white hover:text-red-500 transition"
                >
                  Services 
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-10 left-1/2 -translate-x-1/2 w-80 bg-black/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-red-600/30 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none"></div>
                      {services.map((service, index) => (
                        <motion.div
                          key={service.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link 
                            href={service.href}
                            className="block px-8 py-4 text-gray-200 hover:bg-red-600/10 hover:text-red-400 transition-all duration-200 font-medium border-b border-white/5 last:border-0"
                          >
                            {service.name.trim()}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/gallery" className="font-bold text-white hover:text-red-500 transition relative group">
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/contact" className="font-bold text-white hover:text-red-500 transition relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 px-5 py-3 rounded-full transition-all backdrop-blur"
                  >
                    <User size={18} className="text-red-500" />
                    <span className="font-bold text-white text-sm">Hi, {user.name}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-14 right-0 w-56 bg-black/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden"
                      >
                        <Link 
                          href={user.role === 'admin' ? '/admin/bookings' : '/dashboard'}
                          className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-red-600/10 hover:text-white transition-all"
                        >
                          <LayoutDashboard size={18} className="text-blue-400" />
                          <span>Dashboard</span>
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:bg-red-600/10 hover:text-red-300 transition-all text-left"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/login" className="font-bold text-white hover:text-red-500 transition text-sm">
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/signup" className="bg-white text-black px-7 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-xl text-sm">
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2.5 text-white bg-zinc-900/50 backdrop-blur rounded-xl"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Adjusted Top Padding */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-[60px] z-40 bg-black/98 backdrop-blur-2xl lg:hidden overflow-y-auto"
            >
              <div className="px-6 py-8 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link href="/" className="block text-3xl font-black text-white mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <Link href="/packages" className="block text-3xl font-black text-white" onClick={() => setIsMobileMenuOpen(false)}>Packages</Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border-l-4 border-red-600 pl-6 space-y-4"
                >
                  <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Our Services</p>
                  {services.map((service, i) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <Link 
                        href={service.href} 
                        className="block text-lg text-gray-300 hover:text-red-400 transition font-medium py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name.trim()}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6 pt-4 border-t border-zinc-800"
                >
                  <Link href="/gallery" className="block text-3xl font-black text-white" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
                  <Link href="/contact" className="block text-3xl font-black text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-8 border-t border-zinc-800 pb-20"
                >
                  {user ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-xl font-black text-white shadow-2xl">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg capitalize">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>

                      <Link 
                        href={user.role === 'admin' ? '/admin/bookings' : '/dashboard'}
                        className="block text-center bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-red-600/50 transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Go to Dashboard
                      </Link>

                      <button 
                        onClick={handleLogout}
                        className="w-full bg-red-600/10 border-2 border-red-600 text-red-400 py-4 rounded-xl font-bold text-lg hover:bg-red-600 hover:text-white transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Link href="/login" className="block text-center border-2 border-zinc-700 text-white py-4 rounded-xl font-bold text-lg hover:border-red-600 hover:text-red-500 transition" onClick={() => setIsMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </motion.div>
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Link href="/signup" className="block text-center bg-white text-black py-4 rounded-xl font-bold text-lg shadow-2xl" onClick={() => setIsMobileMenuOpen(false)}>
                          Sign Up
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

'use client';

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, Download, Home, User, Calendar, Phone, Mail, MapPin, Loader2, Package } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')
  const router = useRouter()
  
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bookingId) return;
    
    fetch(`/api/booking-details/${bookingId}`)
      .then(res => res.json())
      .then(data => {
          if(!data.error) setBooking(data)
          setLoading(false)
      })
      .catch(err => setLoading(false))
  }, [bookingId])

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white"><Loader2 className="animate-spin w-10 h-10 text-red-600"/></div>
  
  if (!booking) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-2xl font-bold">Booking Not Found</h2>
        <button onClick={() => router.push('/')} className="bg-red-600 px-6 py-2 rounded-full font-bold">Go Home</button>
    </div>
  )

  const isPartial = booking.paidAmount < booking.totalAmount;
  const due = booking.totalAmount - booking.paidAmount;
  const itemName = booking.vehicles?.map((v:any) => v.name).join(', ') || booking.serviceName || "Adventure Package";

  return (
    <main className="bg-zinc-950 min-h-screen text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 flex justify-center">
        <div className="bg-white text-black w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative border border-gray-200">
            
            {/* Header Section */}
            <div className="bg-green-600 p-10 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 pattern-dots"></div>
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md shadow-lg border border-white/30">
                        <CheckCircle size={40} className="text-white" strokeWidth={3} />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Booking Confirmed!</h1>
                    <p className="opacity-90 mt-2 font-medium">Your adventure awaits in Bir Billing.</p>
                    <div className="mt-6 bg-green-800/40 inline-block px-4 py-1.5 rounded-full text-sm font-mono border border-white/20">
                        ID: #{booking._id.slice(-6).toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Details Body */}
            <div className="p-8">
                
                <div className="flex gap-4 items-start border-b border-dashed border-gray-300 pb-6 mb-6">
                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                        <Package size={28} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Booked Service</p>
                        <h2 className="text-xl font-black text-gray-800 leading-tight">
                            {itemName}
                        </h2>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 font-medium">
                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-red-500"/> {booking.startDate}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-red-500"/> Bir Billing</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Customer</p>
                        <p className="font-bold text-gray-900 flex items-center gap-2"><User size={14} className="text-gray-400"/> {booking.userName}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                        <p className="font-bold text-gray-900 flex items-center gap-2"><Phone size={14} className="text-gray-400"/> {booking.phone}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                        <p className="font-bold text-gray-900 flex items-center gap-2"><Mail size={14} className="text-gray-400"/> {booking.userEmail}</p>
                    </div>
                </div>

                <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-[50px] rounded-full pointer-events-none"></div>
                    
                    <div className="flex justify-between mb-3 relative z-10">
                        <span className="text-gray-400 text-sm">Total Amount</span>
                        <span className="font-bold text-lg">₹{booking.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-4 relative z-10 text-green-400">
                        <span className="font-medium text-sm">Paid Online</span>
                        <span className="font-bold text-lg">- ₹{booking.paidAmount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-px bg-white/10 mb-4 relative z-10"></div>
                    
                    <div className="flex justify-between items-center relative z-10">
                        <span className="font-bold text-sm uppercase tracking-wider text-gray-300">Payment Status</span>
                        {isPartial ? (
                            <div className="text-right">
                                <span className="block text-red-500 font-black text-2xl">₹{due.toLocaleString()}</span>
                                <span className="text-[10px] text-red-300 uppercase font-bold tracking-wide">Due at Location</span>
                            </div>
                        ) : (
                            <span className="text-green-500 font-bold text-xl flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">
                                <CheckCircle size={18}/> Fully Paid
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 py-3.5 rounded-xl font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <Download size={18}/> Save Receipt
                    </button>
                    {/* <button onClick={() => router.push('/dashboard')} className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5">
                        <Home size={18}/> Go to Dashboard
                    </button> */}
                </div>

            </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Calendar, MapPin, Clock, LogOut, Package, CheckCircle, Home } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

export default function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [payingId, setPayingId] = useState<string | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) { router.push('/admin/login'); return; }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    fetchMyBookings(parsedUser.email)
  }, [])

  const fetchMyBookings = async (email: string) => {
    try {
      const res = await fetch('/api/my-bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      const data = await res.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch (error) { console.error(error) } finally { setLoading(false) }
  }

  // --- PAYMENT LOGIC ---
  const handlePayRemaining = async (booking: any) => {
    const dueAmount = booking.totalAmount - booking.paidAmount;
    if (dueAmount <= 0) return alert("Already Paid!");

    setPayingId(booking._id);

    try {
      // 1. Create Order
      const res = await fetch('/api/razorpay/create-order', { 
        method: 'POST', headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ amount: dueAmount }) 
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error);

      // 2. Open Razorpay
      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.amount, 
        currency: "INR", 
        name: "Ride In Bir",
        description: `Remaining Payment for #${booking._id.slice(-6)}`, 
        order_id: data.id,
        handler: async (response: any) => { 
           // 3. Update DB & Send Mail
           await updateBookingStatus(booking._id, dueAmount, response.razorpay_payment_id);
        },
        prefill: { name: user.name, email: user.email, contact: booking.phone }, 
        theme: { color: "#DC2626" }
      });
      rzp.open();
    } catch (error) {
        console.error(error);
        alert("Payment Failed");
    } finally {
        setPayingId(null);
    }
  }

  const updateBookingStatus = async (id: string, amountPaid: number, paymentId: string) => {
      try {
          // Update Booking to Completed/Fully Paid
          const res = await fetch(`/api/admin/ride-bookings/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  status: 'Completed', 
                  paidAmount: amountPaid + bookings.find(b => b._id === id).paidAmount, // Add to existing paid
                  sendEmail: true, // Trigger email
                  paymentId: paymentId
              })
          });
          
          if(res.ok) {
              alert("Payment Successful! Booking Completed.");
              fetchMyBookings(user.email); // Refresh List
              router.push(`/success?id=${id}`); // Show Receipt
          }
      } catch(e) { alert("Update Failed but Payment Deducted. Contact Support."); }
  }

  const handleLogout = () => { localStorage.removeItem('user'); window.location.href = '/'; }

  if (!user) return <div className="min-h-screen bg-black flex justify-center items-center text-white">Loading...</div>;

  return (
    <main className="bg-zinc-950 min-h-screen text-white p-4 md:p-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 backdrop-blur-md sticky top-4 z-50">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white font-black text-xl">R</div>
                <div><h2 className="font-bold text-lg leading-none">Ride In Bir</h2><p className="text-xs text-gray-400">Client Portal</p></div>
            </div>
            <div className="flex gap-3">
                <Link href="/" className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full text-sm font-medium"><Home size={16} /> Website</Link>
                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-full text-sm font-medium"><LogOut size={16} /> Logout</button>
            </div>
        </header>

        <div className="mb-10 px-2">
            <h1 className="text-3xl md:text-5xl font-black text-white">Welcome, <span className="text-red-600 capitalize">{user.name}</span> 👋</h1>
        </div>

        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : bookings.length === 0 ? (
            <div className="bg-zinc-900 p-12 rounded-2xl text-center border border-zinc-800">
                <p className="text-gray-400 mb-6">No bookings yet.</p>
                <button onClick={() => router.push('/packages')} className="bg-red-600 text-white px-8 py-3 rounded-full font-bold">Explore Packages</button>
            </div>
        ) : (
            <div className="grid gap-6 pb-10">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 hover:border-red-600/40 transition-all flex flex-col lg:flex-row justify-between gap-6 shadow-lg">
                        <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.status === 'Completed' ? 'bg-blue-900/30 text-blue-400' : booking.status === 'Confirmed' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>{booking.status || 'Pending'}</span>
                                <span className="text-xs text-zinc-600 font-mono">#{booking._id.slice(-6)}</span>
                            </div>
                            <h4 className="text-2xl font-bold text-white">{booking.vehicles?.map((v:any) => v.name).join(', ') || booking.serviceName}</h4>
                            <div className="flex gap-6 text-sm text-gray-400"><span className="flex gap-2"><Calendar size={16}/> {booking.startDate}</span><span className="flex gap-2"><Clock size={16}/> {booking.days} Days</span></div>
                        </div>
                        <div className="lg:text-right min-w-[180px] bg-black/40 p-6 rounded-2xl border border-zinc-800/50 flex flex-col justify-center">
                            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-bold">Paid</p>
                            <div className="text-3xl font-black text-white mb-2">₹{booking.paidAmount}</div>
                            {booking.paidAmount < booking.totalAmount ? (
                                <div>
                                    <p className="text-red-500 text-xs font-bold mb-2">Due: ₹{booking.totalAmount - booking.paidAmount}</p>
                                    <button 
                                        onClick={() => handlePayRemaining(booking)} 
                                        disabled={payingId === booking._id}
                                        className="bg-red-600 text-white text-xs px-4 py-2 rounded-full hover:bg-red-700 font-bold shadow-lg transition-all disabled:opacity-50"
                                    >
                                        {payingId === booking._id ? 'Processing...' : 'Pay Remaining'}
                                    </button>
                                </div>
                            ) : <div className="text-green-500 text-xs font-bold flex items-center lg:justify-end gap-1"><CheckCircle size={14}/> Fully Paid</div>}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </main>
  )
}

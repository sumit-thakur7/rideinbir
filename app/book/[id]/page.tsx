'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Calendar, Users, CreditCard, CheckCircle, Loader2, MapPin, Clock } from 'lucide-react'

export default function BookingPage() {
  const { id } = useParams()
  const router = useRouter()
  
  const [pkg, setPkg] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1
  })

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch('/api/packages')
        const data = await res.json()
        const allPackages = Array.isArray(data.packages) ? data.packages : (Array.isArray(data) ? data : [])
        const foundPkg = allPackages.find((p: any) => p._id === id)
        if (foundPkg) setPkg(foundPkg)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchPackage()
  }, [id])

  const totalAmount = pkg ? pkg.price * form.guests : 0

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount })
      })
      
      const orderData = await orderRes.json()
      
      if (!orderData.orderId) {
        alert('Error creating order')
        setProcessing(false)
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "Ride in Bir",
        description: `Booking: ${pkg.title}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Payment successful - Save to DB
          await fetch('/api/razorpay/verify', { 
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ 
               ...response, 
               bookingDetails: { 
                 ...form, 
                 amount: totalAmount, 
                 packageId: pkg._id, 
                 packageName: pkg.title 
               } 
             })
          })
          
          // --- FIX: Redirect to Success Page ---
          router.push('/success')
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },
        theme: { color: "#DC2626" }
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()

      paymentObject.on('payment.failed', function (response: any){
        alert("Payment Failed");
        setProcessing(false)
      });

    } catch (error) {
      console.error(error)
      setProcessing(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>
  if (!pkg) return <div className="min-h-screen bg-black text-white flex justify-center items-center">Package Not Found</div>

  return (
    <main className="bg-zinc-950 min-h-screen text-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img src={pkg.image} className="w-full h-64 object-cover rounded-2xl mb-8" />
            <h1 className="text-3xl font-black mb-4">{pkg.title}</h1>
            <div className="bg-zinc-900 p-6 rounded-2xl">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span><span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="bg-white text-black p-8 rounded-3xl">
            <h2 className="text-2xl font-black mb-6">Enter Details</h2>
            <form onSubmit={handlePayment} className="space-y-4">
              <input type="text" required placeholder="Name" className="w-full border p-3 rounded-lg" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input type="email" required placeholder="Email" className="w-full border p-3 rounded-lg" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <input type="tel" required placeholder="Phone" className="w-full border p-3 rounded-lg" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" required className="w-full border p-3 rounded-lg" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                <input type="number" min="1" required className="w-full border p-3 rounded-lg" value={form.guests} onChange={e => setForm({...form, guests: parseInt(e.target.value)})} />
              </div>
              <button type="submit" disabled={processing} className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2">
                {processing ? <Loader2 className="animate-spin" /> : <CreditCard />}
                {processing ? 'Processing...' : `Pay ₹${totalAmount.toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

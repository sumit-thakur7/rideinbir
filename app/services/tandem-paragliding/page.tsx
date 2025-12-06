'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { X, Info, Trash2, Plus, Minus, CheckCircle, XCircle, Wind, Cloud, Camera, Shield, Clock, MapPin, Users, ShoppingCart, Check } from 'lucide-react';
import Script from 'next/script';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- RICH DATA FOR TANDEM ---
const items = [
  { 
    id: 1, 
    name: "Classic Joyride (15-20 Mins)", 
    price: 3000, 
    image: "/tandem/112.jpeg", 
    desc: "The standard flight from Billing to Bir. Experience the thrill of free flight.",
    details: {
      overview: "This is the most popular flight in Bir Billing. You take off from 8000 ft (Billing) and land at 4300 ft (Bir). It's a smooth glide offering panoramic views of the Dhauladhar range and the tea gardens below.",
      stats: [
        { label: "Altitude", value: "8000 ft" },
        { label: "Airtime", value: "15-20 Mins" },
        { label: "Distance", value: "14 km Aerial" }
      ],
      plan: [
        { title: "Drive", content: "30-40 min jeep ride from Bir to Billing take-off site." },
        { title: "Briefing", content: "5 min safety briefing and harness check by pilot." },
        { title: "Flight", content: "Run a few steps and take off! Enjoy the glide." },
        { title: "Landing", content: "Soft landing at the sunset point in Bir." }
      ],
      rules: ["Weight Limit: 25kg to 90kg", "No loose items (phone/keys) in hands"],
      included: ["Transport to Take-off", "Certified Pilot", "Safety Gear", "GoPro Video (Raw)"],
      excluded: ["Insurance", "Pick up from hotel"]
    }
  },
  { 
    id: 2, 
    name: "Premium Long Flight (30-45 Mins)", 
    price: 5000, 
    image: "/tandem/108.jpeg", 
    desc: "Fly higher and longer using thermal currents. For true adventure lovers.",
    details: {
      overview: "Want to touch the clouds? In this flight, the pilot uses thermal lifts to gain height above the take-off point. You fly closer to the snow-capped peaks and stay in the air much longer. Highly recommended for nature lovers.",
      stats: [
        { label: "Altitude", value: "9000+ ft" },
        { label: "Airtime", value: "30-45 Mins" },
        { label: "Experience", value: "Cloud Base" }
      ],
      plan: [
        { title: "Take-off", content: "Standard launch from Billing." },
        { title: "Thermalling", content: "Circling in hot air columns to gain height." },
        { title: "Soaring", content: "Flying along the mountain ridge." },
        { title: "Landing", content: "Touch down at Bir landing site." }
      ],
      rules: ["Not recommended if you have motion sickness", "Warm clothes mandatory"],
      included: ["Long Airtime", "HD Video", "Experienced XC Pilot"],
      excluded: ["Vomit bags (Just kidding, be prepared!)"]
    }
  },
  { 
    id: 3, 
    name: "Acrobatic Flight (Stunts)", 
    price: 4500, 
    image: "/tandem/110.jpeg", 
    desc: "Adrenaline rush with mid-air maneuvers like Wingover and Spirals.",
    details: {
      overview: "Not for the faint-hearted! After a normal flight, the pilot performs high-G maneuvers like SAT, Spirals, and Wingovers. You will feel the G-force and see the world spin. Pure adrenaline.",
      stats: [
        { label: "Intensity", value: "High" },
        { label: "Maneuvers", value: "SAT/Spiral" },
        { label: "G-Force", value: "2G - 3G" }
      ],
      plan: [
        { title: "Cruising", content: "Normal flight to reach safe altitude over landing site." },
        { title: "Action", content: "Pilot performs stunts decreasing altitude rapidly." },
        { title: "Landing", content: "Land with a pumping heart!" }
      ],
      rules: ["Strictly no heavy meal before flight", "Tell pilot to stop if dizzy"],
      included: ["Stunt Pilot", "GoPro Footage", "Transport"],
      excluded: ["Insurance"]
    }
  },
  { 
    id: 4, 
    name: "Sunset Flight", 
    price: 3500, 
    image: "/tandem/128.jpeg", 
    desc: "Fly during the golden hour. Magical views of the sun setting over the horizon.",
    details: {
      overview: "The most romantic and scenic flight time. Take off just as the sun starts to dip. The entire valley turns golden, and the air becomes super smooth (laminar). Perfect for couples and photographers.",
      stats: [
        { label: "Time", value: "4:00 PM - 5:00 PM" },
        { label: "Vibe", value: "Calm & Smooth" },
        { label: "View", value: "Golden Horizon" }
      ],
      plan: [
        { title: "Timing", content: "Reach Billing by 3:30 PM." },
        { title: "Flight", content: "Airtime approx 15-20 mins in golden light." },
        { title: "Photos", content: "Best lighting for selfies and videos." }
      ],
      rules: ["Limited slots per day", "Weather dependent"],
      included: ["Sunset Slot Priority", "Video", "Transport"],
      excluded: ["Extra airtime (wind usually drops in eve)"]
    }
  }
];

function PageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [days, setDays] = useState(1); // Flyers
  const [date, setDate] = useState(''); // Correctly defined state
  const [paymentMode, setPaymentMode] = useState<'full'|'half'>('full');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (it: any) => setCart(p => { const ex = p.find(x => x.id === it.id); return ex ? p.map(x => x.id === it.id ? {...x, qty: x.qty+1} : x) : [...p, {...it, qty: 1}] });
  const updateQty = (id: number, d: number) => setCart(p => p.map(x => x.id === id ? {...x, qty: Math.max(1, x.qty+d)} : x));
  const remove = (id: number) => setCart(p => p.filter(x => x.id !== id));

  const total = cart.reduce((a, b) => a + (b.price * b.qty), 0) * days;
  const payable = paymentMode === 'full' ? total : Math.ceil(total / 2);

  const saveBookingToDB = async (paymentId: string, amountPaid: number) => {
    try {
       const res = await fetch('/api/book-ride', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: form.name, userEmail: form.email, phone: form.phone,
          vehicles: cart, totalAmount: total, paidAmount: amountPaid,
          paymentMode: paymentMode, paymentId: paymentId, startDate: date, days
        }),
      });
      return await res.json();
    } catch (error) { console.error('DB Error', error); return null; }
  };

  const pay = async () => {
    if(!cart.length || !date || !form.name || !form.phone || !form.email) return alert("Fill all details!");
    setLoading(true);
    try {
      const res = await fetch('/api/razorpay/create-order', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ amount: payable }) });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error);
      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, amount: data.amount, currency: "INR", name: "Ride In Bir",
        description: "Course Booking", order_id: data.id,
        handler: async (response: any) => {
          const bookingData = await saveBookingToDB(response.razorpay_payment_id, payable);
          setCart([]); setForm({name:'', email:'', phone:''});
          if(bookingData && bookingData.bookingId) {
             router.push(`/success?id=${bookingData.bookingId}`);
          } else {
             window.location.href = '/success';
          }
        },
        prefill: { name: form.name, email: form.email, contact: form.phone }, theme: { color: "#DC2626" }
      });
      rzp.open();
    } catch(e) { alert("Payment Failed"); } finally { setLoading(false); }
  };

  const scrollToCart = () => {
    const cartElement = document.getElementById('cart-section');
    if (cartElement) cartElement.scrollIntoView({ behavior: 'smooth' });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar /><Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="pt-32 pb-10 text-center bg-zinc-900 border-b border-zinc-800">
        <h1 className="text-5xl font-black uppercase">Tandem <span className="text-red-600">Paragliding</span></h1>
        <p className="text-gray-400 mt-2">Fly like a bird from the world's 2nd highest site.</p>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10 mb-20">
        {/* Left: Flight Grid */}
        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
          {items.map(item => {
            const inCart = cart.find(c => c.id === item.id);
            return (
            <div key={item.id} className={`bg-zinc-900 rounded-3xl overflow-hidden border transition-all duration-300 shadow-lg group ${inCart ? 'border-green-500 ring-1 ring-green-500' : 'border-zinc-800 hover:border-red-900/50'}`}>
              <div className="h-56 relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                  <div className="absolute top-2 right-2 bg-red-600 text-xs font-bold px-3 py-1 rounded-full">₹{item.price}</div>
                  {inCart && <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10"><CheckCircle size={12}/> Selected</div>}
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.desc}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setModalData(item)} className="flex-1 py-2.5 rounded-full border border-gray-600 text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"><Info size={16}/> Details</button>
                    <button 
                        onClick={() => addToCart(item)} 
                        className={`flex-1 py-2.5 rounded-full text-sm font-bold shadow-lg transition flex items-center justify-center gap-2 ${inCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                    >
                        {inCart ? `Added (${inCart.qty})` : 'Book Flight'}
                    </button>
                  </div>
              </div>
            </div>
          )})}
        </div>

        {/* Right: Cart */}
        <div id="cart-section" className="lg:w-1/3 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 h-fit sticky top-24 shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShoppingCart className="text-red-500"/> Flight Cart</h3>
            {cart.length===0 && <p className="text-gray-500 text-sm text-center py-4">Choose a flight.</p>}
            {cart.map(i => <div key={i.id} className="flex justify-between bg-black/40 p-3 mb-2 rounded-xl text-sm border border-zinc-800"><div><div className="font-bold">{i.name}</div><div className="text-xs text-gray-400">₹{i.price} x {i.qty}</div></div><div className="flex gap-2 items-center"><button onClick={()=>updateQty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={()=>updateQty(i.id, 1)}>+</button><Trash2 size={16} onClick={()=>remove(i.id)} className="text-red-500"/></div></div>)}
            
            <div className={`mt-6 space-y-3 transition-opacity duration-500 ${cart.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <input type="date" onChange={e => setDate(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm text-white [color-scheme:dark]" />
                <input type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm" placeholder="Total Flyers" />
                
                <div className="flex gap-2">
                    <button onClick={() => setPaymentMode('full')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='full'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Full: ₹{total}</button>
                    <button onClick={() => setPaymentMode('half')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='half'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Half: ₹{Math.ceil(total/2)}</button>
                </div>

                <input placeholder="Flyer Name" onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                
                <button onClick={pay} disabled={loading || cart.length===0} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-full font-bold mt-2 disabled:opacity-50">{loading?'Processing...':`Pay ₹${payable} Now`}</button>
            </div>
        </div>
      </div>

      {/* Floating Mobile Cart Button */}
      {totalItems > 0 && (
         <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-zinc-900 border border-zinc-700 p-4 rounded-2xl shadow-2xl z-40 flex justify-between items-center animate-in slide-in-from-bottom-4">
            <div>
                <p className="text-white font-bold text-sm">{totalItems} Flight(s) Added</p>
                <p className="text-xs text-gray-400">Complete your booking</p>
            </div>
            <button onClick={scrollToCart} className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
              Go to Cart
            </button>
         </div>
      )}

      {/* --- DETAILED FULL-SCREEN MODAL --- */}
      {modalData && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-2 md:p-6 overflow-hidden">
            <div className="bg-zinc-900 w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] rounded-3xl border border-zinc-700 shadow-2xl flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="relative h-48 md:h-56 shrink-0">
                    <img src={modalData.image} className="w-full h-full object-cover opacity-50"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"/>
                    <button onClick={() => setModalData(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-600 transition z-10"><X size={24} /></button>
                    <div className="absolute bottom-6 left-6">
                        <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block uppercase">Takeoff: 8000 FT</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white">{modalData.name}</h2>
                    </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Wind size={20} className="text-blue-500"/> Flight Experience</h3>
                                <p className="text-gray-300 leading-relaxed text-sm">{modalData.details.overview}</p>
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {modalData.details.stats.map((s:any, i:number) => (
                                        <div key={i} className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-center">
                                            <div className="text-xs text-gray-400">{s.label}</div>
                                            <div className="font-bold text-white text-sm">{s.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin size={20} className="text-yellow-500"/> Flight Plan</h3>
                                <div className="space-y-4 relative border-l-2 border-zinc-800 ml-2 pl-6">
                                    {modalData.details.plan.map((s:any, i:number) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 bg-red-600 rounded-full border-4 border-zinc-900"/>
                                            <h4 className="font-bold text-white text-sm mb-1">{s.title}</h4>
                                            <p className="text-xs text-gray-400">{s.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/> Inclusions</h3>
                                <ul className="space-y-2">{modalData.details.included.map((item:string, i:number) => <li key={i} className="text-xs text-gray-300 flex gap-2"><CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5"/> {item}</li>)}</ul>
                            </div>
                            <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><XCircle size={18} className="text-red-500"/> Exclusions</h3>
                                <ul className="space-y-2">{modalData.details.excluded.map((item:string, i:number) => <li key={i} className="text-xs text-gray-300 flex gap-2"><XCircle size={14} className="text-red-500 shrink-0 mt-0.5"/> {item}</li>)}</ul>
                            </div>
                            <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Shield size={18} className="text-orange-500"/> Rules</h3>
                                <ul className="space-y-2">{modalData.details.rules.map((item:string, i:number) => <li key={i} className="text-xs text-gray-300 flex gap-2"><Shield size={14} className="text-orange-500 shrink-0 mt-0.5"/> {item}</li>)}</ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900 flex justify-end gap-4 shrink-0">
                    <button onClick={() => setModalData(null)} className="px-6 py-3 rounded-full border border-gray-600 text-sm hover:bg-gray-800">Close</button>
                    <button onClick={() => { addToCart(modalData); setModalData(null); }} className="px-8 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg">Book Flight - ₹{modalData.price}</button>
                </div>
            </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
export default function Page() { return <SessionProvider><PageContent /></SessionProvider>; }

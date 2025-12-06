'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { X, Info, Trash2, Plus, Minus, CheckCircle, XCircle, Map, Shield, Fuel, Clock, Users, MapPin, Settings } from 'lucide-react';
import Script from 'next/script';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- RICH DATA FOR JEEP SAFARI ---
const items = [
  { 
    id: 1, 
    name: "Maruti Gypsy King (Open Top)", 
    price: 2500, 
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80", 
    desc: "The classic off-road legend. Open top experience for best views.",
    details: {
      overview: "Experience the raw thrill of the mountains in the legendary Maruti Gypsy. With its open-top design, you get 360-degree unobstructed views of the Dhauladhar range and tea gardens. Perfect for sunset chases and photography lovers.",
      specs: [
        { label: "Seating", value: "4 Passengers + Driver" },
        { label: "Type", value: "4x4 Off-road (Open Top)" },
        { label: "Comfort", value: "Basic (Raw Experience)" }
      ],
      trip_plan: [
        { title: "Pickup", content: "From your Hotel or Landing Site." },
        { title: "Points Covered", content: "Landing Site -> Deer Park -> Bangoru Waterfall -> Sunset Point." },
        { title: "Duration", content: "Approx 2-3 Hours." }
      ],
      rules: ["No standing while vehicle is moving", "Driver is the final authority on route safety"],
      included: ["Fuel & Driver Allowances", "Pick & Drop (Within 3km)", "Music System (Aux/BT)"],
      excluded: ["Entry tickets (if any)", "Food & Beverages", "Waiting charges > 30 mins"]
    }
  },
  { 
    id: 2, 
    name: "Mahindra Thar (Convertible)", 
    price: 3500, 
    image: "https://images.unsplash.com/photo-1621994153176-3f338270df33?auto=format&fit=crop&w=800&q=80", 
    desc: "Modern luxury meets off-road capability. AC and comfortable seating.",
    details: {
      overview: "Ride in style with the Mahindra Thar. It offers a comfortable, air-conditioned ride while tackling the rough terrains of Billing with ease. Suitable for families or those who want comfort along with adventure.",
      specs: [
        { label: "Seating", value: "4 Passengers + Driver" },
        { label: "Type", value: "4x4 Luxury Off-road" },
        { label: "Comfort", value: "High (AC & Cushioned Seats)" }
      ],
      trip_plan: [
        { title: "Route", content: "Bir -> Billing Take-off Site (14km uphill)." },
        { title: "Experience", content: "Drive through dense oak forests and clouds." },
        { title: "Halt", content: "1 Hour halt at Billing top for photos/cafe." }
      ],
      rules: ["Keep windows closed in dusty areas", "No smoking inside the vehicle"],
      included: ["AC Ride", "Professional Driver", "Fuel", "Parking Fees"],
      excluded: ["Paragliding Cost", "Meals at Billing", "Extra Detours"]
    }
  },
  { 
    id: 3, 
    name: "Force Gurkha (The Beast)", 
    price: 4000, 
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80", 
    desc: "Ultimate 4x4 capability for extreme terrains and larger groups.",
    details: {
      overview: "The Force Gurkha is built for the toughest trails. With its high ground clearance and snorkel, it can go where others hesitate. It offers spacious seating for up to 6 people, making it ideal for larger groups.",
      specs: [
        { label: "Seating", value: "6 Passengers + Driver" },
        { label: "Type", value: "Extreme 4x4" },
        { label: "Views", value: "Panoramic Windows" }
      ],
      trip_plan: [
        { title: "Adventure Route", content: "Bir -> Hidden River Stream -> Off-road trail." },
        { title: "Activity", content: "River crossing (if water level permits)." },
        { title: "Duration", content: "3-4 Hours of pure adventure." }
      ],
      rules: ["Seatbelts mandatory in front", "Follow driver instructions on steep inclines"],
      included: ["6 Pax Capacity", "Off-road Expertise", "Fuel"],
      excluded: ["Personal Insurance", "Tips for Driver"]
    }
  },
  { 
    id: 4, 
    name: "Sunset Safari (Short Trip)", 
    price: 2000, 
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80", 
    desc: "Quick getaway to the best sunset viewpoint in Bir.",
    details: {
      overview: "Short on time? This quick 1.5 to 2-hour safari takes you directly to the best vantage points in Bir to witness the magical sunset over the Dhauladhar ranges.",
      specs: [
        { label: "Vehicle", value: "Gypsy or Jeep (Based on availability)" },
        { label: "Timing", value: "4:30 PM to 6:30 PM" },
        { label: "Vibe", value: "Relaxed & Scenic" }
      ],
      trip_plan: [
        { title: "Start", content: "Pickup at 4:30 PM." },
        { title: "Sunset", content: "Reach sunset point by 5:15 PM." },
        { title: "Return", content: "Drop back by 6:30 PM." }
      ],
      rules: ["Timing is strict to catch sunset", "Shared vehicle possible if single pax"],
      included: ["Transport", "Driver"],
      excluded: ["Waiting beyond sunset"]
    }
  }
];

function PageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [days, setDays] = useState(1); // Trips
  const [startDate, setStartDate] = useState('');
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
          paymentMode: paymentMode, paymentId: paymentId, startDate: startDate, days
        }),
      });
      return await res.json();
    } catch (error) { console.error('DB Error', error); return null; }
  };

  const pay = async () => {
    if(!cart.length || !startDate || !form.name || !form.phone || !form.email) return alert("Fill all details!");
    setLoading(true);
    try {
      const res = await fetch('/api/razorpay/create-order', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ amount: payable }) });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error);
      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, amount: data.amount, currency: "INR", name: "Ride In Bir",
        description: "Jeep Safari Booking", order_id: data.id,
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

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar /><Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="pt-32 pb-10 text-center bg-zinc-900 border-b border-zinc-800">
        <h1 className="text-5xl font-black uppercase">Jeep <span className="text-red-600">Safari</span></h1>
        <p className="text-gray-400 mt-2">Explore the mountains in 4x4 Beasts.</p>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        {/* Left: Jeep Grid */}
        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
          {items.map(item => {
             const inCart = cart.find(c => c.id === item.id);
             return (
            <div key={item.id} className={`bg-zinc-900 rounded-3xl overflow-hidden border transition-all duration-300 shadow-lg group ${inCart ? 'border-green-500 ring-1 ring-green-500' : 'border-zinc-800 hover:border-red-900/50'}`}>
              <div className="h-56 relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                  <div className="absolute top-2 right-2 bg-red-600 text-xs font-bold px-3 py-1 rounded-full">₹{item.price}/Trip</div>
                  {inCart && <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10"><CheckCircle size={12}/> Selected</div>}
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.desc}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setModalData(item)} className="flex-1 py-2.5 rounded-full border border-gray-600 text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"><Info size={16}/> Trip Info</button>
                    <button 
                        onClick={() => addToCart(item)} 
                        className={`flex-1 py-2.5 rounded-full text-sm font-bold shadow-lg transition ${inCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                    >
                        {inCart ? `Added (${inCart.qty})` : 'Book Jeep'}
                    </button>
                  </div>
              </div>
            </div>
           )
          })}
        </div>

        {/* Right: Cart */}
        <div className="lg:w-1/3 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 h-fit sticky top-24 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Safari Booking</h3>
            {cart.length===0 && <p className="text-gray-500 text-sm text-center py-4">Select a vehicle.</p>}
            {cart.map(i => <div key={i.id} className="flex justify-between bg-black/40 p-3 mb-2 rounded-xl text-sm border border-zinc-800"><div><div className="font-bold">{i.name}</div><div className="text-xs text-gray-400">₹{i.price} x {i.qty}</div></div><div className="flex gap-2 items-center"><button onClick={()=>updateQty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={()=>updateQty(i.id, 1)}>+</button><Trash2 size={16} onClick={()=>remove(i.id)} className="text-red-500"/></div></div>)}
            <div className="mt-6 space-y-3">
                <input type="date" onChange={e => setStartDate(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm text-white [color-scheme:dark]" />
                <input type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm" placeholder="No. of Trips" />
                
                <div className="flex gap-2">
                    <button onClick={() => setPaymentMode('full')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='full'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Full: ₹{total}</button>
                    <button onClick={() => setPaymentMode('half')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='half'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Half: ₹{Math.ceil(total/2)}</button>
                </div>

                <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                
                <button onClick={pay} disabled={loading || cart.length===0} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-full font-bold mt-2 disabled:opacity-50">
                    {loading?'Processing...':`Pay ₹${payable} Now`}
                </button>
            </div>
        </div>
      </div>

      {/* --- DETAILED MODAL --- */}
      {modalData && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-2 md:p-6 overflow-hidden">
            <div className="bg-zinc-900 w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] rounded-3xl border border-zinc-700 shadow-2xl flex flex-col overflow-hidden">
                <div className="relative h-48 md:h-56 shrink-0">
                    <img src={modalData.image} className="w-full h-full object-cover opacity-50"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"/>
                    <button onClick={() => setModalData(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-600 transition z-10"><X size={24} /></button>
                    <div className="absolute bottom-6 left-6">
                        <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block uppercase">4x4 Adventure</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white">{modalData.name}</h2>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Map size={20} className="text-blue-500"/> Overview</h3>
                                <p className="text-gray-300 leading-relaxed text-sm">{modalData.details.overview}</p>
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {modalData.details.specs.map((s:any, i:number) => (
                                        <div key={i} className="bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                                            <div className="text-xs text-gray-400">{s.label}</div>
                                            <div className="font-bold text-white text-sm">{s.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin size={20} className="text-yellow-500"/> Trip Plan</h3>
                                <div className="space-y-3">
                                    {modalData.details.trip_plan.map((s:any, i:number) => (
                                        <div key={i} className="bg-black/30 p-4 rounded-xl border border-zinc-800 flex gap-4 items-center">
                                            <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm">{s.title}</h4>
                                                <p className="text-xs text-gray-400">{s.content}</p>
                                            </div>
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
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Shield size={18} className="text-orange-500"/> Safety Rules</h3>
                                <ul className="space-y-2">{modalData.details.rules.map((item:string, i:number) => <li key={i} className="text-xs text-gray-300 flex gap-2"><Shield size={14} className="text-orange-500 shrink-0 mt-0.5"/> {item}</li>)}</ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900 flex justify-end gap-4 shrink-0">
                    <button onClick={() => setModalData(null)} className="px-6 py-3 rounded-full border border-gray-600 text-sm hover:bg-gray-800">Close</button>
                    <button onClick={() => { addToCart(modalData); setModalData(null); }} className="px-8 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg">Book Jeep - ₹{modalData.price}</button>
                </div>
            </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
export default function Page() { return <SessionProvider><PageContent /></SessionProvider>; }

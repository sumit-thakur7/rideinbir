'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { X, Info, Trash2, Plus, Minus, CheckCircle, XCircle, Map, Shield, Zap, Settings, MapPin } from 'lucide-react';
import Script from 'next/script';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- RICH DATA FOR MTB ---
const items = [
  { 
    id: 1, 
    name: "Standard MTB (Hardtail)", 
    price: 500, 
    image: "https://images.unsplash.com/photo-1576435728678-be95f39e8f53?auto=format&fit=crop&w=800&q=80", 
    desc: "Lightweight hardtail bike suitable for road cycling and light gravel trails.",
    details: {
      overview: "Our Standard MTB is perfect for exploring the streets of Bir, visiting monasteries, and riding on the smooth roads towards the landing site. It features front suspension to handle small bumps comfortably.",
      specs: [
        { label: "Gears", value: "21 Speed Shimano" },
        { label: "Brakes", value: "Mechanical Disc" },
        { label: "Suspension", value: "Front Only" }
      ],
      best_for: ["City Ride", "Monastery Loop", "Sunset Point"],
      rules: ["Helmet is mandatory (Included)", "ID Proof deposit required"],
      included: ["Helmet", "Cycle Lock", "Basic Repair Kit"],
      excluded: ["Guide", "Water Bottle", "Severe Damage Repair"]
    }
  },
  { 
    id: 2, 
    name: "Pro MTB (Hydraulic)", 
    price: 800, 
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80", 
    desc: "High-performance bike with hydraulic brakes for steep descents.",
    details: {
      overview: "The Pro MTB is designed for riders who want more control. Hydraulic disc brakes ensure you have stopping power on steep slopes like the ride down from Billing or Upper Bir. Better suspension makes the ride smoother.",
      specs: [
        { label: "Gears", value: "24/27 Speed Shimano" },
        { label: "Brakes", value: "Hydraulic Disc" },
        { label: "Suspension", value: "Lockout Front Susp." }
      ],
      best_for: ["Billing Descent", "Upper Bir Offroad", "Long Distance"],
      rules: ["Check brakes before riding", "Report any damage immediately"],
      included: ["Pro Helmet", "Gloves", "Phone Holder", "Pump"],
      excluded: ["Personal Insurance", "Rescue Vehicle"]
    }
  },
  { 
    id: 3, 
    name: "Electric MTB (E-Bike)", 
    price: 1500, 
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80", 
    desc: "Pedal-assist E-bike. Climb mountains without getting tired.",
    details: {
      overview: "Want to go uphill to Billing but don't have the stamina? The E-Bike gives you a power boost with every pedal. You can easily conquer steep climbs and enjoy the view without exhaustion.",
      specs: [
        { label: "Battery", value: "50km Range" },
        { label: "Motor", value: "250W Hub Motor" },
        { label: "Mode", value: "Pedal Assist" }
      ],
      best_for: ["Uphill to Billing", "Relaxed Sightseeing", "Non-Athletes"],
      rules: ["Do not drain battery completely", "Keep away from deep water"],
      included: ["Charger (for multi-day)", "Helmet", "Safety Gear"],
      excluded: ["Rescue if battery dies"]
    }
  },
  { 
    id: 4, 
    name: "Downhill Enduro Bike", 
    price: 2000, 
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&w=800&q=80", 
    desc: "Full suspension beast for technical trails and jumps.",
    details: {
      overview: "Strictly for experienced riders. This full-suspension bike is built to handle jumps, drops, and technical forest trails. It absorbs big hits and keeps you stable at high speeds on rough terrain.",
      specs: [
        { label: "Suspension", value: "Full (Front & Rear)" },
        { label: "Travel", value: "160mm Travel" },
        { label: "Tyres", value: "Tubeless Wide Grip" }
      ],
      best_for: ["Forest Trails", "Jumps & Drops", "Technical Riding"],
      rules: ["Safety Pads Mandatory", "Damage deposit required"],
      included: ["Full Face Helmet", "Knee/Elbow Pads", "Body Armor"],
      excluded: ["Guide (Recommended)", "Major Crash Damage"]
    }
  }
];

function PageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [days, setDays] = useState(1); // Days
  const [date, setDate] = useState('');
  const [paymentMode, setPaymentMode] = useState<'full'|'half'>('full'); // Updated name
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (it: any) => setCart(p => { const ex = p.find(x => x.id === it.id); return ex ? p.map(x => x.id === it.id ? {...x, qty: x.qty+1} : x) : [...p, {...it, qty: 1}] });
  const updateQty = (id: number, d: number) => setCart(p => p.map(x => x.id === id ? {...x, qty: Math.max(1, x.qty+d)} : x));
  const remove = (id: number) => setCart(p => p.filter(x => x.id !== id));

  const total = cart.reduce((a, b) => a + (b.price * b.qty), 0) * days;
  const payable = paymentMode === 'full' ? total : Math.ceil(total / 2); // Logic fixed

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
        description: "MTB Booking", order_id: data.id,
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
        <h1 className="text-5xl font-black uppercase">Mountain <span className="text-red-600">Biking</span></h1>
        <p className="text-gray-400 mt-2">Rent Premium MTB cycles & Explore.</p>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
          {items.map(item => {
            const inCart = cart.find(c => c.id === item.id);
            return (
            <div key={item.id} className={`bg-zinc-900 rounded-3xl overflow-hidden border transition-all duration-300 shadow-lg group ${inCart ? 'border-green-500 ring-1 ring-green-500' : 'border-zinc-800 hover:border-red-900/50'}`}>
              <div className="h-56 relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                  <div className="absolute top-2 right-2 bg-red-600 text-xs font-bold px-3 py-1 rounded-full">₹{item.price}/Day</div>
                  {inCart && <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10"><CheckCircle size={12}/> Selected</div>}
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.desc}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setModalData(item)} className="flex-1 py-2.5 rounded-full border border-gray-600 text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"><Info size={16}/> Bike Details</button>
                    <button 
                        onClick={() => addToCart(item)} 
                        className={`flex-1 py-2.5 rounded-full text-sm font-bold shadow-lg transition flex items-center justify-center gap-2 ${inCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                    >
                        {inCart ? 'Added' : 'Rent Now'}
                    </button>
                  </div>
              </div>
            </div>
          )})}
        </div>

        <div className="lg:w-1/3 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 h-fit sticky top-24 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Rental Cart</h3>
            {cart.length===0 && <p className="text-gray-500 text-sm text-center py-4">No bike selected.</p>}
            {cart.map(i => <div key={i.id} className="flex justify-between bg-black/40 p-3 mb-2 rounded-xl text-sm border border-zinc-800"><div><div className="font-bold">{i.name}</div><div className="text-xs text-gray-400">₹{i.price} x {i.qty}</div></div><div className="flex gap-2 items-center"><button onClick={()=>updateQty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={()=>updateQty(i.id, 1)}>+</button><Trash2 size={16} onClick={()=>remove(i.id)} className="text-red-500"/></div></div>)}
            <div className="mt-6 space-y-3">
                <input type="date" onChange={e => setDate(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm text-white [color-scheme:dark]" />
                <input type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm" placeholder="No. of Days" />
                <div className="flex gap-2"><button onClick={() => setPaymentMode('full')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='full'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Full: ₹{total}</button><button onClick={() => setPaymentMode('half')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='half'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Half: ₹{Math.ceil(total/2)}</button></div>
                <input placeholder="Rider Name" onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <button onClick={pay} disabled={loading || cart.length===0} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-full font-bold mt-2 disabled:opacity-50">{loading?'Processing...':`Pay ₹${payable} Now`}</button>
            </div>
        </div>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-2 md:p-6 overflow-hidden">
            <div className="bg-zinc-900 w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] rounded-3xl border border-zinc-700 shadow-2xl flex flex-col overflow-hidden">
                <div className="relative h-48 md:h-56 shrink-0">
                    <img src={modalData.image} className="w-full h-full object-cover opacity-50"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"/>
                    <button onClick={() => setModalData(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-600 transition z-10"><X size={24} /></button>
                    <div className="absolute bottom-6 left-6">
                        <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block uppercase">MTB Rental</span>
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
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin size={20} className="text-yellow-500"/> Best Routes</h3>
                                <ul className="space-y-2">
                                    {modalData.details.best_for.map((route:string, i:number) => (
                                        <li key={i} className="flex gap-2 text-sm text-gray-300"><MapPin size={16} className="text-yellow-500 mt-0.5"/> {route}</li>
                                    ))}
                                </ul>
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
                    <button onClick={() => { addToCart(modalData); setModalData(null); }} className="px-8 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg">Rent Bike - ₹{modalData.price}</button>
                </div>
            </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
export default function Page() { return <SessionProvider><PageContent /></SessionProvider>; }

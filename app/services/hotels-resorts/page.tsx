
'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { X, Info, Trash2, Plus, Minus, CheckCircle, XCircle, Wifi, Coffee, MapPin, Bed, Home, Star, Shield, Utensils, Music, ShoppingCart, Check } from 'lucide-react';
import Script from 'next/script';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- NEW RICH DATA FOR HOTELS ---
const items = [
  { 
    id: 1, 
    name: "Hotel Pink Park", 
    price: 2500, 
    image: "/hotal/301.jpg", 
    desc: "Premium hotel offering the best sunset views of the Dhauladhar range.",
    details: {
      overview: "Hotel Pink Park is one of the most sought-after properties in Bir. Located perfectly to offer a panoramic view of the paragliders landing and the majestic mountains. Known for its spacious rooms with private balconies and hospitality.",
      amenities: [
        { title: "Luxury Rooms", content: "Spacious rooms with valley view balconies." },
        { title: "Rooftop Dining", content: "Open-air restaurant with sunset view." },
        { title: "Facilities", content: "Free Parking, Elevator, 24/7 Power Backup." }
      ],
      food: "Multi-cuisine restaurant serving delicious North Indian and Continental food.",
      vibes: ["Family Friendly", "Sunset View", "Comfort"],
      rules: ["Check-in: 12:00 PM", "Check-out: 11:00 AM"],
      included: ["Breakfast", "Wifi", "Welcome Drink", "Toiletries"],
      excluded: ["Laundry", "Room Heater (Chargeable)", "Taxi Service"]
    }
  },
  { 
    id: 2, 
    name: "Freestays Bir", 
    price: 1200, 
    image: "/hotal/302.png", 
    desc: "The ultimate co-living space for digital nomads and backpackers.",
    details: {
      overview: "Freestays is designed for the modern traveler. It's not just a stay; it's a community. With high-speed internet, dedicated workstations, and a vibrant crowd, it is the best place for a workation in Bir.",
      amenities: [
        { title: "Workstations", content: "Ergonomic chairs and high-speed fiber internet." },
        { title: "Community", content: "Common lounge, bonfire area, and gaming zone." },
        { title: "Stay Options", content: "Comfortable dorms and private rooms available." }
      ],
      food: "Community kitchen access and in-house cafe for quick bites.",
      vibes: ["Workation", "Socializing", "Backpacker Friendly"],
      rules: ["Quiet hours in workspace", "Clean up after yourself in kitchen"],
      included: ["High-Speed Wifi", "Kitchen Access", "Community Events"],
      excluded: ["Meals (A la carte)", "Personal Lockers"]
    }
  },
  { 
    id: 3, 
    name: "Moonshine Villa Bir", 
    price: 3500, 
    image: "/hotal/303.webp", 
    desc: "A boutique villa experience offering peace, privacy, and luxury.",
    details: {
      overview: "Moonshine Villa offers a serene escape from the crowd. Tucked away in a quiet corner, this boutique property features artistic interiors, lush green lawns, and a cozy atmosphere perfect for couples and peace seekers.",
      amenities: [
        { title: "Boutique Stay", content: "Artistically designed rooms with modern aesthetics." },
        { title: "Garden", content: "Beautiful private lawn for morning yoga or tea." },
        { title: "Service", content: "Personalized butler service and travel assistance." }
      ],
      food: "Home-cooked style fresh meals prepared with local organic ingredients.",
      vibes: ["Romantic", "Peaceful", "Aesthetic"],
      rules: ["No loud music", "Rights of admission reserved"],
      included: ["Breakfast", "Wifi", "Bonfire", "Parking"],
      excluded: ["Alcohol", "Guide Charges", "Lunch/Dinner"]
    }
  }
];

function PageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [days, setDays] = useState(1); // Nights
  const [startDate, setStartDate] = useState(''); // Correct State Name
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
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

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
        description: "Hotel Booking", order_id: data.id,
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

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar /><Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="pt-32 pb-10 text-center bg-zinc-900 border-b border-zinc-800">
        <h1 className="text-5xl font-black uppercase">Hotels & <span className="text-red-600">Resorts</span></h1>
        <p className="text-gray-400 mt-2">Premium Stays. Hostels. Resorts. Best Prices.</p>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10 mb-20">
        {/* Left: Hotel Grid */}
        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
          {items.map(item => {
            const inCart = cart.find(c => c.id === item.id);
            return (
            <div key={item.id} className={`bg-zinc-900 rounded-3xl overflow-hidden border transition-all duration-300 shadow-lg group ${inCart ? 'border-green-500 ring-1 ring-green-500' : 'border-zinc-800 hover:border-red-900/50'}`}>
              <div className="h-56 relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                  <div className="absolute top-2 right-2 bg-red-600 text-xs font-bold px-3 py-1 rounded-full">₹{item.price}/Night</div>
                  {inCart && <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10"><Check size={12}/> Selected</div>}
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.desc}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setModalData(item)} className="flex-1 py-2.5 rounded-full border border-gray-600 text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"><Home size={16}/> View Details</button>
                    <button 
                        onClick={() => addToCart(item)} 
                        className={`flex-1 py-2.5 rounded-full text-sm font-bold shadow-lg transition flex items-center justify-center gap-2 ${inCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                    >
                        {inCart ? `Added (${inCart.qty})` : 'Book Room'}
                    </button>
                  </div>
              </div>
            </div>
          )})}
        </div>

        {/* Right: Cart */}
        <div id="cart-section" className="lg:w-1/3 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 h-fit sticky top-24 shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShoppingCart className="text-red-500"/> Booking Cart</h3>
            {cart.length===0 && <p className="text-gray-500 text-sm text-center py-4">Select a hotel.</p>}
            {cart.map(i => <div key={i.id} className="flex justify-between bg-black/40 p-3 mb-2 rounded-xl text-sm border border-zinc-800"><div><div className="font-bold">{i.name}</div><div className="text-xs text-gray-400">₹{i.price} x {i.qty}</div></div><div className="flex gap-2 items-center"><button onClick={()=>updateQty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={()=>updateQty(i.id, 1)}>+</button><Trash2 size={16} onClick={()=>remove(i.id)} className="text-red-500"/></div></div>)}
            
            <div className={`mt-6 space-y-3 transition-opacity duration-500 ${cart.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                {/* FIXED: setStartDate is now used correctly */}
                <input type="date" onChange={e => setStartDate(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm text-white [color-scheme:dark]" />
                <input type="number" min="1" value={days} onChange={e => setDays(Math.max(1, Number(e.target.value)))} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm" placeholder="No. of Nights" />
                <div className="flex gap-2"><button onClick={() => setPaymentMode('full')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='full'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Full: ₹{total}</button><button onClick={() => setPaymentMode('half')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='half'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Half: ₹{Math.ceil(total/2)}</button></div>
                <input placeholder="Guest Name" onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
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
                <p className="text-white font-bold text-sm">{totalItems} Room(s) Selected</p>
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
                    <div className="absolute bottom-6 left-6 md:left-10">
                        <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block uppercase">PREMIUM STAY</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white">{modalData.name}</h2>
                        <p className="text-gray-300 mt-1 max-w-2xl">{modalData.desc}</p>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                    <div className="grid md:grid-cols-3 gap-10">
                        
                        {/* LEFT COLUMN (Details) */}
                        <div className="md:col-span-2 space-y-8">
                            
                            <section>
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><MapPin size={20} className="text-blue-500"/> About Property</h3>
                                <p className="text-gray-300 leading-relaxed text-sm">{modalData.details.overview}</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Star size={20} className="text-yellow-500"/> Amenities</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {modalData.details.amenities.map((am:any, i:number) => (
                                        <div key={i} className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
                                            <h4 className="font-bold text-white text-sm mb-1">{am.title}</h4>
                                            <p className="text-xs text-gray-400">{am.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Utensils size={20} className="text-orange-500"/> Food & Vibes</h3>
                                <div className="bg-zinc-800/50 p-4 rounded-xl text-sm text-gray-300 border border-zinc-700">
                                    <p className="mb-2"><strong className="text-white">Dining:</strong> {modalData.details.food}</p>
                                    <div className="flex gap-2 flex-wrap mt-3">
                                        {modalData.details.vibes.map((v:string, i:number) => (
                                            <span key={i} className="text-xs bg-black/40 px-2 py-1 rounded text-purple-400 border border-purple-900/50">{v}</span>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN (Summary List) */}
                        <div className="space-y-6">
                            <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/> Inclusions</h3>
                                <ul className="space-y-2">
                                    {modalData.details.included.map((item:string, i:number) => (
                                        <li key={i} className="text-xs text-gray-300 flex gap-2">
                                            <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5"/> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><XCircle size={18} className="text-red-500"/> Exclusions</h3>
                                <ul className="space-y-2">
                                    {modalData.details.excluded.map((item:string, i:number) => (
                                        <li key={i} className="text-xs text-gray-300 flex gap-2">
                                            <XCircle size={14} className="text-red-500 shrink-0 mt-0.5"/> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Shield size={18} className="text-orange-500"/> House Rules</h3>
                                <ul className="space-y-2">
                                    {modalData.details.rules.map((item:string, i:number) => (
                                        <li key={i} className="text-xs text-gray-300 flex gap-2">
                                            <span className="text-red-500">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900 flex justify-end gap-4 shrink-0">
                    <button onClick={() => setModalData(null)} className="px-6 py-3 rounded-full border border-gray-600 text-sm hover:bg-gray-800">Close</button>
                    <button onClick={() => { addToCart(modalData); setModalData(null); }} className="px-8 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg">Book Room - ₹{modalData.price}</button>
                </div>

            </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
export default function Page() { return <SessionProvider><PageContent /></SessionProvider>; }
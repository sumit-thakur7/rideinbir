
'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { X, Info, Trash2, Plus, Minus, AlertTriangle, ShieldCheck, Fuel, Clock, MapPin, Check, ShoppingCart } from 'lucide-react';
import Script from 'next/script';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RENTAL_RULES = [
  { icon: <ShieldCheck size={18} className="text-green-500"/>, text: "Original Driving License is Mandatory." },
  { icon: <ShieldCheck size={18} className="text-green-500"/>, text: "1 Original ID (Aadhar/Voter) to be deposited." },
  { icon: <Fuel size={18} className="text-yellow-500"/>, text: "Fuel is not included (Tank-to-Tank basis)." },
  { icon: <Clock size={18} className="text-blue-500"/>, text: "Late return penalty: ₹200 per hour." },
  { icon: <AlertTriangle size={18} className="text-red-500"/>, text: "Damages will be charged as per service center bill." },
  { icon: <MapPin size={18} className="text-purple-500"/>, text: "Restricted Areas: No off-roading beyond Billing top." }
];

// --- UPDATED BIKE DATA ---
const vehicles = [
  { 
    id: 1, name: "Royal Enfield Standard 350", price: 800, 
    image: "/bike/221.png", 
    desc: "The legendary bullet. Heavy metal feel for true riders.", specs: ["350cc", "Kick Start", "Heavy Metal"] 
  },
  { 
    id: 2, name: "Royal Enfield Classic 350", price: 1000, 
    image: "/bike/222.png", 
    desc: "Timeless classic design with refined engine performance.", specs: ["350cc", "Electric Start", "Comfort"] 
  },
  { 
    id: 3, name: "Royal Enfield Hunter 350", price: 1000, 
    image: "/bike/223.png", 
    desc: "Compact, agile, and punchy. Perfect for city and curves.", specs: ["350cc", "Lightweight", "City"] 
  },
  { 
    id: 4, name: "Royal Enfield Meteor 350", price: 1300, 
    image: "/bike/224.png", 
    desc: "Cruiser built for long rides and comfort.", specs: ["350cc", "Cruiser", "Navigation"] 
  },
  { 
    id: 5, name: "Himalayan 411", price: 1200, 
    image: "/bike/225.png", 
    desc: "The original adventure tourer. Conquer any terrain.", specs: ["411cc", "Adventure", "Torque"] 
  },
  { 
    id: 6, name: "Himalayan Scram 411", price: 1300, 
    image: "/bike/226.png", 
    desc: "Scrambler version. More agile and fun for off-road.", specs: ["411cc", "Scrambler", "Agile"] 
  },
  { 
    id: 7, name: "Himalayan 450 (New)", price: 2000, 
    image: "/bike/227.png", 
    desc: "The new liquid-cooled beast. Ultimate performance.", specs: ["450cc", "Liquid Cooled", "40HP"] 
  },
  { 
    id: 8, name: "Hero Xpulse 200 4V", price: 1300, 
    image: "/bike/228.png", 
    desc: "Lightweight off-roader. Best suspension for trails.", specs: ["200cc", "Rally Kit", "High GC"] 
  },
  { 
    id: 9, name: "Scooty (Activa/Jupiter)", price: 500, 
    image: "/bike/229.png", 
    desc: "Easy and economical. Best for local sightseeing.", specs: ["110cc", "Automatic", "Storage"] 
  }
];

function BikeRentalContent() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [cart, setCart] = useState<any[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState<any>(null);
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [paymentMode, setPaymentMode] = useState<'full'|'half'>('full');
  
  // Unified Form State
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (v: any) => setCart(p => { 
    const ex = p.find(i => i.id === v.id); 
    return ex ? p.map(i => i.id === v.id ? {...i, qty: i.qty+1} : i) : [...p, {...v, qty: 1}] 
  });
  
  const removeFromCart = (id: number) => setCart(p => p.filter(i => i.id !== id));
  const updateQty = (id: number, d: number) => setCart(p => p.map(i => i.id === id ? {...i, qty: Math.max(1, i.qty+d)} : i));

  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0) * days;
  const payable = paymentMode === 'full' ? total : Math.ceil(total / 2);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const saveBookingToDB = async (paymentId: string, amountPaid: number) => {
    try {
      const res = await fetch('/api/book-ride', { 
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({
          userName: form.name, 
          userEmail: form.email, 
          phone: form.phone,
          vehicles: cart, 
          totalAmount: total, 
          paidAmount: amountPaid, 
          paymentMode, 
          paymentId, 
          startDate, 
          days
        })
      });
      return await res.json();
    } catch (error) { console.error('DB Error', error); return null; }
  };

  const handlePayment = async () => {
    if(!cart.length || !startDate || !form.name || !form.phone || !form.email) return alert("Please fill all details including Email!");
    setIsProcessing(true);
    
    try {
      const res = await fetch('/api/razorpay/create-order', { 
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ amount: payable }) 
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error);
      
      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.amount, 
        currency: "INR", 
        name: "Ride In Bir",
        description: "Rental Booking", 
        order_id: data.id,
        handler: async (response: any) => { 
          const bookingData = await saveBookingToDB(response.razorpay_payment_id, payable); 
          setCart([]); 
          setForm({ name: '', email: '', phone: '' });
          
          if(bookingData && bookingData.bookingId) {
            router.push(`/success?id=${bookingData.bookingId}`);
          } else {
            window.location.href = '/success'; 
          }
        },
        prefill: { name: form.name, email: form.email, contact: form.phone }, 
        theme: { color: "#DC2626" }
      });
      rzp.open();
    } catch(e) { 
        console.error(e);
        alert("Payment Failed"); 
    } finally { 
        setIsProcessing(false); 
    }
  };

  const scrollToCart = () => {
    const cartElement = document.getElementById('cart-section');
    if (cartElement) cartElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-black min-h-screen text-white"><Navbar /><Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="pt-32 pb-10 text-center bg-zinc-900 border-b border-zinc-800"><h1 className="text-4xl md:text-6xl font-black uppercase">Ride in <span className="text-red-600">Bir</span></h1><p className="text-gray-400 mt-2">Rent Premium Bikes & Scooters.</p></div>
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">{vehicles.map(v => {
          const inCart = cart.find(c => c.id === v.id);
          return (
            <div key={v.id} className={`bg-zinc-900 rounded-3xl overflow-hidden border transition-all duration-300 shadow-lg ${inCart ? 'border-green-500 ring-1 ring-green-500' : 'border-zinc-800'}`}>
              <div className="h-48 relative">
                 <img src={v.image} className="w-full h-full object-cover"/>
                 <div className="absolute top-2 right-2 bg-red-600 text-xs font-bold px-3 py-1 rounded-full">₹{v.price}/Day</div>
                 {inCart && <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><Check size={12}/> Selected</div>}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1">{v.name}</h3>
                <div className="flex gap-2 mt-4">
                  <button onClick={()=>setShowDetailsModal(v)} className="flex-1 py-2 rounded-full border border-gray-600 text-sm hover:bg-gray-800">Info</button>
                  <button 
                      onClick={()=>addToCart(v)} 
                      className={`flex-1 py-2 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${inCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                  >
                      {inCart ? (
                          <>Added <span className="bg-white text-green-600 w-5 h-5 flex items-center justify-center rounded-full text-xs">{inCart.qty}</span></>
                      ) : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}</div>
        
        <div id="cart-section" className="lg:w-1/3 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 sticky top-24 shadow-xl h-fit">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShoppingCart className="text-red-500"/> Your Cart</h3>
            {cart.length === 0 ? <div className="text-center py-8 text-gray-500 text-sm">No items selected.</div> : 
                cart.map(i => (
                    <div key={i.id} className="flex justify-between bg-black/40 p-3 mb-2 rounded-xl text-sm border border-zinc-800">
                        <div><div className="font-bold">{i.name}</div><div className="text-xs text-gray-400">₹{i.price} x {i.qty}</div></div>
                        <div className="flex gap-2 items-center">
                            <button onClick={()=>updateQty(i.id,-1)} className="p-1 text-gray-400"><Minus size={14}/></button>
                            <span className="font-bold">{i.qty}</span>
                            <button onClick={()=>updateQty(i.id,1)} className="p-1 text-gray-400"><Plus size={14}/></button>
                            <button onClick={()=>removeFromCart(i.id)} className="ml-2 text-red-500"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))
            }
            <div className={`mt-6 space-y-4 transition-opacity duration-500 ${cart.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <input type="date" onChange={e=>setStartDate(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm text-white [color-scheme:dark]"/>
                <input type="number" min="1" value={days} onChange={e=>setDays(Number(e.target.value))} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm" placeholder="Days"/>
                <div className="flex gap-2">
                    <button onClick={()=>setPaymentMode('full')} className={`flex-1 py-2 text-xs border rounded-full ${paymentMode==='full'?'border-red-500 bg-red-900/20 text-red-500':'border-zinc-700 text-gray-400'}`}>Full: ₹{total}</button>
                    <button onClick={()=>setPaymentMode('half')} className={`flex-1 py-2 text-xs border rounded-full ${paymentMode==='half'?'border-red-500 bg-red-900/20 text-red-500':'border-zinc-700 text-gray-400'}`}>Half: ₹{Math.ceil(total/2)}</button>
                </div>

                {/* FIXED INPUT HANDLERS */}
                <input placeholder="Name" onChange={e=>setForm({...form, name: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Email" onChange={e=>setForm({...form, email: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Phone" onChange={e=>setForm({...form, phone: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                
                <button onClick={handlePayment} disabled={isProcessing} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-full font-bold mt-2 shadow-lg">
                    {isProcessing ? 'Processing...' : `Pay ₹${payable}`}
                </button>
            </div>
        </div>
      </div>
      
      {/* Mobile Floating Cart Button */}
      {totalItems > 0 && (
         <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-zinc-900 border border-zinc-700 p-4 rounded-2xl shadow-2xl z-40 flex justify-between items-center animate-in slide-in-from-bottom-4">
            <div><p className="text-white font-bold text-sm">{totalItems} Item(s)</p><p className="text-xs text-gray-400">Go to checkout</p></div>
            <button onClick={scrollToCart} className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">View Cart</button>
         </div>
      )}

      {showDetailsModal && <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"><div className="bg-zinc-900 w-full max-w-2xl rounded-3xl border border-zinc-700 overflow-hidden relative"><button onClick={()=>setShowDetailsModal(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-600 z-10"><X/></button><img src={showDetailsModal.image} className="h-56 w-full object-cover"/><div className="p-8"><h2 className="text-3xl font-black text-white">{showDetailsModal.name}</h2><p className="text-gray-400 mb-6">{showDetailsModal.desc}</p><div className="grid md:grid-cols-2 gap-8"><div><h3 className="font-bold text-white mb-2">Specs</h3><div className="flex flex-wrap gap-2">{showDetailsModal.specs.map((s:string,i:number)=><span key={i} className="text-xs bg-black border border-zinc-700 px-3 py-1 rounded-full text-gray-300">{s}</span>)}</div></div><div><h3 className="font-bold text-red-500 mb-2">Rules</h3><ul className="space-y-2">{RENTAL_RULES.map((r,i)=><li key={i} className="flex gap-2 text-xs text-gray-300">{r.icon} {r.text}</li>)}</ul></div></div><button onClick={()=>{addToCart(showDetailsModal);setShowDetailsModal(null)}} className="w-full bg-red-600 py-3 rounded-full font-bold hover:bg-red-700 mt-8">Add to Cart</button></div></div></div>}
      <Footer />
    </main>
  );
}
export default function Page() { return <SessionProvider><BikeRentalContent /></SessionProvider>; }
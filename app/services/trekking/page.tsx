'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { X, Info, Trash2, Plus, Minus, CheckCircle, XCircle, Map, Mountain, Footprints, Backpack, CloudSun, Compass, ShoppingCart, Check } from 'lucide-react';
import Script from 'next/script';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- RICH DATA FOR TREKKING ---
const items = [
  { 
    id: 1, 
    name: "Rajgundha Valley Trek (2D/1N)", 
    price: 2500, 
    image: "/trek/201.jpeg", 
    desc: "A semi-nomadic village with 360-degree views of the Dhauladhar range.",
    details: {
      overview: "Rajgundha is a hidden gem connecting the Kangra and Kullu valleys. This trek takes you through dense oak forests, river streams, and open meadows. The village is known for its traditional houses and lack of road connectivity, preserving its raw beauty.",
      difficulty: "Easy to Moderate",
      altitude: "8,900 ft",
      itinerary: [
        { title: "Day 1: Billing to Rajgundha", content: "Start trek from Billing (14km). Walk through dense forests. Reach campsite by evening. Bonfire & Dinner." },
        { title: "Day 2: Explore & Return", content: "Morning nature walk. Breakfast with mountain view. Trek back to Billing or drive back via Barot (optional)." }
      ],
      essentials: ["Hiking Shoes (Good Grip)", "Warm Jacket & Fleece", "Water Bottle (1L)", "Raincoat/Poncho"],
      included: ["Tent Stay (Twin Sharing)", "All Meals (Lunch, Dinner, Breakfast)", "Certified Guide", "Forest Entry Fee"],
      excluded: ["Personal Porters", "Transport to Billing", "Bottled Water"]
    }
  },
  { 
    id: 2, 
    name: "Hanuman Garh Day Hike", 
    price: 1500,
    image: "/trek/202.jpeg",  
    desc: "Reach the top of the valley for a panoramic view of the Himalayas.",
    details: {
      overview: "Hanuman Garh is one of the highest points in the Bir Billing region. It offers a stunning 360-degree view of the snow-capped Dhauladhar ranges and the Kangra valley below. It's a steep but rewarding climb.",
      difficulty: "Moderate (Steep Ascent)",
      altitude: "10,500 ft",
      itinerary: [
        { title: "Start: 8:00 AM", content: "Drive to Channya (Base point). Start ascent through rhododendron forests." },
        { title: "Summit: 1:00 PM", content: "Reach the top. Visit the ancient Hanuman temple. Packed Lunch with a view." },
        { title: "Return: 5:00 PM", content: "Descend back to base point and drive to Bir." }
      ],
      essentials: ["Good Trekking Shoes", "Daypack (Small Bag)", "Sunscreen & Sunglasses", "Energy Bars"],
      included: ["Guide Charges", "Packed Lunch", "Transport (Bir to Base)"],
      excluded: ["Breakfast", "Personal Expenses"]
    }
  },
  { 
    id: 3, 
    name: "Billing to Rajgundha (Day Hike)", 
    price: 1200,
    image: "/trek/203.jpg", 
    desc: "A beautiful 14km flat trail walk through pine forests.",
    details: {
      overview: "If you want the views without the steep climb, this is the perfect trek. The trail from Billing to Rajgundha is wide and mostly flat, cutting through the mountain face with breathtaking views of the Thamsar Pass.",
      difficulty: "Easy (Long Walk)",
      altitude: "8,000 ft",
      itinerary: [
        { title: "Morning", content: "Reach Billing Take-off site. Start the 14km scenic walk." },
        { title: "Afternoon", content: "Reach Rajgundha village. Have lunch at a local Pahadi home." },
        { title: "Evening", content: "Taxi pickup from Rajgundha curve (connecting road) back to Bir." }
      ],
      essentials: ["Comfortable Walking Shoes", "Light Jacket", "Camera"],
      included: ["Guide", "Lunch at Village", "Taxi Return"],
      excluded: ["Transport to Billing"]
    }
  },
  {
  id: 4,
  name: "Kothi Kohar Waterfall Trek",
  price: 1000,
  image: "/trek/204.jpeg",
  desc: "A refreshing trek to the stunning Kothi Kohar waterfall near Bir — perfect for nature lovers.",
  details: {
    overview: "A scenic trail through forests and streams leading to the beautiful Kothi Kohar Waterfall. Ideal for beginners and those seeking a peaceful nature escape.",
    difficulty: "Easy",
    altitude: "5,500 ft",
    itinerary: [
      { title: "Start", content: "Drive towards Kothi village and begin the forest trail." },
      { title: "Waterfall", content: "Reach the Kothi Kohar waterfall. Enjoy the natural pool, photography and relaxation." },
      { title: "Return", content: "Trek back to the village and drive to Bir." }
    ],
    essentials: ["Water-friendly shoes", "Towel", "Extra Clothes"],
    included: ["Guide", "Snacks"],
    excluded: ["Taxi Fare"]
  }
},
  { 
    id: 5, 
    name: "Bir to Billing Trek (1N/2D)", 
    price: 2500,
    image: "/trek/205.jpeg",  
    desc: "Classic uphill trek from landing to takeoff site. Camping at top.",
    details: {
      overview: "The traditional shepherd route from Bir to Billing. Walk through rhododendron forests.",
      difficulty: "Moderate",
      altitude: "8,000 ft",
      itinerary: [ { title: "Day 1", content: "Trek Bir to Billing (3-4 hrs). Camp." }, { title: "Day 2", content: "Paraglide or hike down." } ],
      essentials: ["Shoes", "Jacket"],
      included: ["Camping", "Dinner/Breakfast", "Guide"],
      excluded: ["Paragliding"]
    }
  },
  { 
    id: 6, 
    name: "Plachak Valley (2N/3D)", 
    price: 5500,
    image: "/trek/206.webp", 
    desc: "Deep forest camping next to the river. Beyond Rajgundha.",
    details: {
      overview: "For nature lovers who want peace. Plachak is 2 hours ahead of Rajgundha, untouched and pristine.",
      difficulty: "Moderate",
      altitude: "9,500 ft",
      itinerary: [ { title: "Day 1", content: "Billing to Rajgundha." }, { title: "Day 2", content: "Rajgundha to Plachak." }, { title: "Day 3", content: "Return." } ],
      essentials: ["Warm Clothes", "Raincoat"],
      included: ["All Camping Gear", "All Meals", "Porters"],
      excluded: ["Personal Snacks", "Tips"]
    }
  },
  { 
    id: 7, 
    name: "Thamsar Pass Expedition (4D/5N)", 
    price: 15000,
    image: "/trek/207.webp",  
    desc: "Expert level trek crossing the 15,700 ft high pass.",
    details: {
      overview: "A challenging expedition crossing glaciers and snow to reach the Bada Bhangal region.",
      difficulty: "Expert",
      altitude: "15,700 ft",
      itinerary: [ { title: "Route", content: "Billing -> Plachak -> Panhartu -> Thamsar." } ],
      essentials: ["Technical Gear", "High Fitness"],
      included: ["Expedition Setup", "Cook", "Mules"],
      excluded: ["Rescue Insurance"]
    }
  },
  { 
    id: 8, 
    name: "Bangoru Waterfall (Family)", 
    price: 800,
    image: "/trek/208.jpg",  
    desc: "Very easy 2km walk. Perfect for kids and families.",
    details: {
      overview: "A gentle walk to a beautiful waterfall near Gunehar village.",
      difficulty: "Very Easy",
      altitude: "4,500 ft",
      itinerary: [ { title: "Walk", content: "30 mins one way." } ],
      essentials: ["Casual Shoes"],
      included: ["Guide", "Tea"],
      excluded: ["Transport"]
    }
  },
  { 
    id: 9, 
    name: "Gunehar River Pool Trek", 
    price: 1000,
    image: "/trek/209.jpg",  
    desc: "Hike alongside the river to a natural swimming pool.",
    details: {
      overview: "Follow the river stream in Gunehar to find crystal clear pools.",
      difficulty: "Easy",
      altitude: "4,500 ft",
      itinerary: [ { title: "Trek", content: "1.5 Hours along river." } ],
      essentials: ["Water Shoes"],
      included: ["Guide"],
      excluded: ["Food"]
    }
  },
  { 
    id: 10, 
    name: "Mata Maheshwari Temple", 
    price: 500,
    image: "/trek/210.webp",  
    desc: "Short forest walk (45 mins) from Bir Landing Site.",
    details: {
      overview: "A spiritual walk through dense pine forest to an ancient temple.",
      difficulty: "Easy",
      altitude: "5,000 ft",
      itinerary: [ { title: "Walk", content: "45 mins uphill." } ],
      essentials: ["Water"],
      included: ["Guide"],
      excluded: ["Offering/Prasad"]
    }
  },
  { 
    id: 11, 
    name: "Garh Mata (Sunset Hike)", 
    price: 500,
    image: "/trek/211.webp", 
    desc: "20 min hike from Billing Takeoff for the best sunset.",
    details: {
      overview: "Highest point near Billing. Best spot for sunset photography.",
      difficulty: "Easy",
      altitude: "8,500 ft",
      itinerary: [ { title: "Hike", content: "20 mins from Parking." } ],
      essentials: ["Jacket (Windy)"],
      included: ["Guide"],
      excluded: ["Tea/Snacks"]
    }
  },
  { 
    id: 12, 
    name: "Bir to Barot Valley", 
    price: 1500,
    image: "/trek/212.webp",  
    desc: "Cross the mountain ridge to reach the beautiful Barot Valley.",
    details: {
      overview: "A crossover trek. Climb up from Bir and descend into Barot.",
      difficulty: "Moderate/Hard",
      altitude: "8,000 ft",
      itinerary: [ { title: "Trek", content: "6-8 Hours." } ],
      essentials: ["Good Shoes", "Lunch"],
      included: ["Guide"],
      excluded: ["Return Taxi"]
    }
  },
  { 
    id: 13, 
    name: "Keori Village Walk", 
    price: 500,
    image: "/trek/213.webp",  
    desc: "Cultural walk to a traditional village with no road access.",
    details: {
      overview: "See the real village life of Himachal. Old mud houses and farms.",
      difficulty: "Easy",
      altitude: "5,000 ft",
      itinerary: [ { title: "Walk", content: "2 Hours." } ],
      essentials: ["Camera"],
      included: ["Local Guide"],
      excluded: ["Food"]
    }
  },
  { 
    id: 14, 
    name: "Monastery Loop Walk", 
    price: 500,
    image: "/trek/214.png",  
    desc: "Peaceful 8km walk covering Sherab Ling and tea gardens.",
    details: {
      overview: "A paved path through pine forests connecting the monasteries.",
      difficulty: "Easy",
      altitude: "4,500 ft",
      itinerary: [ { title: "Walk", content: "2-3 Hours." } ],
      essentials: ["Walking Shoes"],
      included: ["Guide"],
      excluded: ["Entry Fees"]
    }
  }
];

function PageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [days, setDays] = useState(1); 
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
        description: "Trekking Booking", order_id: data.id,
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
        <h1 className="text-5xl font-black uppercase">Trekking <span className="text-red-600">Adventures</span></h1>
        <p className="text-gray-400 mt-2">Explore the hidden trails of Dhauladhars.</p>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10 mb-20">
        {/* Left: Trek Grid */}
        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
          {items.map(item => {
            const inCart = cart.find(c => c.id === item.id);
            return (
            <div key={item.id} className={`bg-zinc-900 rounded-3xl overflow-hidden border transition-all duration-300 shadow-lg group ${inCart ? 'border-green-500 ring-1 ring-green-500' : 'border-zinc-800 hover:border-red-900/50'}`}>
              <div className="h-56 relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                  <div className="absolute top-2 right-2 bg-red-600 text-xs font-bold px-3 py-1 rounded-full">₹{item.price}/Person</div>
                  {inCart && <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10"><Check size={12}/> Selected</div>}
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.desc}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setModalData(item)} className="flex-1 py-2.5 rounded-full border border-gray-600 text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"><Map size={16}/> Details</button>
                    <button 
                        onClick={() => addToCart(item)} 
                        className={`flex-1 py-2.5 rounded-full text-sm font-bold shadow-lg transition flex items-center justify-center gap-2 ${inCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                    >
                        {inCart ? `Added (${inCart.qty})` : 'Book Trek'}
                    </button>
                  </div>
              </div>
            </div>
          )})}
        </div>

        {/* Right: Cart */}
        <div id="cart-section" className="lg:w-1/3 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 h-fit sticky top-24 shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShoppingCart className="text-red-500"/> Trekking Group</h3>
            {cart.length===0 && <p className="text-gray-500 text-sm text-center py-4">Choose a trek.</p>}
            {cart.map(i => <div key={i.id} className="flex justify-between bg-black/40 p-3 mb-2 rounded-xl text-sm border border-zinc-800"><div><div className="font-bold">{i.name}</div><div className="text-xs text-gray-400">₹{i.price} x {i.qty}</div></div><div className="flex gap-2 items-center"><button onClick={()=>updateQty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={()=>updateQty(i.id, 1)}>+</button><Trash2 size={16} onClick={()=>remove(i.id)} className="text-red-500"/></div></div>)}
            
            <div className={`mt-6 space-y-3 transition-opacity duration-500 ${cart.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                {/* FIXED: setStartDate used instead of setDate */}
                <input type="date" onChange={e => setStartDate(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm text-white [color-scheme:dark]" />
                <input type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm" placeholder="Total Persons" />
                
                <div className="flex gap-2">
                    <button onClick={() => setPaymentMode('full')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='full'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Full: ₹{total}</button>
                    <button onClick={() => setPaymentMode('half')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='half'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Half: ₹{Math.ceil(total/2)}</button>
                </div>

                <input placeholder="Lead Name" onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <button onClick={pay} disabled={loading || cart.length===0} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-full font-bold mt-2 disabled:opacity-50">{isProcessing ? 'Processing...' : `Pay ₹${payable} Now`}</button>
            </div>
        </div>
      </div>

      {/* Floating Mobile Cart Button */}
      {totalItems > 0 && (
         <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-zinc-900 border border-zinc-700 p-4 rounded-2xl shadow-2xl z-40 flex justify-between items-center animate-in slide-in-from-bottom-4">
            <div>
                <p className="text-white font-bold text-sm">{totalItems} Person(s) Added</p>
                <p className="text-xs text-gray-400">Complete your booking</p>
            </div>
            <button onClick={scrollToCart} className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
              Go to Cart
            </button>
         </div>
      )}

      {/* --- DETAILED MODAL --- */}
      {modalData && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-2 md:p-6 overflow-hidden">
            <div className="bg-zinc-900 w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] rounded-3xl border border-zinc-700 shadow-2xl flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="relative h-48 md:h-56 shrink-0">
                    <img src={modalData.image} className="w-full h-full object-cover opacity-50"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"/>
                    <button onClick={() => setModalData(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-600 transition z-10"><X size={24} /></button>
                    <div className="absolute bottom-6 left-6 md:left-10">
                        <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block uppercase">ALTITUDE: {modalData.details.altitude}</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white">{modalData.name}</h2>
                        <p className="text-gray-300 mt-1 max-w-2xl">{modalData.desc}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                    <div className="grid md:grid-cols-3 gap-10">
                        
                        {/* LEFT: Itinerary & Overview */}
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Mountain size={20} className="text-blue-500"/> About the Trek</h3>
                                <p className="text-gray-300 leading-relaxed text-sm">{modalData.details.overview}</p>
                                <div className="mt-4 flex gap-4">
                                    <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
                                        <div className="text-xs text-gray-400">Difficulty</div>
                                        <div className="font-bold text-white text-sm">{modalData.details.difficulty}</div>
                                    </div>
                                    <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
                                        <div className="text-xs text-gray-400">Duration</div>
                                        <div className="font-bold text-white text-sm">{modalData.details.itinerary.length} Days</div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Footprints size={20} className="text-yellow-500"/> Itinerary</h3>
                                <div className="space-y-4 relative border-l-2 border-zinc-800 ml-2 pl-6">
                                    {modalData.details.itinerary.map((day:any, i:number) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 bg-red-600 rounded-full border-4 border-zinc-900"/>
                                            <h4 className="font-bold text-white text-sm mb-1">{day.title}</h4>
                                            <p className="text-xs text-gray-400">{day.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* RIGHT: Essentials & Inclusions */}
                        <div className="space-y-6">
                            <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Backpack size={18} className="text-purple-500"/> Essentials to Bring</h3>
                                <ul className="space-y-2">
                                    {modalData.details.essentials.map((item:string, i:number) => (
                                        <li key={i} className="text-xs text-gray-300 flex gap-2">
                                            <span className="text-purple-500">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

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
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900 flex justify-end gap-4 shrink-0">
                    <button onClick={() => setModalData(null)} className="px-6 py-3 rounded-full border border-gray-600 text-sm hover:bg-gray-800">Close</button>
                    <button onClick={() => { addToCart(modalData); setModalData(null); }} className="px-8 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg">Book Trek - ₹{modalData.price}</button>
                </div>

            </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
export default function Page() { return <SessionProvider><PageContent /></SessionProvider>; }

'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { X, BookOpen, CheckCircle, XCircle, Shield, MapPin, Home, Backpack, Award, Calendar, Trash2, Plus, Minus, Check, ShoppingCart } from 'lucide-react';
import Script from 'next/script';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- RICH DATA WITH USER'S CONTENT ---
const items = [
  { 
    id: 1, 
    name: "P1: Ground Handling (Beginner)", 
    price: 15000, 
    image: "/paragliding/11.jpeg", 
    desc: "The foundation of flying. 5 Days of intensive ground training.",
    details: {
      overview: "Before you fly, you must learn to handle the wings on the ground. This P1 course is dedicated entirely to Ground Handling, the most crucial skill for any pilot. You will build muscle memory and understand wind dynamics without leaving the ground.",
      certification: "Certificate of Completion for P1 Ground Handling (Foundation Level). Essential to progress to P2.",
      syllabus: [
        { title: "Day 1: Equipment & Site", content: "Introduction to canopy, harness, and risers. Site assessment and wind direction analysis." },
        { title: "Day 2: Forward Inflation", content: "Learning to launch the glider in nil to light wind conditions. Posture and brake control." },
        { title: "Day 3: Canopy Control", content: "Balancing the wing overhead while static and running. Correction techniques." },
        { title: "Day 4: Ground Abort", content: "Safety drills: How to kill the glider energy instantly if a launch feels unsafe." },
        { title: "Day 5: Theory & Exam", content: "Basics of Aerodynamics and a practical ground handling test." }
      ],
      safety: ["Flat ground training only", "Certified Instructors", "Radio introduction", "Helmet mandatory"],
      included: ["5 Days Instruction", "Glider & Harness Rental", "Ground Logistics", "Water & Refreshments"],
      excluded: ["Food & Stay", "Solo Flights (Not part of P1)", "Insurance"],
      accommodation: [
        { title: "Dormitory", price: "₹399/day", desc: "Bunk beds, shared washroom, community vibe." },
        { title: "Private Room", price: "₹1399/day", desc: "Private space with attached washroom and wifi." }
      ],
      preparation: [
        { title: "Footwear", content: "Ankle-support sports shoes are mandatory." },
        { title: "Clothing", content: "Full sleeve t-shirts and track pants (No shorts)." },
        { title: "Fitness", content: "Be ready for a lot of running and physical exertion." }
      ]
    }
  },
  { 
    id: 2, 
    name: "P1 + P2 Combo (Novice Pilot)", 
    price: 24999, 
    image: "/paragliding/12.jpeg", 
    desc: "From Dreamer to Pilot. Includes 5 Solo Flights & BPA Certification.",
    details: {
      overview: "Welcome to the most comprehensive beginner’s paragliding course in India. This 7-day intensive program combines P1 (Ground Handling) and P2 (Novice Pilot). At Ride in Bir, we don’t just take you for a ride; we teach you how to command the skies. By the end of this week, you will be a Pilot conducting your own solo flights.",
      certification: "Official BPA (Billing Paragliding Association) Certificate. Validates: Solo Flight Competency, Technical Knowledge, and Air Traffic Rules.",
      syllabus: [
        { title: "Phase 1: Theory", content: "Aerodynamics (Bernoulli’s principle), Meteorology (Weather reading), Equipment Mastery, Air Traffic Rules." },
        { title: "Phase 2: Ground Handling (P1)", content: "Layout & Inspection, Forward Inflation, Canopy Control, Ground Abort techniques." },
        { title: "Phase 3: Flight Training (P2)", content: "Take-off Technique, In-Flight Maneuvers (Turns), Airspeed Control, Landing Approach." },
        { title: "The Grand Finale", content: "5 SOLO FLIGHTS entirely on your own under strict radio supervision." }
      ],
      safety: ["Certified Team (Himachal/Arunachal Tourism)", "EN-certified European Gliders", "Full-time Ambulance & Search Party", "High-frequency Radios", "Reserve Parachutes in every harness"],
      included: ["7 Days Intensive Training", "Equipment Rental (Glider, Harness, Helmet, Radio)", "5 Solo Flights Cost", "Daily Logistics to Take-off", "Study Material & Certification Fee"],
      excluded: ["Food (Lunch/Dinner)", "Personal Insurance", "Damage to equipment (if caused by negligence)"],
      accommodation: [
        { title: "Budget (Dorms)", price: "₹399/day", desc: "Perfect for solo travelers and students. Workation friendly." },
        { title: "Comfort (Private)", price: "₹1399/day", desc: "Privacy and extra comfort after a hard day of training." }
      ],
      preparation: [
        { title: "Footwear", content: "Sports shoes with excellent grip and ankle support (Mandatory)." },
        { title: "Apparel", content: "Comfortable track pants/trousers and Full-sleeve T-shirts." },
        { title: "Protection", content: "Warm jacket, UV Sunglasses, Sunblock (SPF 30+), Cap." },
        { title: "Documents", content: "Govt ID (Aadhar/Passport) & 2 Passport size photos." }
      ]
    }
  },
  { 
    id: 3, 
    name: "P3: Advanced Pilot", 
    price: 20000, 
    image: "/paragliding/126.jpeg", 
    desc: "For P2 pilots. Learn soaring, thermal flying and rapid descents.",
    details: {
      overview: "Designed for pilots who have cleared P2. This course moves beyond simple top-to-bottom flights. You will learn the art of 'Soaring'—staying in the air for hours using wind lifts and thermals.",
      certification: "BPA Advanced Pilot Certification (P3). Required for Cross-Country flying.",
      syllabus: [
        { title: "Ridge Soaring", content: "Rules of the ridge, crabbing, and analyzing wind lift bands." },
        { title: "Thermalling Basics", content: "Identifying thermal triggers, coring a thermal to gain height." },
        { title: "Active Flying", content: "Pitch and roll control in turbulent air." },
        { title: "Rapid Descent", content: "Big Ears and mild 360 spirals to lose height quickly and safely." }
      ],
      safety: ["Advanced Weather Analysis", "Reserve Deployment Drill (Simulated)", "Active Radio Supervision"],
      included: ["Instructor Guidance", "Transport to Take-off", "Briefing & Debriefing"],
      excluded: ["Glider (Bring your own recommended)", "Insurance", "Food & Stay"],
      accommodation: [
        { title: "Dormitory", price: "₹399/day", desc: "Pilot community stay." },
        { title: "Private Room", price: "₹1399/day", desc: "Private room with workstation." }
      ],
      preparation: [
        { title: "Gear", content: "Own flying gear recommended (or rental at extra cost)." },
        { title: "Tech", content: "Vario and GPS device understanding." },
        { title: "Logbook", content: "Previous flight logs mandatory." }
      ]
    }
  },
  {
  id: 4,
  name: "Paragliding P4 (Advance Pilot)",
  price: 59000,
  image: "/paragliding/6.jpeg",
  desc: "Advance level training to become a completely independent and safe pilot.",
  details: {
    overview: "P4 is the Advanced Paragliding Certification where pilots become fully independent. This course focuses on advanced meteorology, XC skills, high-level maneuvers, safety judgment and full command on glider handling.",
    certification: "P4 Advanced Pilot Certification",
    syllabus: [
      { title: "Advanced Launching", content: "Strong-wind forward & reverse launch mastery." },
      { title: "Thermaling & XC", content: "Thermal centering, drift control, and XC route planning." },
      { title: "High Maneuvers", content: "Big ears, B-line stalls, wingovers & pitch control." },
      { title: "Advanced Safety", content: "Airspace rules, risk assessment, decision making." }
    ],
    safety: [
      "Helmet & Radio Mandatory",
      "Emergency Landing Drills",
      "Weather Briefing Before Each Flight",
      "Instructor Supervision"
    ],
    included: [
      "Transport to Launch",
      "Video Analysis",
      "Theory Classes",
      "Glider Handling Practice"
    ],
    excluded: [
      "Equipment (Rental available)",
      "Food",
      "Travel to Training Site"
    ],
    accommodation: [
      { title: "Pilot Hostel", price: "₹1000/day", desc: "Shared rooms near landing zone." },
      { title: "Private Cabin", price: "₹2000/day", desc: "Comfort stay close to launch site." }
    ],
    preparation: [
      { title: "Fitness", content: "Basic stamina & long-hike capability." },
      { title: "Gear", content: "Certified Glider, Harness, Reserve (packed recently)." },
      { title: "Radio", content: "Charged radio + backup battery." }
    ]
  }
}

];

function PageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [days, setDays] = useState(1); // Students
  const [startDate, setStartDate] = useState('');
  const [paymentMode, setPaymentMode] = useState<'full'|'half'>('full');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<any>(null); // For Detail Popup
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

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar /><Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="pt-32 pb-10 text-center bg-zinc-900 border-b border-zinc-800">
        <h1 className="text-5xl font-black uppercase">Learn to <span className="text-red-600">Fly</span></h1>
        <p className="text-gray-400 mt-2">Professional Paragliding Certification Courses.</p>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10 mb-20">
        {/* Left: Courses Grid */}
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
                    <button onClick={() => setModalData(item)} className="flex-1 py-2.5 rounded-full border border-gray-600 text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"><BookOpen size={16}/> Course Info</button>
                    <button 
                        onClick={() => addToCart(item)} 
                        className={`flex-1 py-2.5 rounded-full text-sm font-bold shadow-lg transition flex items-center justify-center gap-2 ${inCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                    >
                        {inCart ? `Added (${inCart.qty})` : 'Enroll'}
                    </button>
                  </div>
              </div>
            </div>
          )})}
        </div>

        {/* Right: Cart */}
        <div id="cart-section" className="lg:w-1/3 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 h-fit sticky top-24 shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShoppingCart className="text-red-500"/> Enrollment Cart</h3>
            {cart.length===0 && <p className="text-gray-500 text-sm text-center py-4">No course selected.</p>}
            {cart.map(i => <div key={i.id} className="flex justify-between bg-black/40 p-3 mb-2 rounded-xl text-sm border border-zinc-800"><div><div className="font-bold">{i.name}</div><div className="text-xs text-gray-400">₹{i.price} x {i.qty}</div></div><div className="flex gap-2 items-center"><button onClick={()=>updateQty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={()=>updateQty(i.id, 1)}>+</button><Trash2 size={16} onClick={()=>remove(i.id)} className="text-red-500"/></div></div>)}
            
            <div className={`mt-6 space-y-3 transition-opacity duration-500 ${cart.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <input type="date" onChange={e => setStartDate(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm text-white [color-scheme:dark]" />
                <input type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm" placeholder="No. of Students" />
                <div className="flex gap-2"><button onClick={() => setPaymentMode('full')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='full'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Full: ₹{total}</button><button onClick={() => setPaymentMode('half')} className={`flex-1 py-2 text-xs rounded-full border ${paymentMode==='half'?'border-red-500 text-red-500':'border-zinc-700 text-gray-400'}`}>Half: ₹{Math.ceil(total/2)}</button></div>
                <input placeholder="Student Name" onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-black border border-zinc-700 px-4 py-2 rounded-full text-sm"/>
                <button onClick={pay} disabled={loading || cart.length===0} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-full font-bold mt-2 disabled:opacity-50">{loading?'Processing...':`Pay ₹${payable} Now`}</button>
            </div>
        </div>
      </div>

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
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">CERTIFICATION COURSE</span>
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
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><BookOpen size={20} className="text-blue-500"/> Course Overview</h3>
                                <p className="text-gray-300 leading-relaxed text-sm">{modalData.details.overview}</p>
                                <div className="mt-4 bg-blue-900/20 border border-blue-800/50 p-4 rounded-xl flex gap-3 items-start">
                                    <Award size={24} className="text-blue-400 shrink-0"/>
                                    <div>
                                        <h4 className="font-bold text-blue-400 text-sm">Certification</h4>
                                        <p className="text-xs text-blue-200 mt-1">{modalData.details.certification}</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin size={20} className="text-yellow-500"/> Detailed Syllabus</h3>
                                <div className="space-y-3">
                                    {modalData.details.syllabus.map((s:any, i:number) => (
                                        <div key={i} className="bg-black/30 p-4 rounded-xl border border-zinc-800">
                                            <h4 className="font-bold text-red-400 text-sm mb-1">{s.title}</h4>
                                            <p className="text-xs text-gray-400">{s.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Backpack size={20} className="text-purple-500"/> Preparation & Accommodation</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                                        <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2"><Home size={16}/> Stay Options</h4>
                                        <ul className="space-y-2">
                                            {modalData.details.accommodation.map((acc:any, i:number) => (
                                                <li key={i} className="text-xs text-gray-300 border-b border-zinc-700 pb-1 last:border-0">
                                                    <span className="font-bold text-white">{acc.title}</span> <span className="text-gray-500">({acc.price})</span>
                                                    <p className="text-[10px] mt-0.5">{acc.desc}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                                        <h4 className="font-bold text-white text-sm mb-2">What to Bring?</h4>
                                        <ul className="space-y-1">
                                            {modalData.details.preparation.map((prep:any, i:number) => (
                                                <li key={i} className="text-xs text-gray-400 flex gap-2">
                                                    <span className="text-purple-400">•</span> <span><b>{prep.title}:</b> {prep.content}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* RIGHT COLUMN (Summary List) */}
                        <div className="space-y-6">
                            <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/> What's Included</h3>
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
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Shield size={18} className="text-orange-500"/> Safety Standards</h3>
                                <ul className="space-y-2">
                                    {modalData.details.safety.map((item:string, i:number) => (
                                        <li key={i} className="text-xs text-gray-300 flex gap-2">
                                            <Shield size={14} className="text-orange-500 shrink-0 mt-0.5"/> {item}
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
                    <button onClick={() => { addToCart(modalData); setModalData(null); }} className="px-8 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg">Enroll Now - ₹{modalData.price}</button>
                </div>

            </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
export default function Page() { return <SessionProvider><PageContent /></SessionProvider>; }

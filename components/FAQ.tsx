'use client'
import { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    { 
      q: "Is Paragliding safe in Bir Billing?", 
      a: "Absolutely. Bir Billing is the world's 2nd best paragliding site for a reason. We strictly adhere to safety protocols, use certified pilots, and update our equipment regularly. Every flight includes a reserve parachute." 
    },
    { 
      q: "What is the age and weight limit?", 
      a: "The activity is open to anyone between 12 to 65 years of age. For safety reasons, the weight limit is strictly between 15kg (minimum) and 95kg (maximum)." 
    },
    { 
      q: "Is video footage included in the price?", 
      a: "Yes! Unlike other operators who charge extra, all our 'Premium' and 'Long Flight' packages come with complimentary HD GoPro footage transferred directly to your phone." 
    },
    { 
      q: "What is the best time to fly?", 
      a: "The season runs from October to June. The best flying conditions are usually from 10 AM to 3 PM when the thermals are active, offering a longer flight duration." 
    },
    {
      q: "Do I need prior experience?",
      a: "Not at all! For tandem flights, your pilot does all the work. You just need to run a few steps during takeoff and sit back to enjoy the view."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="bg-red-100 text-red-600 p-3 rounded-full mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-4xl font-black text-black mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 max-w-lg">
            Everything you need to know about your flight. Can't find the answer? 
            <span className="text-red-600 font-bold cursor-pointer"> Contact us.</span>
          </p>
        </div>

        {/* Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div 
              key={i} 
              onClick={() => toggleFAQ(i)}
              className={`group border rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
                openIndex === i 
                  ? 'border-red-600 bg-zinc-900 shadow-xl' 
                  : 'border-gray-200 bg-white hover:border-red-200'
              }`}
            >
              <div className="p-6 flex justify-between items-center">
                <h3 className={`font-bold text-lg pr-8 transition-colors ${
                  openIndex === i ? 'text-white' : 'text-zinc-800'
                }`}>
                  {item.q}
                </h3>
                <div className={`p-2 rounded-full transition-colors ${
                  openIndex === i ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-red-600'
                }`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>

              {/* Answer Section with smooth expand effect */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <p className={`text-sm leading-relaxed ${
                    openIndex === i ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

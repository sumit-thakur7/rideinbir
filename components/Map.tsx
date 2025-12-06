export default function Map() {
  return (
    <section className="h-[400px] w-full bg-gray-200 relative">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.787612712398!2d76.71966431515566!3d32.03964498119864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904bfbd1d6f1a1f%3A0x6299849208759323!2sBir%20Billing%20Landing%20Site!5e0!3m2!1sen!2sin!4v1678912345678!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0, filter: 'grayscale(100%)' }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      {/* Overlay Badge */}
      <div className="absolute top-10 left-10 bg-white p-4 rounded-xl shadow-xl hidden md:block">
        <p className="text-xs font-bold text-gray-500 uppercase">Headquarters</p>
        <p className="text-black font-bold text-lg">Bir Landing Site</p>
      </div>
    </section>
  )
}

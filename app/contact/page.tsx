import Navbar from '@/components/Navbar'
import ContactHero from '@/components/ContactHero'
import ContactForm from '@/components/ContactForm'
import FAQ from '@/components/FAQ'
import Map from '@/components/Map'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <ContactHero />
      <ContactForm />
      <FAQ />
      <Map />
      <Footer />
    </main>
  )
}

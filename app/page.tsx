import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AdventureCategories from '@/components/AdventureCategories' 
import HowItWorks from '@/components/HowItWorks'
import Packages from '@/components/Packages'
import Pilots from '@/components/Pilots'
import Gallery from '@/components/Gallery'
import Reviews from '@/components/Reviews'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AdventureCategories /> 
      <HowItWorks />
      <Packages />
      <Pilots />
      <Gallery />
      <Reviews />
      <Footer />
    </main>
  )
}

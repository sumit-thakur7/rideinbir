import Navbar from '@/components/Navbar'
import GalleryHero from '@/components/GalleryHero'
import GalleryGrid from '@/components/GalleryGrid'
import Footer from '@/components/Footer'

export default function GalleryPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </main>
  )
}

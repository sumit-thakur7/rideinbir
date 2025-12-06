'use client'

import Link from 'next/link'

interface HeroFeature {
  icon: React.ReactNode
  text: string
}

interface HeroProps {
  title: string
  subtitle?: string
  description: string
  features?: HeroFeature[]
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
  showWhatsApp?: boolean
}

export default function Hero(props: HeroProps) {
  const {
    title,
    subtitle,
    description,
    features = [],
    ctaText = 'BOOK YOUR ADVENTURE',
    ctaLink = '/packages',
    backgroundImage = 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920&q=80',
    showWhatsApp = true
  } = props

  const bgStyle = {
    backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }

  const whatsappClasses = [
    'fixed',
    'bottom-8',
    'right-8',
    'z-50',
    'w-16',
    'h-16',
    'bg-green-500',
    'hover:bg-green-600',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'shadow-2xl',
    'transition-transform',
    'duration-300',
    'hover:scale-110'
  ].join(' ')

  const ctaClasses = [
    'inline-block',
    'bg-red-600',
    'hover:bg-red-700',
    'text-white',
    'font-bold',
    'text-base',
    'px-10',
    'py-4',
    'rounded-md',
    'shadow-xl',
    'transition-all',
    'duration-300',
    'hover:shadow-2xl',
    'uppercase',
    'tracking-wide'
  ].join(' ')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={bgStyle}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-3xl">
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-white mb-8 leading-none tracking-tight" 
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="text-2xl md:text-3xl text-white mb-8 font-light">
              {subtitle}
            </p>
          )}

          <p className="text-xl md:text-2xl text-white mb-10 font-light leading-relaxed">
            {description}
          </p>

          {features.length > 0 && (
            <div className="flex flex-wrap gap-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-green-400 text-xl">{feature.icon}</div>
                  <span className="text-white text-base font-normal">{feature.text}</span>
                </div>
              ))}
            </div>
          )}

          <div>
            <Link href={ctaLink} className={ctaClasses}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>

      {showWhatsApp && (
        <a href="https://wa.me/919876543210" className={whatsappClasses}>
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

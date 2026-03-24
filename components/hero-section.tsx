'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const VIDEO_POSTERS = [
  '/images/car-poster-1.jpg',
  '/images/car-poster-2.jpg',
  '/images/car-poster-3.jpg',
  '/images/car-poster-4.jpg',
  '/images/car-poster-5.jpg',
  '/images/car-poster-6.jpg',
]

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { rootMargin: '100px', threshold: 0.1 }
    )

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video)
    })

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Video Marquee Background */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center overflow-hidden opacity-40"
      >
        <div
          className={`flex gap-4 ${!prefersReducedMotion ? 'animate-marquee' : ''}`}
          style={{ width: 'max-content' }}
        >
          {/* Double the items for seamless loop */}
          {[...VIDEO_POSTERS, ...VIDEO_POSTERS].map((poster, index) => (
            <div
              key={index}
              className="relative h-[80vh] w-[45vh] flex-shrink-0 overflow-hidden rounded"
            >
              {!prefersReducedMotion ? (
                <video
                  ref={(el) => { videoRefs.current[index] = el }}
                  className="h-full w-full object-cover"
                  poster={poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source
                    src={`/videos/car-${(index % 6) + 1}.mp4`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${poster})` }}
                />
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          
          <motion.h1
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isLoaded ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="font-display text-5xl uppercase leading-none tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Immaculate condition.
          </motion.h1>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <button
            onClick={() => scrollToSection('booking')}
            className="group relative overflow-hidden bg-foreground px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-background transition-all duration-300 hover:bg-foreground/90"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Now
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                &rarr;
              </motion.span>
            </span>
          </button>
          <button
            onClick={() => scrollToSection('fleet')}
            className="group border border-foreground/30 bg-transparent px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/5"
          >
            View Fleet
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-foreground/40 to-foreground/40" />
          <ChevronDown className="h-4 w-4 text-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}

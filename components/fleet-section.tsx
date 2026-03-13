'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export interface FleetCar {
  id: string
  name: string
  price: number
  deposit: number
  mileLimit: string
  vibeLine: string
  image: string
  images: string[]
}

export const fleetData: FleetCar[] = [
  {
    id: 'corvettes-color',
    name: 'Corvettes (Red / Purple)',
    price: 250,
    deposit: 500,
    mileLimit: '100 mile limit',
    vibeLine: 'Loud color. Sharp presence.',
    image: '/images/fleet/corvette-color.jpg',
    images: [
      '/images/fleet/corvette-color-1.jpg',
      '/images/fleet/corvette-color-2.jpg',
      '/images/fleet/corvette-color-3.jpg',
      '/images/fleet/corvette-color-4.jpg',
      '/images/fleet/corvette-color-5.jpg',
    ],
  },
  {
    id: 'corvette-black',
    name: 'Black Corvette (2026)',
    price: 300,
    deposit: 500,
    mileLimit: '100 mile limit',
    vibeLine: 'Clean spec. Modern muscle.',
    image: '/images/fleet/corvette-black.jpg',
    images: [
      '/images/fleet/corvette-black-1.jpg',
      '/images/fleet/corvette-black-2.jpg',
      '/images/fleet/corvette-black-3.jpg',
      '/images/fleet/corvette-black-4.jpg',
      '/images/fleet/corvette-black-5.jpg',
    ],
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin Vantage',
    price: 599,
    deposit: 500,
    mileLimit: '100 mile limit',
    vibeLine: 'British elegance. Pure performance.',
    image: '/images/fleet/a2a.jpg',
    images: [
      '/images/fleet/a1.jpg',
      '/images/fleet/a2.jpg',
      '/images/fleet/a2a.jpg',
      '/images/fleet/a3.jpg',
      '/images/fleet/a4.jpg',
    ],
  },
  {
    id: 'lamborghini-urus',
    name: 'Lamborghini Urus',
    price: 999,
    deposit: 1500,
    mileLimit: '100 mile limit',
    vibeLine: 'Super SUV. All eyes.',
    image: '/images/fleet/l2.jpg',
    images: [
      '/images/fleet/l1.jpg',
      '/images/fleet/l2.jpg',
      '/images/fleet/l3.jpg',
      '/images/fleet/l4.jpg',
      '/images/fleet/l5.jpg',
    ],
  },
  {
    id: 'cadillac-escalade',
    name: 'Cadillac Escalade',
    price: 350,
    deposit: 500,
    mileLimit: '100 mile limit',
    vibeLine: 'VIP comfort. Big energy.',
    image: '/images/fleet/cadillac-escalade.jpg',
    images: [
      '/images/fleet/cadillac-escalade-1.jpg',
      '/images/fleet/cadillac-escalade-2.jpg',
      '/images/fleet/cadillac-escalade-3.jpg',
      '/images/fleet/cadillac-escalade-4.jpg',
      '/images/fleet/cadillac-escalade-5.jpg',
    ],
  },
]

interface FleetSectionProps {
  onCarSelect: (car: FleetCar) => void
}

export function FleetSection({ onCarSelect }: FleetSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="fleet" className="relative bg-background pb-32 pt-12 md:pt-16">
      {/* Hairline divider */}
      <div className="hairline mx-auto w-full max-w-6xl" />

      <div ref={ref} className="mx-auto max-w-7xl px-6 pt-10 md:pt-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            The Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-5xl uppercase tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Our Fleet
          </motion.h2>
        </div>

        {/* Fleet Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleetData.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onCarSelect(car)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {/* Image placeholder */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${car.image})`,
                    backgroundColor: 'hsl(var(--muted))',
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl uppercase tracking-tight text-foreground">
                    {car.name}
                  </h3>
                  <p className="mt-1 font-sans text-sm italic text-foreground/70">
                    {car.vibeLine}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="font-sans text-xs text-muted-foreground">
                      ${car.price}/day
                    </span>
                    <span className="text-xs text-muted-foreground/50">|</span>
                    <span className="font-sans text-xs text-muted-foreground">
                      ${car.deposit} deposit
                    </span>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-foreground/20 bg-background/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4 text-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                {/* Border */}
                <div className="absolute inset-0 border border-foreground/5 transition-colors duration-300 group-hover:border-foreground/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

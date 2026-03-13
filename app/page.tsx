'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ShowcaseSection } from '@/components/showcase-section'
import { FleetSection, type FleetCar } from '@/components/fleet-section'
import { CarModal } from '@/components/car-modal'
import { BookingSection } from '@/components/booking-section'
import { RequirementsSection } from '@/components/requirements-section'
import { Footer } from '@/components/footer'

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<FleetCar | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState('')

  const handleCarSelect = (car: FleetCar) => {
    setSelectedCar(car)
    setIsModalOpen(true)
  }

  const handleRequestCar = (carName: string) => {
    setSelectedVehicle(carName)
    // Scroll to booking section
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Grain overlay for entire page */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <Navigation />
      <HeroSection />
      <ShowcaseSection />
      <FleetSection onCarSelect={handleCarSelect} />
      <BookingSection selectedVehicle={selectedVehicle} />
      <RequirementsSection />
      <Footer />

      <CarModal
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRequestCar={handleRequestCar}
      />
    </main>
  )
}

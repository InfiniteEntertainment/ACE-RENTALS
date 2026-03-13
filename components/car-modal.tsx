'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import type { FleetCar } from './fleet-section'

interface CarModalProps {
  car: FleetCar | null
  isOpen: boolean
  onClose: () => void
  onRequestCar: (carName: string) => void
}

export function CarModal({ car, isOpen, onClose, onRequestCar }: CarModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!car) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1
    )
  }

  const handleRequestCar = () => {
    onRequestCar(car.name)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 z-50 m-auto flex max-h-[90vh] max-w-4xl flex-col overflow-hidden border border-foreground/10 bg-card sm:inset-8 lg:inset-16"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-foreground/20 bg-background/50 backdrop-blur-sm transition-colors hover:border-foreground/40"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row">
              {/* Image Carousel */}
              <div className="relative aspect-video w-full flex-shrink-0 bg-muted lg:aspect-auto lg:w-3/5">
                {/* Current Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                  style={{
                    backgroundImage: `url(${car.images[currentImageIndex]})`,
                  }}
                />

                {/* Carousel Controls */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-foreground/20 bg-background/50 backdrop-blur-sm transition-colors hover:border-foreground/40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-foreground/20 bg-background/50 backdrop-blur-sm transition-colors hover:border-foreground/40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'w-6 bg-foreground'
                          : 'bg-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <div className="flex-1">
                  <h2 className="font-display text-3xl uppercase tracking-tight text-foreground lg:text-4xl">
                    {car.name}
                  </h2>
                  <p className="mt-2 font-sans text-base italic text-muted-foreground">
                    {car.vibeLine}
                  </p>

                  {/* Pricing Block */}
                  <div className="mt-8 space-y-4 border-t border-foreground/10 pt-8">
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-sm uppercase tracking-wider text-muted-foreground">
                        Daily Rate
                      </span>
                      <span className="font-display text-3xl text-foreground">
                        ${car.price}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-sm uppercase tracking-wider text-muted-foreground">
                        Security Deposit
                      </span>
                      <span className="font-sans text-lg text-foreground">
                        ${car.deposit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-sm uppercase tracking-wider text-muted-foreground">
                        Mileage
                      </span>
                      <span className="font-sans text-sm text-foreground">
                        {car.mileLimit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 border-t border-foreground/10 pt-8">
                  <button
                    onClick={handleRequestCar}
                    className="group flex w-full items-center justify-center gap-2 bg-foreground px-6 py-4 font-sans text-sm font-medium uppercase tracking-widest text-background transition-all duration-300 hover:bg-foreground/90"
                  >
                    Request this car
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { fleetData } from './fleet-section'

interface BookingSectionProps {
  selectedVehicle: string
}

export function BookingSection({ selectedVehicle }: BookingSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [vehicle, setVehicle] = useState(selectedVehicle)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    setVehicle(selectedVehicle)
  }, [selectedVehicle])

  const encode = (formData: FormData) => {
    const params = new URLSearchParams()
    formData.forEach((value, key) => {
      params.append(key, String(value))
    })
    return params.toString()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    // MUST be present for Netlify to record the submission
    data.set('form-name', 'booking')

    // Must exist because you declared netlify-honeypot="bot-field"
    if (!data.has('bot-field')) data.set('bot-field', '')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Submission failed: ${res.status} ${res.statusText} ${text}`)
      }

      setFormSubmitted(true)
      form.reset()
      setVehicle('') // optional: resets the controlled select
    } catch (err: any) {
      setSubmitError(err?.message || 'Submission failed. Please try again.')
    }
  }

  return (
    <section id="booking" className="relative overflow-hidden pb-32 pt-12 md:pt-16">
      {/* Background video (fills the padded “gap” area too) */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/booking-bg-poster.jpg"
        >
          <source src="/videos/booking-bg.mp4" type="video/mp4" />
        </video>

        {/* Darken + blend into your theme so text stays readable */}
        <div className="absolute inset-0 bg-background/70" />

        {/* Optional: add a subtle top/bottom fade to match your aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Hairline divider */}
      <div className="hairline mx-auto w-full max-w-6xl" />

      <div ref={ref} className="relative z-20 mx-auto max-w-3xl px-6 pt-10 md:pt-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            Start Your Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-5xl uppercase tracking-tight text-foreground sm:text-6xl"
          >
            Request Booking
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-sans text-muted-foreground"
          >
            We respond within 60 minutes.
          </motion.p>
        </div>

        {formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center border border-foreground/20 bg-foreground/5">
              <Check className="h-8 w-8 text-foreground" />
            </div>
            <h3 className="mt-6 font-display text-3xl uppercase tracking-tight text-foreground">
              Request Received
            </h3>
            <p className="mt-3 max-w-md font-sans text-muted-foreground">
              Thank you for your inquiry. Our team will contact you within 60 minutes to confirm your booking.
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="mt-8 border border-foreground/20 px-6 py-3 font-sans text-sm uppercase tracking-wider text-foreground transition-colors hover:border-foreground/40"
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            name="booking"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="booking" />
            <p className="hidden">
              <label>
                Do not fill this out: <input name="bot-field" />
              </label>
            </p>

            {/* Vehicle Select */}
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                Vehicle
              </label>
              <select
                name="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                required
                className="w-full border border-foreground/10 bg-card px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-foreground/30"
              >
                <option value="">Select a vehicle</option>
                {fleetData.map((car) => (
                  <option key={car.id} value={car.name}>
                    {car.name} - ${car.price}/day
                  </option>
                ))}
              </select>
            </div>

            {/* Name and Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full border border-foreground/10 bg-card px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="(619) 555-0123"
                  className="w-full border border-foreground/10 bg-card px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground/30"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full border border-foreground/10 bg-card px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground/30"
              />
            </div>

            {/* Pickup Date/Time and Return Date/Time */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                  Pickup Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="pickup-datetime"
                  required
                  className="w-full border border-foreground/10 bg-card px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                  Return Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="return-datetime"
                  required
                  className="w-full border border-foreground/10 bg-card px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-foreground/30"
                />
              </div>
            </div>

            {/* Pickup Location */}
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickup-location"
                required
                placeholder="Address or hotel in San Diego"
                className="w-full border border-foreground/10 bg-card px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground/30"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Special requests or additional information..."
                className="w-full resize-none border border-foreground/10 bg-card px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground/30"
              />
            </div>

           
            {submitError ? (
              <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-200">
                {submitError}
              </p>
            ) : null}


            {/* Submit Button */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 bg-foreground px-6 py-4 font-sans text-sm font-medium uppercase tracking-widest text-background transition-all duration-300 hover:bg-foreground/90"
            >
              Submit Request
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}

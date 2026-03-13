'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative bg-card py-20">
      {/* Hairline divider */}
      <div className="hairline mx-auto w-full max-w-6xl" />

      <div ref={ref} className="mx-auto max-w-7xl px-6 pt-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="font-display text-2xl uppercase tracking-tight text-foreground">
              Ace Luxury Exotics
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
              San Diego&apos;s premier exotic car rental. Curated fleet, immaculate condition, white-glove service.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              Contact
            </h4>
            <div className="mt-6 space-y-4">
              <a
                href="tel:619-332-1203"
                className="flex items-center gap-3 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                619-332-1203
              </a>
              <a
                href="mailto:luxacestudio@gmail.com"
                className="flex items-center gap-3 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                luxacestudio@gmail.com
              </a>
              <div className="flex items-start gap-3 font-sans text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Delivery throughout San Diego</span>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              Hours
            </h4>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 font-sans text-sm text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>
                  <p>Mon - Fri: 9am - 7pm</p>
                  <p>Sat - Sun: 10am - 6pm</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              Quick Links
            </h4>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => scrollToSection('fleet')}
                className="block font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View Fleet
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className="block font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Book Now
              </button>
              <button
                onClick={() => scrollToSection('requirements')}
                className="block font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Requirements
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-foreground/10 pt-8 sm:flex-row"
        >
          <p className="font-sans text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Ace Luxury Exotics. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center border border-foreground/10 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center border border-foreground/10 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center border border-foreground/10 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

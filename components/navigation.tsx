'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-foreground/5'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-display text-xl uppercase tracking-tight text-foreground sm:text-2xl"
          >
            Ace Luxury Exotics
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection('fleet')}
              className="font-sans text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
            >
              Fleet
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="font-sans text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
            >
              Book Now
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-sans text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
            >
              Contact
            </button>
          </div>

          {/* Phone & CTA */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="tel:619-332-1203"
              className="flex items-center gap-2 font-sans text-xs text-foreground/70 transition-colors hover:text-foreground"
            >
              <Phone className="h-3.5 w-3.5" />
              619-332-1203
            </a>
            <button
              onClick={() => scrollToSection('booking')}
              className="border border-foreground/30 bg-transparent px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-widest text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              Reserve Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center border border-foreground/20 md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              <button
                onClick={() => scrollToSection('fleet')}
                className="font-display text-3xl uppercase tracking-tight text-foreground"
              >
                Fleet
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className="font-display text-3xl uppercase tracking-tight text-foreground"
              >
                Book Now
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-display text-3xl uppercase tracking-tight text-foreground"
              >
                Contact
              </button>
              <div className="mt-8 border-t border-foreground/10 pt-8">
                <a
                  href="tel:619-332-1203"
                  className="flex items-center gap-2 font-sans text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  619-332-1203
                </a>
              </div>
              <button
                onClick={() => scrollToSection('booking')}
                className="mt-4 w-full bg-foreground px-6 py-4 font-sans text-sm font-medium uppercase tracking-widest text-background"
              >
                Reserve Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

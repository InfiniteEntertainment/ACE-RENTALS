'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Car, Shield, Headphones } from 'lucide-react'

const features = [
  {
    icon: Car,
    title: 'White-Glove Delivery',
    description: 'Doorstep delivery throughout San Diego.',
  },
  {
    icon: Shield,
    title: 'Insurance Options',
    description: 'Comprehensive coverage available.',
  },
  {
    icon: Headphones,
    title: 'Concierge Support',
    description: '24/7 assistance.',
  },
]

export function ShowcaseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="showcase" className="relative bg-background py-32">
      {/* Hairline divider */}
      <div className="hairline mx-auto w-full max-w-6xl" />

      <div ref={ref} className="mx-auto max-w-7xl px-6 pt-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted" />
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/showcase-main.jpg)',
              }}
            />
            {/* Subtle border */}
            <div className="absolute inset-0 border border-foreground/5" />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
            >
              San Diego&apos;s Premier Fleet
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 font-display text-5xl uppercase tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              A Curated Fleet
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-md font-sans text-lg leading-relaxed text-muted-foreground"
            >
              White-glove delivery. Insurance options. Concierge support.
            </motion.p>

            {/* Features */}
            <div className="mt-12 space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-foreground/10 text-foreground/60 transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-medium uppercase tracking-wider text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

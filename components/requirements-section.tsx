'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

const requirements = [
  '100-mile daily limit included',
  'Security deposit required ($500-$1,500 depending on vehicle)',
  'Valid driver\'s license required',
  'Minimum booking period of 1 day',
  'No smoking policy',
  'No track use permitted',
]

export function RequirementsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="requirements" className="relative bg-background py-32">
      {/* Hairline divider */}
      <div className="hairline mx-auto w-full max-w-6xl" />

      <div ref={ref} className="mx-auto max-w-3xl px-6 pt-24">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            Before You Book
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-5xl uppercase tracking-tight text-foreground sm:text-6xl"
          >
            Requirements
          </motion.h2>
        </div>

        {/* Requirements List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {requirements.map((requirement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-4 border-b border-foreground/5 pb-4"
            >
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center border border-foreground/20 text-foreground/60">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans text-foreground/80">{requirement}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

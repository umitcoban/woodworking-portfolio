'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dictionary } from '@/src/lib/getDictionary'

export default function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="relative overflow-hidden bg-[#201915] py-20 text-stone-50 md:py-28">
      <div className="absolute inset-0 opacity-20">
        <Image src="/images/products/binek-fayton/IMG_20260502_114537.jpg" alt="" fill sizes="100vw" loading="lazy" className="object-cover object-center grayscale" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#201915] via-[#201915]/95 to-[#3b281d]/90" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#d6a15f]">{dict.process.eyebrow}</p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 max-w-xl text-4xl font-serif font-semibold leading-tight text-stone-50 md:text-6xl"
            >
              {dict.process.title}
            </motion.h2>
            <p className="mb-10 max-w-xl text-base leading-8 text-stone-300 md:text-lg">{dict.process.description}</p>

            <div className="space-y-8">
              {dict.process.steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="grid grid-cols-[3.5rem_1fr] gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-[#d6a15f]/60 font-serif text-xl text-[#d6a15f]">
                      {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-serif text-stone-100">{step.title}</h3>
                    <p className="leading-7 text-stone-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative min-h-[420px] overflow-hidden bg-[#14110f] shadow-2xl md:min-h-[620px]"
            >
              <Image src="/images/products/oyma-at/IMG_20260502_111811.jpg" alt="Wood carving process" fill sizes="(max-width: 1024px) 100vw, 55vw" loading="lazy" className="object-cover object-center" />
              <div className="absolute inset-0 border border-white/10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

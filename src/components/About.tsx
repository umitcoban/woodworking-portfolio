'use client'

import { Dictionary } from '@/src/lib/getDictionary'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="border-t border-stone-200 bg-[#fffaf2] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#5f6f52]">{dict.navigation.about}</p>
            <h2 className="mb-6 max-w-2xl text-4xl font-serif font-semibold leading-tight text-[#211c17] md:text-6xl">{dict.about.title}</h2>
            <p className="mb-10 text-base leading-8 text-stone-700 md:text-lg">
              {dict.about.description}
            </p>
            
            <div className="grid grid-cols-1 gap-4 border-t border-stone-200 pt-8 sm:grid-cols-3">
              {dict.about.stats.map((stat: { label: string, value: string }, index: number) => (
                <div key={index} className="border-l border-[#b98950]/50 pl-5">
                  <div className="mb-2 text-4xl font-serif font-semibold text-[#8c5b2f]">{stat.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="relative min-h-[520px] overflow-hidden bg-[#14110f] shadow-2xl">
              <Image src="/images/portrait/ahmet-buken-workshop-portrait.png" alt="Ahmet Büken in his Havran workshop" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211c17]/90 via-[#211c17]/10 to-transparent" />
              <div className="absolute left-6 top-6 border border-white/20 bg-[#211c17]/75 px-4 py-3 backdrop-blur-sm md:left-8 md:top-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0bd76]">{dict.about.sourceLabel}</p>
                <a href={dict.about.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 block max-w-72 font-serif text-lg leading-tight text-stone-50 hover:text-[#f0bd76]">
                  {dict.about.sourceTitle}
                </a>
                <p className="mt-2 text-xs text-stone-300">{dict.about.sourceDate}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="max-w-lg font-serif text-2xl italic leading-snug text-stone-50 md:text-3xl">
                  {dict.about.quote}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

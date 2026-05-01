'use client'

import { Dictionary } from '@/src/lib/getDictionary'
import { motion } from 'framer-motion'

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">{dict.about.title}</h2>
            <div className="w-20 h-1 bg-amber-700 mb-8"></div>
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              {dict.about.description}
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
              {dict.about.stats.map((stat: { label: string, value: string }, index: number) => (
                <div key={index}>
                  <div className="text-4xl font-serif font-bold text-amber-700 mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-stone-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Image / Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative aspect-square md:aspect-[4/5] bg-stone-200 p-4 shadow-2xl">
              <div className="absolute inset-4 border-2 border-amber-800/30 z-10 pointer-events-none"></div>
              {/* Using CSS gradient to simulate a portrait vibe until an actual image is used */}
              <div className="w-full h-full bg-stone-800 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] transition-transform duration-1000 group-hover:scale-110"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-serif text-amber-600 mb-4 opacity-50">&quot;</div>
                    <p className="text-stone-300 font-serif text-xl md:text-2xl italic max-w-sm">
                      {dict.about.quote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

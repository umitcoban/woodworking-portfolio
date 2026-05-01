'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dictionary } from '@/src/lib/getDictionary'

export default function Process({ dict }: { dict: Dictionary & { lang: string } }) {
  const steps = [
    {
      title: dict.lang === 'en' ? 'Wood Selection' : 'Ağaç Seçimi',
      desc: dict.lang === 'en' ? 'Choosing the finest walnut and oak.' : 'En iyi ceviz ve meşe ağaçlarının özenle seçimi.',
    },
    {
      title: dict.lang === 'en' ? 'Hand Carving' : 'El İşçiliği',
      desc: dict.lang === 'en' ? 'Shaping the wood using traditional techniques.' : 'Geleneksel yöntemlerle ahşaba şekil verme süreci.',
    },
    {
      title: dict.lang === 'en' ? 'Final Polish' : 'Son Dokunuş',
      desc: dict.lang === 'en' ? 'Applying natural oils for a timeless finish.' : 'Zamansız bir görünüm için doğal yağlarla cilalama.',
    }
  ]

  return (
    <section id="process" className="py-24 bg-stone-900 text-stone-50 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image src="/images/process.png" alt="process background" fill sizes="100vw" className="object-cover object-center grayscale" />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6 text-amber-500"
            >
              {dict.navigation.process}
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '5rem' }}
              viewport={{ once: true }}
              className="h-1 bg-amber-700 mb-8"
            ></motion.div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-amber-600 flex items-center justify-center text-amber-500 font-serif text-xl">
                      {index + 1}
                    </div>
                    {index !== steps.length - 1 && <div className="w-px h-16 bg-stone-700 my-2"></div>}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-serif text-stone-200 mb-2">{step.title}</h3>
                    <p className="text-stone-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] bg-stone-800 shadow-2xl overflow-hidden"
            >
              <Image src="/images/process.png" alt="Wood carving process" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

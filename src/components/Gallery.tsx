'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Dictionary } from '@/src/lib/getDictionary'

const items = [
  { id: 1, category: 'coach', title: { tr: 'Klasik fayton gövdesi', en: 'Classic phaeton body' }, image: '/images/coach/IMG_20260502_105654.jpg', span: 'md:col-span-2' },
  { id: 2, category: 'coach', title: { tr: 'El yapımı at arabası detayı', en: 'Handmade carriage detail' }, image: '/images/coach/IMG_20260502_111749.jpg', span: '' },
  { id: 3, category: 'statues', title: { tr: 'Ahşap figür çalışması', en: 'Wooden figure study' }, image: '/images/statues/IMG_20260502_110512.jpg', span: '' },
  { id: 4, category: 'statues', title: { tr: 'Oyma heykel formu', en: 'Carved sculptural form' }, image: '/images/statues/IMG_20260502_111335.jpg', span: 'md:col-span-2' },
  { id: 5, category: 'customerOrders', title: { tr: 'Özel sipariş obje', en: 'Bespoke wooden object' }, image: '/images/customer_orders/IMG_20260502_111932.jpg', span: '' },
  { id: 6, category: 'customerOrders', title: { tr: 'Sipariş üzerine tasarım', en: 'Commissioned design' }, image: '/images/customer_orders/IMG_20260502_112306.jpg', span: '' },
  { id: 7, category: 'coach', title: { tr: 'Geleneksel taşıt işçiliği', en: 'Traditional vehicle craft' }, image: '/images/coach/IMG_20260502_114005.jpg', span: '' },
  { id: 8, category: 'statues', title: { tr: 'El oyma yüzey', en: 'Hand-carved surface' }, image: '/images/statues/IMG_20260502_113238.jpg', span: '' },
  { id: 9, category: 'customerOrders', title: { tr: 'Kişiye özel ahşap iş', en: 'Personalized woodwork' }, image: '/images/customer_orders/IMG_20260502_112708.jpg', span: 'md:col-span-2' },
]

export default function Gallery({ dict }: { dict: Dictionary & { lang?: string } }) {
  const [filter, setFilter] = useState('all')

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter)

  return (
    <section id="gallery" className="bg-[#f5efe5] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8c5b2f]">{dict.navigation.gallery}</p>
            <h2 className="max-w-2xl text-4xl font-serif font-semibold leading-tight text-[#211c17] md:text-6xl">{dict.gallery.title}</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-stone-700 md:text-lg">{dict.gallery.description}</p>
        </div>

        <div className="mb-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
          {Object.entries(dict.gallery.categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`shrink-0 border px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                filter === key 
                  ? 'border-[#211c17] bg-[#211c17] text-stone-50' 
                  : 'border-stone-300 bg-white/35 text-stone-700 hover:border-[#8c5b2f] hover:text-[#5f3c20]'
              }`}
            >
              {label as string}
            </button>
          ))}
        </div>

        <motion.div layout className="grid auto-rows-[280px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[320px]">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className={`group relative overflow-hidden bg-[#14110f] shadow-sm ${item.span}`}
              >
                <Image
                  src={item.image}
                  alt={item.title[dict.lang === 'en' ? 'en' : 'tr']}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transition-transform duration-700 md:object-cover md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="translate-y-2 text-lg font-serif text-stone-50 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.title[dict.lang === 'en' ? 'en' : 'tr']}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

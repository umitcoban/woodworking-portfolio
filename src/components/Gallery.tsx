'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Dictionary } from '@/src/lib/getDictionary'
import { GalleryItem } from '@/src/lib/getGalleryItems'

export default function Gallery({ dict, items }: { dict: Dictionary & { lang?: string }; items: GalleryItem[] }) {
  const [filter, setFilter] = useState('all')

  const filteredItems = useMemo(
    () => (filter === 'all' ? items : items.filter((item) => item.category === filter)),
    [filter, items]
  )

  const categories = dict.gallery.categories as Record<string, string>

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
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`shrink-0 border px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                filter === key
                  ? 'border-[#211c17] bg-[#211c17] text-stone-50'
                  : 'border-stone-300 bg-white/35 text-stone-700 hover:border-[#8c5b2f] hover:text-[#5f3c20]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <p className="py-16 text-center text-stone-500">—</p>
        ) : (
          <motion.div layout className="grid auto-rows-[280px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[320px] lg:grid-cols-3">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '100px' }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
                  className={`group relative overflow-hidden bg-[#14110f] shadow-sm ${index % 5 === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <Image
                    src={item.image}
                    alt={categories[item.category] ?? item.category}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="translate-y-2 text-sm font-serif text-stone-50 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:text-lg">
                      {categories[item.category] ?? item.category}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}

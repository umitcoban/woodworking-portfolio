'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Dictionary } from '@/src/lib/getDictionary'

export default function Gallery({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState('all')
  
  // Dummy data for gallery
  const items = [
    { id: 1, category: 'carriages', title: 'Classic Phaeton', image: '/images/product_carriage.png' },
    { id: 2, category: 'sculptures', title: 'Wooden Horse Sculpture', image: '/images/sculpture.png' },
    { id: 3, category: 'kitchenware', title: 'Hand-carved Spoons', image: '/images/spoons.png' },
    { id: 4, category: 'carriages', title: 'Miniature Carriage', image: '/images/product_carriage.png' },
    { id: 5, category: 'crafts', title: 'Carved Ornament', image: '/images/sculpture.png' },
    { id: 6, category: 'kitchenware', title: 'Rustic Kitchen Set', image: '/images/spoons.png' },
  ]

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter)

  return (
    <section id="gallery" className="py-24 bg-stone-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">{dict.gallery.title}</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">{dict.gallery.description}</p>
          <div className="w-24 h-1 bg-amber-700 mx-auto mt-8"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(dict.gallery.categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
                filter === key 
                  ? 'bg-stone-900 text-stone-50' 
                  : 'bg-transparent text-stone-600 border border-stone-300 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {label as string}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden aspect-[4/3] bg-stone-200 cursor-pointer shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-stone-50 text-xl font-serif font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
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

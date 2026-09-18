'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryItem } from '@/src/lib/getGalleryItems'

export default function Lightbox({
  items,
  index,
  caption,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[]
  index: number | null
  caption: (item: GalleryItem) => string
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}) {
  const isOpen = index !== null
  const item = isOpen ? items[index] : null

  const goNext = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  const goPrev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose, goNext, goPrev])

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-4 md:p-10"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 text-stone-300 transition-colors hover:text-white md:right-8 md:top-8"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Previous"
            className="absolute left-2 z-10 text-stone-300 transition-colors hover:text-white md:left-6"
          >
            <ChevronLeft size={36} />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative flex h-full max-h-[85vh] w-full max-w-4xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={item.image}
                alt={caption(item)}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center font-serif text-lg text-stone-100">{caption(item)}</p>
          </motion.div>

          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Next"
            className="absolute right-2 z-10 text-stone-300 transition-colors hover:text-white md:right-6"
          >
            <ChevronRight size={36} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

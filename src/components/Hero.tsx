'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Dictionary } from '@/src/lib/getDictionary'
import { useRef } from 'react'

export default function Hero({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax effect for the background and text on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Title character animation
  const titleWords = dict.hero.title.split(' ')
  const letterContainer = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 * i },
    }),
  }
  
  const letterVariant = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring" as const, damping: 12, stiffness: 100 },
    },
  }

  return (
    <section ref={containerRef} id="home" className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-[#14110f]">
      <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
          className="w-full h-full relative"
        >
          <Image
            src="/images/products/binek-fayton/IMG_20260502_105654.jpg"
            alt="Woodworking workshop"
            fill
            sizes="100vw"
            preload
            className="object-cover object-center md:object-[center_58%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#14110f]/55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(20,17,15,0.95)_0%,_rgba(20,17,15,0.45)_48%,_rgba(20,17,15,0.86)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#14110f]/70 to-transparent" />
      </motion.div>

      <motion.div 
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d9a15b] md:w-24"></div>
          <div className="h-2 w-2 rotate-45 border border-[#d9a15b]"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d9a15b] md:w-24"></div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-6 max-w-3xl text-xs font-semibold uppercase tracking-[0.24em] text-[#f0bd76] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-sm md:tracking-[0.42em]"
        >
          {dict.hero.subtitle}
        </motion.p>
        
        <motion.h1 
          variants={letterContainer}
          initial="hidden"
          animate="visible"
          className="mb-8 flex flex-wrap justify-center gap-x-4 gap-y-1 overflow-hidden px-2 py-4 text-[clamp(3.25rem,15vw,5.5rem)] font-serif font-semibold leading-[0.92] text-stone-50 drop-shadow-[0_8px_12px_rgba(0,0,0,0.8)] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {titleWords.map((word, wordIndex) => (
            <span key={word} className="inline-flex whitespace-nowrap">
              {Array.from(word).map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={letterVariant}
                  className="inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mb-10 max-w-2xl text-base font-light leading-8 text-stone-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-xl"
        >
          {dict.hero.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link 
            href="#gallery"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-[#d9a15b]/70 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone-50 transition-all hover:border-[#f0bd76] md:px-10 md:py-5 md:text-sm"
          >
            <span className="absolute inset-0 h-full w-full translate-y-[101%] bg-[#5f6f52]/70 transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
            
            <span className="relative z-10 flex items-center gap-4">
              {dict.hero.cta}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &rarr;
              </motion.span>
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center pb-8 md:flex"
      >
        <span className="text-stone-400 text-[10px] uppercase tracking-[0.3em] mb-4">Scroll</span>
        <div className="relative h-16 w-px overflow-hidden bg-stone-700">
          <motion.div
            initial={{ top: '-100%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 h-1/2 w-full rounded-full bg-[#d9a15b]"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}

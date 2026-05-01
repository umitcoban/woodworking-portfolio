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
  const titleLetters = Array.from(dict.hero.title)
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
    <section ref={containerRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Image with Parallax */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
          className="w-full h-full relative"
        >
          <Image
            src="/images/hero_bg.png"
            alt="Woodworking workshop"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        </motion.div>
        {/* Solid dark overlay for text readability */}
        <div className="absolute inset-0 bg-stone-950/60" />
        {/* Elegant Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(12,10,9,0.95)_100%)]" />
        {/* Subtle noise/texture overlay for a rustic crafted feel */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Decorative Top Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-amber-600"></div>
          <div className="w-2 h-2 rotate-45 border border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
          <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-amber-600"></div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-amber-400 font-medium tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 text-xs md:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          {dict.hero.subtitle}
        </motion.p>
        
        {/* Animated Title */}
        <motion.h1 
          variants={letterContainer}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-stone-50 mb-8 drop-shadow-[0_8px_12px_rgba(0,0,0,0.8)] flex flex-wrap justify-center overflow-hidden px-2 py-4"
        >
          {titleLetters.map((char, index) => (
            <motion.span 
              key={index} 
              variants={letterVariant}
              className={char === ' ' ? 'w-4 md:w-8' : 'inline-block origin-bottom'}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-stone-200 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
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
            className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden border border-amber-600/50 text-stone-50 transition-all hover:border-amber-500 rounded-none font-medium uppercase tracking-[0.2em] text-sm backdrop-blur-sm"
          >
            {/* Button Hover effect background */}
            <span className="absolute inset-0 w-full h-full bg-amber-800/40 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
            
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

      {/* Sophisticated Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pb-8"
      >
        <span className="text-stone-400 text-[10px] uppercase tracking-[0.3em] mb-4">Scroll</span>
        <div className="w-px h-16 bg-stone-800 relative overflow-hidden">
          <motion.div
            initial={{ top: '-100%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-1/2 bg-amber-600 shadow-[0_0_10px_2px_rgba(217,119,6,0.8)] rounded-full"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}

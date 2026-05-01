'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dictionary } from '@/src/lib/getDictionary'

export default function Navbar({ dict, lang }: { dict: Dictionary, lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: dict.navigation.home, href: '#home' },
    { name: dict.navigation.gallery, href: '#gallery' },
    { name: dict.navigation.process, href: '#process' },
    { name: dict.navigation.about, href: '#about' },
    { name: dict.navigation.contact, href: '#contact' },
  ]

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'tr' : 'en'
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
    return newPath
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-stone-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className={`text-2xl font-serif font-bold tracking-wider transition-colors ${isScrolled ? 'text-stone-50' : 'text-stone-50 drop-shadow-lg'}`}>
          A. BÜKEN
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-amber-500 ${
                isScrolled ? 'text-stone-300' : 'text-stone-100 drop-shadow-md'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Language Switcher */}
          <Link
            href={toggleLanguage()}
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-amber-500 ${
              isScrolled ? 'text-stone-300' : 'text-stone-100 drop-shadow-md'
            }`}
          >
            <Globe size={16} />
            {lang === 'en' ? 'TR' : 'EN'}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-stone-50' : 'text-stone-50 drop-shadow-lg'}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-stone-900 z-50 flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                className="text-stone-50 p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-serif text-stone-300 hover:text-amber-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href={toggleLanguage()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-2xl font-serif text-stone-300 mt-8 hover:text-amber-500 transition-colors"
              >
                <Globe size={28} />
                {lang === 'en' ? 'Türkçe (TR)' : 'English (EN)'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

'use client'

import { Dictionary } from '@/src/lib/getDictionary'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { name: dict.navigation.home, href: `/${lang}#home` },
    { name: dict.navigation.gallery, href: `/${lang}#gallery` },
    { name: dict.navigation.process, href: `/${lang}#process` },
    { name: dict.navigation.about, href: `/${lang}#about` },
    { name: dict.navigation.contact, href: `/${lang}#contact` },
  ]

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'tr' : 'en'
    return pathname.startsWith(`/${lang}`)
      ? pathname.replace(`/${lang}`, `/${newLang}`)
      : `/${newLang}`
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-[#211c17] py-3 shadow-lg backdrop-blur-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href={`/${lang}#home`} className={`text-xl font-serif font-semibold tracking-[0.18em] transition-colors md:text-2xl ${isScrolled || mobileMenuOpen ? 'text-stone-50' : 'text-stone-50 drop-shadow-lg'}`}>
          AHMET BÜKEN
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[#f0bd76] ${
                isScrolled ? 'text-stone-300' : 'text-stone-100 drop-shadow-md'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            href={toggleLanguage()}
            className={`flex items-center gap-2 border border-white/20 px-3 py-2 text-xs font-semibold transition-colors hover:border-[#f0bd76] hover:text-[#f0bd76] ${
              isScrolled ? 'text-stone-300' : 'text-stone-100 drop-shadow-md'
            }`}
            aria-label={lang === 'en' ? 'Türkçe sayfaya geç' : 'Switch to English'}
          >
            <Globe size={16} />
            {lang === 'en' ? 'TR' : 'EN'}
          </Link>
        </nav>

        <button
          className={`md:hidden p-2 transition-colors ${isScrolled || mobileMenuOpen ? 'text-stone-50' : 'text-stone-50 drop-shadow-lg'}`}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 flex h-[100dvh] w-[100dvw] flex-col bg-[#211c17] text-stone-50"
            style={{ backgroundColor: '#211c17' }}
          >
            <div className="flex justify-end p-6">
              <button
                className="text-stone-50 p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation"
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
                  className="text-3xl font-serif text-stone-300 transition-colors hover:text-[#f0bd76]"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href={toggleLanguage()}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 flex items-center gap-3 border border-white/15 px-5 py-3 text-xl font-serif text-stone-300 transition-colors hover:text-[#f0bd76]"
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

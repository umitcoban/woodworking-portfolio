import type { Metadata } from 'next'
import '../globals.css'
import { getDictionary, hasLocale, locales } from '@/src/lib/getDictionary'
import { notFound } from 'next/navigation'
import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return {
    title: `${dict.hero.title} | ${dict.hero.subtitle}`,
    description: dict.hero.description,
    keywords: 'ahşap, fayton, at arabası, balıkesir, ahmet büken, el sanatları, woodwork, carriage, craftsmanship',
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <html lang={lang} className="scroll-smooth">
      <body className="relative bg-stone-50 text-stone-900 antialiased selection:bg-stone-800 selection:text-stone-50">
        <Navbar dict={dict} lang={lang} />
        <main>{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  )
}

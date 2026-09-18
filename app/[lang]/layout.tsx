import type { Metadata } from 'next'
import '../globals.css'
import { getDictionary, hasLocale, locales } from '@/src/lib/getDictionary'
import { SITE_URL } from '@/src/lib/constants'
import { notFound } from 'next/navigation'
import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'
import WhatsappButton from '@/src/components/WhatsappButton'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const title = `${dict.hero.title} | ${dict.hero.subtitle}`
  const ogImage = `${SITE_URL}/images/products/binek-fayton/IMG_20260502_105654.jpg`

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: dict.hero.description,
    keywords: 'ahşap, fayton, at arabası, balıkesir, havran, ahmet büken, el sanatları, woodwork, carriage, craftsmanship',
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title,
      description: dict.hero.description,
      url: `${SITE_URL}/${lang}`,
      siteName: dict.hero.title,
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 810, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: dict.hero.description,
      images: [ogImage],
    },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: dict.hero.title,
    jobTitle: dict.hero.subtitle,
    description: dict.hero.description,
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}/images/portrait/ahmet-buken-workshop-portrait.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Havran',
      addressRegion: 'Balıkesir',
      addressCountry: 'TR',
    },
    knowsAbout: ['At arabası yapımı', 'Fayton yapımı', 'Ahşap oymacılığı'],
  }

  return (
    <html lang={lang} className="scroll-smooth">
      <body className="relative bg-stone-50 text-stone-900 antialiased selection:bg-stone-800 selection:text-stone-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar dict={dict} lang={lang} />
        <main>{children}</main>
        <Footer dict={dict} />
        <WhatsappButton lang={lang} />
      </body>
    </html>
  )
}

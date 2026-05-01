import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { getDictionary, Locale } from '@/src/lib/getDictionary'
import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return {
    title: `${dict.hero.title} | ${dict.hero.subtitle}`,
    description: dict.hero.description,
    keywords: 'ahşap, fayton, at arabası, balıkesir, ahmet büken, el sanatları, woodwork, carriage, craftsmanship',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`relative ${inter.className} bg-stone-50 text-stone-900 antialiased selection:bg-stone-800 selection:text-stone-50`}>
        <Navbar dict={dict} lang={lang} />
        <main>{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  )
}

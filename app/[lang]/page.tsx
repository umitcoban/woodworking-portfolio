import { getDictionary, hasLocale } from '@/src/lib/getDictionary'
import { getGalleryItems } from '@/src/lib/getGalleryItems'
import { notFound } from 'next/navigation'
import Hero from '@/src/components/Hero'
import About from '@/src/components/About'
import Gallery from '@/src/components/Gallery'
import Process from '@/src/components/Process'
import Press from '@/src/components/Press'
import Contact from '@/src/components/Contact'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const enhancedDict = { ...dict, lang }
  const galleryItems = getGalleryItems()

  return (
    <div className="flex flex-col min-h-screen">
      <Hero dict={enhancedDict} />
      <Gallery dict={enhancedDict} items={galleryItems} />
      <Process dict={enhancedDict} />
      <About dict={enhancedDict} />
      <Press dict={enhancedDict} />
      <Contact dict={enhancedDict} />
    </div>
  )
}

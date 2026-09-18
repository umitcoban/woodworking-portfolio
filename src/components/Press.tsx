'use client'

import { motion } from 'framer-motion'
import { Newspaper, PlayCircle, ArrowUpRight } from 'lucide-react'
import { Dictionary } from '@/src/lib/getDictionary'

type PressItem = {
  type: 'video' | 'article'
  source: string
  title: { tr: string; en: string }
  url: string
}

const pressItems: PressItem[] = [
  {
    type: 'video',
    source: 'Diyanet TV',
    title: {
      tr: 'Helal Kazancın Alın Teri — At Arabası Ustası',
      en: 'The Sweat of Honest Earnings — Carriage Master',
    },
    url: 'https://www.diyanet.tv/helal-kazancin-alin-teri/video/ahmet-buken-at-arabasi-ustasi--helal-kazancin-alin-teri-19-bolum',
  },
  {
    type: 'video',
    source: 'YouTube',
    title: { tr: 'Ahmet Büken Röportajı', en: 'Ahmet Büken Interview' },
    url: 'https://youtu.be/_vGOe4w27uE?si=-dbEFZtXGd7QDBT0',
  },
  {
    type: 'video',
    source: 'Anadolu Ajansı',
    title: { tr: 'Yarım Asırdır At Arabası Yapıyor', en: 'Making Carriages for Half a Century' },
    url: 'https://www.aa.com.tr/tr/vg/video-galeri/yarim-asirdir-at-arabasi-yapiyor-/44043',
  },
  {
    type: 'video',
    source: 'Dailymotion',
    title: { tr: 'Ahmet Büken Röportajı', en: 'Ahmet Büken Feature' },
    url: 'https://www.dailymotion.com/video/x76ro6h',
  },
  {
    type: 'article',
    source: 'Havran.com.tr',
    title: { tr: 'Yaşatılan Eski Meslekler', en: 'Old Crafts Kept Alive' },
    url: 'https://www.havran.com.tr/kultur-turizm/yasatilan-eski-meslekler/',
  },
  {
    type: 'video',
    source: 'Dailymotion',
    title: { tr: 'Ahmet Büken Belgesel Kaydı', en: 'Ahmet Büken Documentary Clip' },
    url: 'https://www.dailymotion.com/video/x5gef04',
  },
  {
    type: 'video',
    source: 'Diyanet TV',
    title: { tr: 'Gören Bilir — Havran', en: 'Gören Bilir — Havran' },
    url: 'https://www.diyanet.tv/goren-bilir/video/goren-bilir-8-bolum--havran',
  },
]

export default function Press({ dict }: { dict: Dictionary & { lang?: string } }) {
  const lang = dict.lang === 'en' ? 'en' : 'tr'

  return (
    <section id="press" className="border-t border-stone-800 bg-[#14110f] py-20 text-stone-50 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f0bd76]">{dict.press.eyebrow}</p>
          <h2 className="mb-4 text-4xl font-serif font-semibold leading-tight md:text-6xl">{dict.press.title}</h2>
          <p className="text-base leading-8 text-stone-300 md:text-lg">{dict.press.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pressItems.map((item, index) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '80px' }}
              transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
              className="group flex flex-col justify-between border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#f0bd76]/60 hover:bg-white/[0.06]"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0bd76]">
                    {item.type === 'video' ? <PlayCircle size={16} /> : <Newspaper size={16} />}
                    {item.source}
                  </span>
                  <ArrowUpRight size={18} className="text-stone-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f0bd76]" />
                </div>
                <h3 className="font-serif text-lg leading-snug text-stone-100 group-hover:text-white">
                  {item.title[lang]}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

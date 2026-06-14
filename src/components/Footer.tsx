import { Dictionary } from '@/src/lib/getDictionary'

export default function Footer({ dict }: { dict: Dictionary }) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-stone-800 bg-[#14110f] py-10 text-stone-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-10">
        <div className="text-center md:text-left">
          <h3 className="mb-2 text-2xl font-serif font-semibold tracking-[0.12em] text-stone-50">Ahmet Büken</h3>
          <p className="text-sm max-w-sm">
            {dict.hero.subtitle}
          </p>
        </div>
        
        <p className="text-sm">&copy; {currentYear} Ahmet Büken.</p>
      </div>
    </footer>
  )
}

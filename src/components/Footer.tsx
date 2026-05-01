import { Heart } from 'lucide-react'
import { Dictionary } from '@/src/lib/getDictionary'

export default function Footer({ dict }: { dict: Dictionary }) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-serif font-bold text-stone-50 mb-2">Ahmet Büken</h3>
          <p className="text-sm max-w-sm">
            {dict.hero.subtitle}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <span>&copy; {currentYear} Ahmet Büken.</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={14} className="text-amber-600" />
          </span>
        </div>
      </div>
    </footer>
  )
}

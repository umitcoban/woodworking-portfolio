'use client'

import { MapPin, Phone, Mail } from 'lucide-react'
import { Dictionary } from '@/src/lib/getDictionary'

export default function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="py-24 bg-stone-100 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">{dict.contact.title}</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">{dict.contact.description}</p>
            <div className="w-24 h-1 bg-amber-700 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-xl">
            {/* Contact Info */}
            <div className="bg-stone-900 text-stone-50 p-10 md:p-14 flex flex-col justify-center">
              <h3 className="text-2xl font-serif mb-8 text-amber-500">İletişim Bilgileri</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-stone-300 text-sm uppercase tracking-wider mb-1">{dict.contact.location}</h4>
                    <p className="text-lg">{dict.contact.locationValue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-stone-300 text-sm uppercase tracking-wider mb-1">{dict.contact.phone}</h4>
                    <p className="text-lg">+90 555 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-stone-300 text-sm uppercase tracking-wider mb-1">{dict.contact.email}</h4>
                    <p className="text-lg">info@ahmetbuken.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10 md:p-14">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 uppercase tracking-wider">İsim</label>
                  <input 
                    type="text" 
                    className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 uppercase tracking-wider">{dict.contact.email}</label>
                  <input 
                    type="email" 
                    className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 uppercase tracking-wider">Mesaj</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  type="button"
                  className="w-full bg-stone-900 hover:bg-amber-700 text-stone-50 font-medium uppercase tracking-widest py-4 transition-colors"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

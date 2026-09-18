'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Dictionary } from '@/src/lib/getDictionary'
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/src/lib/constants'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative bg-[#eef0e8] py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#5f6f52]">{dict.navigation.contact}</p>
            <h2 className="mb-4 text-4xl font-serif font-semibold text-[#211c17] md:text-6xl">{dict.contact.title}</h2>
            <p className="mx-auto max-w-2xl leading-8 text-stone-700">{dict.contact.description}</p>
          </div>

          <div className="grid grid-cols-1 overflow-hidden bg-white shadow-xl md:grid-cols-2">
            <div className="flex flex-col justify-center bg-[#211c17] p-8 text-stone-50 md:p-12">
              <h3 className="mb-8 text-2xl font-serif text-[#f0bd76]">{dict.contact.infoTitle}</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 text-[#f0bd76]" />
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-300">{dict.contact.location}</h4>
                    <p className="text-lg">{dict.contact.locationValue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 text-[#f0bd76]" />
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-300">{dict.contact.phone}</h4>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-lg hover:text-[#f0bd76]">{CONTACT_PHONE}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 text-[#f0bd76]" />
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-300">{dict.contact.email}</h4>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg hover:text-[#f0bd76]">{CONTACT_EMAIL}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="_subject" value="Yeni site mesajı — Ahmet Büken" />
                <input type="hidden" name="_captcha" value="false" />
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">{dict.contact.name}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-[#5f6f52] focus:outline-none focus:ring-1 focus:ring-[#5f6f52]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">{dict.contact.email}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-[#5f6f52] focus:outline-none focus:ring-1 focus:ring-[#5f6f52]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">{dict.contact.message}</label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    className="w-full resize-none border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-[#5f6f52] focus:outline-none focus:ring-1 focus:ring-[#5f6f52]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#211c17] py-4 text-xs font-semibold uppercase tracking-[0.22em] text-stone-50 transition-colors hover:bg-[#5f6f52] disabled:opacity-60"
                >
                  {status === 'sending' ? dict.contact.sending : dict.contact.send}
                </button>
                {status === 'sent' && (
                  <p className="text-sm font-medium text-[#5f6f52]">{dict.contact.success}</p>
                )}
                {status === 'error' && (
                  <p className="text-sm font-medium text-red-700">{dict.contact.errorMsg}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

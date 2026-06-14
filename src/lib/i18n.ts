export const locales = ['en', 'tr'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'tr'

export const hasLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale)
}

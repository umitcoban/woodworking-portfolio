import 'server-only'

// Import types for inference
import type enDict from '../../dictionaries/en.json'
import type { Locale } from './i18n'
export { hasLocale, locales } from './i18n'

const dictionaries = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  tr: () => import('../../dictionaries/tr.json').then((module) => module.default),
}

export type Dictionary = typeof enDict

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation files
import translationVI from './locales/vi/translation.json'
import translationEN from './locales/en/translation.json'

const resources = {
  vi: {
    translation: translationVI
  },
  en: {
    translation: translationEN
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // Default language: Vietnamese
    fallbackLng: 'en', // Fallback if translation key missing
    interpolation: {
      escapeValue: false // React already handles XSS protection
    },
    react: {
      useSuspense: false // Disable suspense to avoid loading states
    }
  })

export default i18n

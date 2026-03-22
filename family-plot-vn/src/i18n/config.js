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

// Check localStorage for saved language preference
const getStoredLanguage = () => {
  try {
    const saved = localStorage.getItem('preferredLanguage')
    if (saved && ['vi', 'en'].includes(saved)) {
      return saved
    }
  } catch (e) {
    // localStorage unavailable (private browsing, disabled, quota exceeded)
    // Fall through to default
  }
  return 'vi' // Default to Vietnamese
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already handles XSS protection
    },
    react: {
      useSuspense: false // Disable suspense to avoid loading states
    }
  })

// Save to localStorage whenever language changes
const languageChangeHandler = (lng) => {
  try {
    localStorage.setItem('preferredLanguage', lng)
  } catch (e) {
    // Silently ignore localStorage write failures
  }
}
i18n.on('languageChanged', languageChangeHandler)

export default i18n

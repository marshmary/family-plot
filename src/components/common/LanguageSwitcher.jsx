import React from 'react'
import { useTranslation } from 'react-i18next'
import '../../sass/components/common/_language-switcher.scss'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const currentLang = i18n.language
  const targetLang = currentLang === 'vi' ? 'en' : 'vi'
  const targetLabel = currentLang === 'vi' ? 'English' : 'Tiếng Việt'

  const handleSwitch = () => {
    i18n.changeLanguage(targetLang)
  }

  return (
    <button
      onClick={handleSwitch}
      className="language-switcher"
      aria-label={`Switch to ${targetLabel}`}
    >
      <span className="current-lang">
        {currentLang === 'vi' ? 'VI' : 'EN'}
      </span>
      <span className="switch-icon">⇄</span>
      <span className="target-lang">
        {targetLabel}
      </span>
    </button>
  )
}

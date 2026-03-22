import React from 'react'
import { useThemeStore } from '../../stores/themeStore'
import { useTranslation } from 'react-i18next'
import './ThemeToggle.scss'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()
  const { t } = useTranslation()

  return (
    <button
      className="theme-toggle-slider"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t('controls.dark') : t('controls.light')}
    >
      <span
        className={theme === 'dark' ? 'active' : ''}
        aria-label={t('controls.dark')}
      >
        <span className="material-icons-outlined">dark_mode</span>
      </span>
      <span
        className={theme === 'light' ? 'active' : ''}
        aria-label={t('controls.light')}
      >
        <span className="material-icons-outlined">light_mode</span>
      </span>
      <span className="slider" style={{ left: theme === 'dark' ? 0 : 33 }}></span>
    </button>
  )
}

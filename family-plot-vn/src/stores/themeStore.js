import { create } from 'zustand'

const THEME_KEY = 'theme'

export const useThemeStore = create((set, get) => ({
  // State
  theme: 'dark',

  // Actions

  // Initialize theme from localStorage or system preference
  initTheme: () => {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored) {
      set({ theme: stored })
      document.documentElement.setAttribute('data-theme', stored)
      return stored
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      set({ theme: 'light' })
      document.documentElement.setAttribute('data-theme', 'light')
      return 'light'
    } else {
      set({ theme: 'dark' })
      document.documentElement.setAttribute('data-theme', 'dark')
      return 'dark'
    }
  },

  // Toggle between dark and light
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark'
    set({ theme: newTheme })
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
    return newTheme
  },

  // Set theme directly
  setTheme: (theme) => {
    set({ theme })
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  },
}))

import { create } from 'zustand'

const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted'

export const useOnboardingStore = create((set, get) => ({
  // Detection state
  isFirstTimeUser: false,
  hasChecked: false,

  // Check on app init
  checkFirstTimeUser: () => {
    const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED_KEY)
    const isFirstTime = onboardingCompleted !== 'true'

    set({
      isFirstTimeUser: isFirstTime,
      hasChecked: true,
    })

    return isFirstTime
  },

  // Mark as completed
  markOnboardingComplete: () => {
    try {
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true')
      set({ isFirstTimeUser: false })
    } catch (e) {
      // Handle QuotaExceededError or other localStorage errors
      console.warn('Failed to save onboarding state to localStorage:', e)
      // Still update in-memory state so UX continues working
      set({ isFirstTimeUser: false })
    }
  },

  // Reset (for testing)
  resetOnboarding: () => {
    try {
      localStorage.removeItem(ONBOARDING_COMPLETED_KEY)
      set({ isFirstTimeUser: true, hasChecked: false })
    } catch (e) {
      console.warn('Failed to reset onboarding state from localStorage:', e)
      set({ isFirstTimeUser: true, hasChecked: false })
    }
  },
}))

import { create } from 'zustand'

const AUTH_COMPLETED_KEY = 'authCompleted'

export const useAuthStore = create((set, get) => ({
  // State
  isClientAuthenticated: false,
  passcodeError: null,

  // Actions
  setClientAuthenticated: (isAuthenticated) =>
    set({ isClientAuthenticated: isAuthenticated }),

  validatePasscode: (passcode) => {
    const expectedPasscode = import.meta.env.VITE_PASSCODE

    // Fail closed: empty/undefined passcode in env means auth cannot succeed
    if (!expectedPasscode || expectedPasscode.trim() === '') {
      console.warn('VITE_PASSCODE is not configured')
      set({ passcodeError: 'Mật khẩu không đúng' })
      return false
    }

    const isValid = passcode === expectedPasscode

    if (isValid) {
      // Set authenticated state
      set({ isClientAuthenticated: true, passcodeError: null })
      // Persist to localStorage
      localStorage.setItem(AUTH_COMPLETED_KEY, 'true')
      return true
    } else {
      // Set error (component will handle i18n translation and input clearing)
      set({ passcodeError: 'error' })
      return false
    }
  },

  clearError: () => set({ passcodeError: null }),

  // Check if user was previously authenticated
  checkPersistedAuth: () => {
    const wasAuthenticated = localStorage.getItem(AUTH_COMPLETED_KEY) === 'true'
    if (wasAuthenticated) {
      set({ isClientAuthenticated: true })
    }
    return wasAuthenticated
  },

  // Logout (for testing/debugging)
  logout: () => {
    localStorage.removeItem(AUTH_COMPLETED_KEY)
    set({ isClientAuthenticated: false })
  },
}))

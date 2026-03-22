import { create } from 'zustand'

const AUTH_COMPLETED_KEY = 'authCompleted'
const AUTH_ATTEMPTS_KEY = 'authAttempts'
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes in ms

// Helper: Get attempts data
function getAttempts() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_ATTEMPTS_KEY) || '{}')
  } catch {
    return {}
  }
}

// Helper: Save attempts data
function saveAttempts(attempts) {
  try {
    localStorage.setItem(AUTH_ATTEMPTS_KEY, JSON.stringify(attempts))
  } catch (e) {
    console.warn('Failed to save auth attempts:', e)
  }
}

// Check if locked out and return lockout info
export function checkLockout() {
  const attempts = getAttempts()
  if (attempts.lockoutUntil && Date.now() < attempts.lockoutUntil) {
    return {
      isLocked: true,
      lockoutUntil: attempts.lockoutUntil,
      remainingTime: attempts.lockoutUntil - Date.now()
    }
  }
  // Reset if lockout expired
  if (attempts.lockoutUntil && Date.now() >= attempts.lockoutUntil) {
    saveAttempts({ count: 0, firstAttempt: null, lockoutUntil: null })
  }
  return { isLocked: false }
}

// Record failed attempt
export function recordFailedAttempt() {
  const attempts = getAttempts()
  const now = Date.now()

  if (!attempts.firstAttempt) {
    attempts.firstAttempt = now
  }

  attempts.count = (attempts.count || 0) + 1

  if (attempts.count >= MAX_ATTEMPTS) {
    attempts.lockoutUntil = now + LOCKOUT_DURATION
  }

  saveAttempts(attempts)
  return attempts.count >= MAX_ATTEMPTS
}

// Reset on success
export function resetAttempts() {
  localStorage.removeItem(AUTH_ATTEMPTS_KEY)
}

export const useAuthStore = create((set, get) => ({
  // State
  isClientAuthenticated: false,
  passcodeError: null,
  isLockedOut: false,
  lockoutRemaining: null,

  // Actions
  setClientAuthenticated: (isAuthenticated) =>
    set({ isClientAuthenticated: isAuthenticated }),

  validatePasscode: (passcode) => {
    // Check lockout first
    const lockout = checkLockout()
    if (lockout.isLocked) {
      set({
        isLockedOut: true,
        lockoutRemaining: lockout.remainingTime,
        passcodeError: 'auth.lockedOut'
      })
      return false
    }

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
      set({ isClientAuthenticated: true, passcodeError: null, isLockedOut: false, lockoutRemaining: null })
      // Persist to localStorage
      localStorage.setItem(AUTH_COMPLETED_KEY, 'true')
      // Reset attempt counter
      resetAttempts()
      return true
    } else {
      // Record failed attempt
      const justLocked = recordFailedAttempt()

      if (justLocked) {
        set({
          isLockedOut: true,
          lockoutRemaining: LOCKOUT_DURATION,
          passcodeError: 'auth.lockedOut'
        })
      } else {
        set({ passcodeError: 'error' })
      }
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
    resetAttempts()
    set({ isClientAuthenticated: false })
  },
}))

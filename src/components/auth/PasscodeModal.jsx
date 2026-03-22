import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../stores/authStore'
import '../../sass/components/auth/passcode-modal.scss'

export const PasscodeModal = () => {
  const { t } = useTranslation()
  const [passcode, setPasscode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    isClientAuthenticated,
    passcodeError,
    validatePasscode,
    clearError,
    checkPersistedAuth,
  } = useAuthStore()

  // Check for persisted auth on mount
  useEffect(() => {
    checkPersistedAuth()
  }, [])

  // If already authenticated, don't render modal
  if (isClientAuthenticated) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const isValid = validatePasscode(passcode)

    if (isValid) {
      setPasscode('')
    } else {
      // Clear input on incorrect passcode (per AC requirement)
      setPasscode('')
    }

    setIsSubmitting(false)
  }

  const handleInputChange = (e) => {
    setPasscode(e.target.value)
    if (passcodeError) {
      clearError()
    }
  }

  // Get translated error message
  const errorMessage = passcodeError === 'error' ? t('auth.passcode.error') : passcodeError

  return (
    <div className="passcode-modal-overlay" aria-modal="true" role="dialog">
      <div className="passcode-modal">
        <div className="passcode-modal-header">
          <h2>{t('auth.passcode.title')}</h2>
          <p className="passcode-modal-subtitle">
            {t('auth.passcode.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="passcode-modal-form">
          <div className="passcode-input-group">
            <input
              type="password"
              value={passcode}
              onChange={handleInputChange}
              placeholder={t('auth.passcode.placeholder')}
              className="passcode-input"
              autoFocus
              disabled={isSubmitting}
              aria-label={t('auth.passcode.label')}
              autoComplete="off"
            />
          </div>

          {passcodeError && (
            <div className="passcode-error" role="alert">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="passcode-submit-button"
            disabled={isSubmitting || !passcode.trim()}
          >
            {isSubmitting ? t('auth.passcode.verifying') : t('auth.passcode.submit')}
          </button>
        </form>

        <div className="passcode-modal-footer">
          <p className="passcode-help-text">
            {t('auth.passcode.help')}
          </p>
        </div>
      </div>
    </div>
  )
}

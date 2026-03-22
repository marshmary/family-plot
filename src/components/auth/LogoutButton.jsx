import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../stores/authStore'
import './LogoutButton.scss'

export const LogoutButton = () => {
  const { t } = useTranslation()
  const { logout, isClientAuthEnabled } = useAuthStore()

  const handleLogout = () => {
    // Clear client-side auth state
    logout()

    // For Netlify Basic Auth, we can't programmatically clear browser cache
    // But we can reload to trigger the auth prompt again
    if (window.location.href) {
      // Force reload to trigger Netlify auth prompt
      // Note: This won't actually clear browser's cached credentials
      // User would need to manually clear browser data for full logout
      window.location.reload()
    }
  }

  // Only show if client-side auth is enabled
  if (!isClientAuthEnabled) {
    return null
  }

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
      aria-label={t('auth.logout.label')}
    >
      {t('auth.logout.button')}
    </button>
  )
}

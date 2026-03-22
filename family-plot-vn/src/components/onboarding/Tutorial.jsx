import React, { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOnboardingStore } from '../../stores/onboardingStore'
import '../../sass/components/onboarding/_tutorial.scss'

export const Tutorial = () => {
  const { t } = useTranslation()
  const { markOnboardingComplete } = useOnboardingStore()
  const modalRef = useRef(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  const handleComplete = () => {
    markOnboardingComplete()
  }

  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    const checkScroll = () => {
      const hasScrollableContent = modal.scrollHeight > modal.clientHeight
      const isNotAtBottom = modal.scrollTop + modal.clientHeight < modal.scrollHeight
      setShowScrollIndicator(hasScrollableContent && isNotAtBottom)
    }

    checkScroll()
    modal.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      modal.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="tutorial-close-button" onClick={handleComplete}>×</button>

        <div className="tutorial-modal-header">
          <h2>{t('tutorial.title')}</h2>
          <p className="tutorial-subtitle">{t('tutorial.subtitle')}</p>
        </div>

        <div className="tutorial-steps">
          {/* Step 1: Rotate */}
          <div className="tutorial-step">
            <div className="step-icon">🔄</div>
            <div className="step-content">
              <h3>{t('tutorial.rotate.title')}</h3>
              <p>{t('tutorial.rotate.description')}</p>
              <span className="step-hint">{t('tutorial.rotate.hint')}</span>
            </div>
          </div>

          {/* Step 2: Zoom */}
          <div className="tutorial-step">
            <div className="step-icon">🔍</div>
            <div className="step-content">
              <h3>{t('tutorial.zoom.title')}</h3>
              <p>{t('tutorial.zoom.description')}</p>
              <span className="step-hint">{t('tutorial.zoom.hint')}</span>
            </div>
          </div>

          {/* Step 3: Pan */}
          <div className="tutorial-step">
            <div className="step-icon">✋</div>
            <div className="step-content">
              <h3>{t('tutorial.pan.title')}</h3>
              <p>{t('tutorial.pan.description')}</p>
              <span className="step-hint">{t('tutorial.pan.hint')}</span>
            </div>
          </div>

          {/* Step 4: Select Person */}
          <div className="tutorial-step">
            <div className="step-icon">👤</div>
            <div className="step-content">
              <h3>{t('tutorial.select.title')}</h3>
              <p>{t('tutorial.select.description')}</p>
              <span className="step-hint">{t('tutorial.select.hint')}</span>
            </div>
          </div>

          {/* Step 5: Search */}
          <div className="tutorial-step">
            <div className="step-icon">🔎</div>
            <div className="step-content">
              <h3>{t('tutorial.search.title')}</h3>
              <p>{t('tutorial.search.description')}</p>
              <span className="step-hint">{t('tutorial.search.hint')}</span>
            </div>
          </div>
        </div>

        {showScrollIndicator && (
          <div className="tutorial-scroll-indicator">
            <span className="scroll-arrow">↓</span>
            <span className="scroll-text">Scroll for more</span>
          </div>
        )}

        <button className="tutorial-got-it-button" onClick={handleComplete}>
          {t('tutorial.gotIt')}
        </button>
      </div>
    </div>
  )
}

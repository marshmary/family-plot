import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import faviconSvg from "./img/favicon.svg";
import { ThemeToggle } from "./components/common/ThemeToggle";
import { LanguageSwitcher } from "./components/common/LanguageSwitcher";
import familyTreeFile from "./gedcoms/family-tree.ged";

const Load = ({
  handleUpload,
  startNewPlot,
  showError,
  readFile,
  isAuthenticated,
}) => {
  const { t } = useTranslation();
  const [showGedcomModal, setShowGedcomModal] = useState(false);
  const hasTriggeredAutoLoad = useRef(false);

  useEffect(() => {
    // Only auto-trigger if authenticated
    if (!isAuthenticated) return;

    // Auto-trigger "Discover Your Roots" on first page load (once per session)
    const hasViewedDiscover = sessionStorage.getItem('familyTreeDiscoverClicked');

    if (!hasViewedDiscover && !hasTriggeredAutoLoad.current) {
      hasTriggeredAutoLoad.current = true;
      setTimeout(() => {
        sessionStorage.setItem('familyTreeDiscoverClicked', 'true');
        readFile(familyTreeFile);
      }, 500);
    }
  }, [isAuthenticated, readFile]);

  return (
    <>
      <div id="load">
        <div>
          <section className="title-area">
            <img
              src={faviconSvg}
              alt="family plot logo"
              className="homepage-logo"
            />
            <h1>{t('load.title')}</h1>
            <p>{t('app.subtitle')}</p>
          </section>

          <section className="actions-area">
            {/* Primary CTA - Discover Your Roots */}
            <div
              className={`action-card action-card-discover ${!isAuthenticated ? 'action-card-disabled' : ''}`}
              onClick={() => isAuthenticated && readFile(familyTreeFile)}
            >
              <span className="material-icons-outlined action-icon action-icon-discover">
                auto_graph
              </span>
              <h2>{t('home.discoverRoots')}</h2>
              <p>{t('home.discoverRootsDesc')}</p>
            </div>

            <div
              className={`action-card ${!isAuthenticated ? 'action-card-disabled' : ''}`}
              onClick={() => isAuthenticated && startNewPlot()}
            >
              <span className="material-icons-outlined action-icon">
                add_circle_outline
              </span>
              <h2>{t('load.startNew.title')}</h2>
              <p>{t('load.startNew.description')}</p>
            </div>

            <label className={`action-card ${!isAuthenticated ? 'action-card-disabled' : ''}`} htmlFor="file-input">
              <span className="material-icons-outlined action-icon">
                upload_file
              </span>
              <h2>{t('load.upload.title')}</h2>
              <p className="upload-desc">
                {t('load.upload.description')}
                <button
                  className="info-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowGedcomModal(true);
                  }}
                  aria-label={t('load.upload.gedcomInfo')}
                >
                  <span className="material-icons-outlined">info</span>
                </button>
              </p>
              <input
                id="file-input"
                type="file"
                name="gedFile"
                onChange={(e) => isAuthenticated && handleUpload(e)}
                disabled={!isAuthenticated}
              />
            </label>
          </section>

          {showError && (
            <p className="error">
              {t('load.error')}
            </p>
          )}

          <section className="links-area">
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href="https://github.com/marshmary/family-plot"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>
      </div>

      {showGedcomModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowGedcomModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowGedcomModal(false)}
            >
              <span className="material-icons-outlined">close</span>
            </button>
            <h2>{t('gedcomModal.title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('gedcomModal.description') }} />
            <p dangerouslySetInnerHTML={{ __html: t('gedcomModal.fileFormat') }} />

            <h3>{t('gedcomModal.howToCreate')}</h3>
            <p>
              {t('gedcomModal.instructions')}
            </p>

            <div className="gedcom-programs">
              <div className="program">
                <strong>Ancestry</strong>
                <p>{t('gedcomModal.programs.ancestry')}</p>
              </div>

              <div className="program">
                <strong>MyHeritage</strong>
                <p>{t('gedcomModal.programs.myHeritage')}</p>
              </div>

              <div className="program">
                <strong>FamilySearch</strong>
                <p>{t('gedcomModal.programs.familySearch')}</p>
              </div>

              <div className="program">
                <strong>Legacy Family Tree</strong>
                <p>{t('gedcomModal.programs.legacyFamilyTree')}</p>
              </div>

              <div className="program">
                <strong>Gramps</strong>
                <p>{t('gedcomModal.programs.gramps')}</p>
              </div>

              <div className="program">
                <strong>RootsMagic</strong>
                <p>{t('gedcomModal.programs.rootsMagic')}</p>
              </div>
            </div>

            <p className="modal-note">
              {t('gedcomModal.note')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Load;

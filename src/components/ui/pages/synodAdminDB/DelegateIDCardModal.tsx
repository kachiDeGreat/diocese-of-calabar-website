import React, { useState, useEffect } from "react";
import styles from "./SynodAdminDashboard.module.css";
import ImageWithSpinner from "./ImageWithSpinner";
import { Delegate } from "./types";

interface DelegateIDCardModalProps {
  selectedDelegate: Delegate;
  setSelectedDelegate: (delegate: Delegate | null) => void;
  downloadIDCard: () => void;
  isGeneratingPDF: boolean;
}

export default function DelegateIDCardModal({
  selectedDelegate,
  setSelectedDelegate,
  downloadIDCard,
  isGeneratingPDF,
}: DelegateIDCardModalProps) {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [isWatermarkLoaded, setIsWatermarkLoaded] = useState(false);

  useEffect(() => {
    setIsLogoLoaded(false);
    setIsPhotoLoaded(false);
    setIsWatermarkLoaded(false);
  }, [selectedDelegate]);

  const isReadyToDownload =
    isLogoLoaded && isPhotoLoaded && isWatermarkLoaded && !isGeneratingPDF;

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setSelectedDelegate(null)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeModal}
          onClick={() => setSelectedDelegate(null)}
        >
          ✕
        </button>

        {/* Hidden image to track watermark loading for html2canvas */}
        <img
          src="https://dropimg.onyekachi.dev/xfljke7ynfyzfte6symi"
          alt="watermark-preload"
          style={{ display: "none" }}
          onLoad={() => setIsWatermarkLoaded(true)}
          onError={() => setIsWatermarkLoaded(true)}
          crossOrigin="anonymous"
        />

        <div className={styles.idCardPreviewContainer}>
          <div
            className={styles.idCard}
            id="delegate-id-card"
            style={{ height: "auto", minHeight: "560px" }}
          >
            <div className={styles.watermarkLogo}></div>

            <div className={styles.idCardHeader}>
              <img
                src="/favicon.png"
                alt="Church Logo"
                style={{ width: "40px", height: "auto", marginBottom: "4px" }}
                crossOrigin="anonymous"
                onLoad={() => setIsLogoLoaded(true)}
                onError={() => setIsLogoLoaded(true)}
              />
              <span className={styles.idCardDiocese}>DIOCESE OF CALABAR</span>
              <span className={styles.idCardCommunion}>
                (ANGLICAN COMMUNION)
              </span>
              <h3 className={styles.idCardTitle}>SYNOD 2026</h3>
            </div>

            <div className={styles.idCardProfileWrapper}>
              <ImageWithSpinner
                id="id-card-delegate-photo"
                crossOrigin="anonymous"
                src={
                  selectedDelegate.photoUrl || "https://via.placeholder.com/150"
                }
                alt="Delegate"
                className={styles.idCardPhoto}
                onImageLoad={() => setIsPhotoLoaded(true)}
              />
            </div>

            <div className={styles.idCardBody}>
              <h2 className={styles.idCardName}>
                {selectedDelegate.title} {selectedDelegate.fullName}
              </h2>
              <p className={styles.idCardRole}>
                {selectedDelegate.designation}
              </p>

              <div className={styles.idThemeCard}>
                <div className={styles.idThemeTop}>
                  <span className={styles.idLabel}>THEME</span>
                  <div className={styles.idUnderlineCenter}></div>
                  <strong className={styles.idThemeTitle}>
                    "Not Offended In Me"
                  </strong>
                  <span className={styles.idThemeSub}>Matthew 11:6</span>
                </div>
                <div className={styles.idThemeBottom}>
                  <div className={styles.idThemeBottomLeft}>
                    <span className={styles.idLabel}>DATES</span>
                    <div className={styles.idUnderlineLeft}></div>
                    <strong className={styles.idValue}>
                      8th - 12th
                      <br />
                      July, 2026
                    </strong>
                  </div>
                  <div className={styles.idThemeBottomRight}>
                    <span className={styles.idLabel}>VENUE</span>
                    <div className={styles.idUnderlineLeft}></div>
                    <strong className={styles.idValue}>
                      Cathedral Church of Holy Trinity,
                      <br />
                      Calabar, CRS.
                    </strong>
                  </div>
                </div>
              </div>

              <div className={styles.idDetailsGrid}>
                <div className={styles.idDetailBox}>
                  <span className={styles.idDetailLabel}>ARCHDEACONRY</span>
                  <strong className={styles.idDetailValue}>
                    {selectedDelegate.archdeaconry}
                  </strong>
                </div>
                <div className={styles.idDetailBox}>
                  <span className={styles.idDetailLabel}>CHURCH/PARISH</span>
                  <strong className={styles.idDetailValue}>
                    {selectedDelegate.church}
                  </strong>
                </div>
                <div className={styles.idDetailBox}>
                  <span className={styles.idDetailLabel}>PHONE NUMBER</span>
                  <strong className={styles.idDetailValue}>
                    {selectedDelegate.phone || "N/A"}
                  </strong>
                </div>
                <div className={styles.idDetailBox}>
                  <span className={styles.idDetailLabel}>UNIQUE ID</span>
                  <strong
                    className={`${styles.idDetailValue} ${styles.idDetailHighlight}`}
                  >
                    {selectedDelegate.delegateId}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button
            className={styles.printBtn}
            onClick={downloadIDCard}
            disabled={!isReadyToDownload}
          >
            {isGeneratingPDF ? (
              "Generating PDF..."
            ) : !isReadyToDownload ? (
              "Loading ID Card Images..."
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                Print / Save CR80 ID Card
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

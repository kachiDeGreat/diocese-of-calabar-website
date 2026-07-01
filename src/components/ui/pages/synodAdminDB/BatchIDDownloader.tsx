import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import styles from "./BatchIDDownloader.module.css"; // The new modular CSS
import dashStyles from "./SynodAdminDashboard.module.css"; // Used ONLY for the hidden ID Card layout
import { Delegate } from "./types";

interface BatchIDDownloaderProps {
  delegates: Delegate[];
  onClose: () => void;
}

export default function BatchIDDownloader({
  delegates,
  onClose,
}: BatchIDDownloaderProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredDelegates, setFilteredDelegates] = useState<Delegate[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [processingDelegate, setProcessingDelegate] = useState<Delegate | null>(
    null,
  );

  const handleFilter = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    const matched = delegates.filter((del) => {
      if (!del.completedAt) return false;
      const delDate = new Date(del.completedAt).getTime();
      return delDate >= start && delDate <= end;
    });

    setFilteredDelegates(matched);
    setSelectedIds(new Set(matched.map((d) => d.id)));

    if (matched.length === 0) {
      toast.error("No delegates found in this date range.");
    }
  };

  const handleToggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredDelegates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredDelegates.map((d) => d.id)));
    }
  };

  const selectedDelegatesList = useMemo(() => {
    return filteredDelegates.filter((d) => selectedIds.has(d.id));
  }, [filteredDelegates, selectedIds]);

  const startBatchDownload = async () => {
    if (selectedDelegatesList.length === 0) return;

    setIsGenerating(true);
    setProgress({ current: 0, total: selectedDelegatesList.length });

    const zip = new JSZip();

    for (let i = 0; i < selectedDelegatesList.length; i++) {
      const del = selectedDelegatesList[i];
      setProcessingDelegate(del);
      setProgress({ current: i + 1, total: selectedDelegatesList.length });

      await new Promise((resolve) => setTimeout(resolve, 800));

      const cardElement = document.getElementById("hidden-batch-id-card");
      if (cardElement) {
        try {
          const canvas = await html2canvas(cardElement, {
            scale: 4,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
          });

          const imgDataUrl = canvas.toDataURL("image/png");
          const base64Data = imgDataUrl.split(",")[1];

          zip.file(`Synod_2026_ID_${del.delegateId}.png`, base64Data, {
            base64: true,
          });
        } catch (error) {
          console.error(`Failed to generate card for ${del.fullName}`, error);
        }
      }
    }

    toast.loading("Compressing images...", { id: "zip" });
    const zipBlob = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = `Synod_IDs_Batch_${new Date().getTime()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setProcessingDelegate(null);
    setIsGenerating(false);
    toast.success("Batch download complete!", { id: "zip" });
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={!isGenerating ? onClose : undefined}
    >
      <div
        className={styles.batchWideModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeModal}
          onClick={onClose}
          disabled={isGenerating}
        >
          ✕
        </button>

        <div className={styles.batchHeader}>
          <h2>Batch ID Card Downloader</h2>
          <p>
            Filter delegates, preview their ID cards, and download a ZIP file.
          </p>
        </div>

        <div className={styles.batchTwoColumnLayout}>
          <div className={styles.batchLeftColumn}>
            <div className={styles.batchControls}>
              <div className={styles.dateInputGroup}>
                <label>From Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={isGenerating}
                />
              </div>
              <div className={styles.dateInputGroup}>
                <label>To Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isGenerating}
                />
              </div>
              <button
                className={styles.filterBtn}
                onClick={handleFilter}
                disabled={isGenerating}
              >
                Filter
              </button>
            </div>

            {filteredDelegates.length > 0 && (
              <div className={styles.batchSelectionArea}>
                <div className={styles.resultsHeader}>
                  <span>
                    {selectedIds.size} of {filteredDelegates.length} selected
                  </span>
                  <button
                    onClick={handleSelectAll}
                    className={styles.textLinkBtn}
                    disabled={isGenerating}
                  >
                    {selectedIds.size === filteredDelegates.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                </div>

                <div className={styles.delegateListScroll}>
                  {filteredDelegates.map((del) => (
                    <label key={del.id} className={styles.delegateCheckboxRow}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(del.id)}
                        onChange={() => handleToggleSelection(del.id)}
                        disabled={isGenerating}
                      />
                      <div className={styles.delegateRowInfo}>
                        <strong>{del.fullName}</strong>
                        <span>{del.delegateId}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.batchRightColumn}>
            <div className={styles.previewHeaderRow}>
              <h3>Live Previews</h3>
              {selectedIds.size > 0 && <span>Scroll to view all</span>}
            </div>

            {selectedIds.size === 0 ? (
              <div className={styles.emptyPreviewState}>
                <p>
                  Select delegates on the left to see their ID card previews
                  here.
                </p>
              </div>
            ) : (
              <div className={styles.previewGrid}>
                {selectedDelegatesList.map((del) => (
                  <div key={del.id} className={styles.miniIdCard}>
                    <div className={styles.miniIdTop}></div>
                    <img
                      src={del.photoUrl || "https://via.placeholder.com/150"}
                      alt={del.fullName}
                      className={styles.miniIdPhoto}
                      crossOrigin="anonymous"
                    />
                    <div className={styles.miniIdBody}>
                      <h4 className={styles.miniIdName}>{del.fullName}</h4>
                      <p className={styles.miniIdRole}>{del.designation}</p>
                      <span className={styles.miniIdCode}>
                        {del.delegateId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.batchFooterFull}>
          {isGenerating && (
            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressBarFill}
                style={{
                  width: `${(progress.current / progress.total) * 100}%`,
                }}
              ></div>
            </div>
          )}
          <button
            className={styles.payBtn}
            onClick={startBatchDownload}
            disabled={isGenerating || selectedIds.size === 0}
          >
            {isGenerating
              ? `Generating image ${progress.current} of ${progress.total}...`
              : `Download ${selectedIds.size} Images (ZIP)`}
          </button>
        </div>

        {/* HIDDEN RENDER NODE FOR HTML2CANVAS (Uses dashStyles for perfect matching) */}
        <div
          style={{
            position: "fixed",
            left: "-9999px",
            top: "0",
            width: "400px",
            pointerEvents: "none",
          }}
        >
          {processingDelegate && (
            <div
              className={dashStyles.idCardPreviewContainer}
              style={{ padding: "20px" }}
            >
              <div
                className={dashStyles.idCard}
                id="hidden-batch-id-card"
                style={{
                  height: "auto",
                  minHeight: "560px",
                  width: "100%",
                  position: "relative",
                }}
              >
                <div className={dashStyles.watermarkLogo}></div>
                <div className={dashStyles.idCardHeader}>
                  <img
                    src="/favicon.png"
                    alt="Church Logo"
                    style={{
                      width: "40px",
                      height: "auto",
                      marginBottom: "4px",
                    }}
                    crossOrigin="anonymous"
                  />
                  <span className={dashStyles.idCardDiocese}>
                    DIOCESE OF CALABAR
                  </span>
                  <span className={dashStyles.idCardCommunion}>
                    (ANGLICAN COMMUNION)
                  </span>
                  <h3 className={dashStyles.idCardTitle}>SYNOD 2026</h3>
                </div>

                <div
                  className={dashStyles.idCardProfileWrapper}
                  style={{
                    width: "150px",
                    height: "150px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 10,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <img
                    crossOrigin="anonymous"
                    src={
                      processingDelegate.photoUrl ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Delegate"
                    className={dashStyles.idCardPhoto}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                    }}
                  />
                </div>

                <div className={dashStyles.idCardBody}>
                  <h2 className={dashStyles.idCardName}>
                    {processingDelegate.title} {processingDelegate.fullName}
                  </h2>
                  <p className={dashStyles.idCardRole}>
                    {processingDelegate.designation}
                  </p>
                  <div className={dashStyles.idThemeCard}>
                    <div className={dashStyles.idThemeTop}>
                      <span className={dashStyles.idLabel}>THEME</span>
                      <div className={dashStyles.idUnderlineCenter}></div>
                      <strong className={dashStyles.idThemeTitle}>
                        "Not Offended In Me"
                      </strong>
                      <span className={dashStyles.idThemeSub}>
                        Matthew 11:6
                      </span>
                    </div>
                    <div className={dashStyles.idThemeBottom}>
                      <div className={dashStyles.idThemeBottomLeft}>
                        <span className={dashStyles.idLabel}>DATES</span>
                        <div className={dashStyles.idUnderlineLeft}></div>
                        <strong className={dashStyles.idValue}>
                          8th - 12th
                          <br />
                          July, 2026
                        </strong>
                      </div>
                      <div className={dashStyles.idThemeBottomRight}>
                        <span className={dashStyles.idLabel}>VENUE</span>
                        <div className={dashStyles.idUnderlineLeft}></div>
                        <strong className={dashStyles.idValue}>
                          Cathedral Church of Holy Trinity,
                          <br />
                          Calabar, CRS.
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className={dashStyles.idDetailsGrid}>
                    <div className={dashStyles.idDetailBox}>
                      <span className={dashStyles.idDetailLabel}>
                        ARCHDEACONRY
                      </span>
                      <strong className={dashStyles.idDetailValue}>
                        {processingDelegate.archdeaconry}
                      </strong>
                    </div>
                    <div className={dashStyles.idDetailBox}>
                      <span className={dashStyles.idDetailLabel}>
                        CHURCH/PARISH
                      </span>
                      <strong className={dashStyles.idDetailValue}>
                        {processingDelegate.church}
                      </strong>
                    </div>
                    <div className={dashStyles.idDetailBox}>
                      <span className={dashStyles.idDetailLabel}>
                        PHONE NUMBER
                      </span>
                      <strong className={dashStyles.idDetailValue}>
                        {processingDelegate.phone || "N/A"}
                      </strong>
                    </div>
                    <div className={dashStyles.idDetailBox}>
                      <span className={dashStyles.idDetailLabel}>
                        UNIQUE ID
                      </span>
                      <strong
                        className={`${dashStyles.idDetailValue} ${dashStyles.idDetailHighlight}`}
                      >
                        {processingDelegate.delegateId}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

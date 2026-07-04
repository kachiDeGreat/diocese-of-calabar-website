import React from "react";
import styles from "./SynodAdminDashboard.module.css";

interface SearchControlsProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  searchMode: "name_phone" | "reference";
  setSearchMode: (val: "name_phone" | "reference") => void;
}

export default function SearchControls({
  searchQuery,
  setSearchQuery,
  searchMode,
  setSearchMode,
}: SearchControlsProps) {
  return (
    <div className={styles.searchControlsWrapper}>
      <div className={styles.searchBarContainer}>
        <svg
          className={styles.searchIcon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder={
            searchMode === "name_phone"
              ? "Search by Name or Phone Number..."
              : "Search by Paystack Reference ID..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.searchModeContainer}>
        <select
          value={searchMode}
          onChange={(e) =>
            setSearchMode(e.target.value as "name_phone" | "reference")
          }
          className={styles.searchModeSelect}
        >
          <option value="name_phone">Mode: Name or Phone</option>
          <option value="reference">Mode: Payment Ref ID</option>
        </select>
      </div>
    </div>
  );
}

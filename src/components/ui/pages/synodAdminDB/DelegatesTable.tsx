import React from "react";
import styles from "./SynodAdminDashboard.module.css";
import ImageWithSpinner from "./ImageWithSpinner";
import { Delegate } from "./types";

interface DelegatesTableProps {
  delegates: Delegate[];
  currentDelegates: Delegate[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  fetchDelegates: () => void;
  handleDeleteAll: () => void;
  handleDelete: (id: string, name: string) => void;
  setSelectedDelegate: (delegate: Delegate | null) => void;
}

export default function DelegatesTable({
  delegates,
  currentDelegates,
  currentPage,
  setCurrentPage,
  totalPages,
  fetchDelegates,
  handleDeleteAll,
  handleDelete,
  setSelectedDelegate,
}: DelegatesTableProps) {
  return (
    <div className={styles.tableSection}>
      <div className={styles.tableHeader}>
        <h2>Recent Registrations</h2>
        <div className={styles.headerActions}>
          <button onClick={fetchDelegates} className={styles.refreshBtn}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            Refresh
          </button>
          <button
            onClick={handleDeleteAll}
            className={styles.deleteAllBtn}
            disabled={delegates.length === 0}
          >
            Danger: Delete All
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Unique ID</th>
              <th>Full Name</th>
              <th>Designation</th>
              <th>Archdeaconry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDelegates.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  No delegates registered yet.
                </td>
              </tr>
            ) : (
              currentDelegates.map((del) => (
                <tr key={del.id}>
                  <td>
                    <ImageWithSpinner
                      src={del.photoUrl || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className={styles.tableAvatar}
                    />
                  </td>
                  <td>
                    <span className={styles.tagId}>{del.delegateId}</span>
                  </td>
                  <td>
                    <strong>
                      {del.title} {del.fullName}
                    </strong>
                    <br />
                    <span className={styles.subEmail}>{del.email}</span>
                    <br />
                    <span className={styles.subEmail}>
                      {del.phone || "No phone provided"}
                    </span>
                  </td>
                  <td>{del.designation}</td>
                  <td>{del.archdeaconry}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => setSelectedDelegate(del)}
                        className={styles.viewBtn}
                      >
                        View ID
                      </button>
                      <button
                        onClick={() => handleDelete(del.id, del.fullName)}
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1.5rem",
            paddingBottom: "1rem",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: currentPage === 1 ? "#f9fafb" : "#ffffff",
              color: currentPage === 1 ? "#9ca3af" : "#374151",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontWeight: 500,
            }}
          >
            Previous
          </button>
          <span
            style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: 500 }}
          >
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: currentPage === totalPages ? "#f9fafb" : "#ffffff",
              color: currentPage === totalPages ? "#9ca3af" : "#374151",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              fontWeight: 500,
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

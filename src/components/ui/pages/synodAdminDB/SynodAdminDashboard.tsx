import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./SynodAdminDashboard.module.css";
import { db } from "../../../../firebase";
import SEO from "../../page-components/SEO";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

// Define the shape of our data
interface Delegate {
  id: string; // Firestore document ID
  title: string;
  fullName: string;
  email: string;
  phone?: string; // Phone number included
  archdeaconry: string;
  church: string;
  designation: string;
  delegateId: string;
  photoUrl: string;
  amountPaid: number;
  completedAt: string;
}

export default function SynodAdminDashboard() {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(
    null,
  );

  const navigate = useNavigate();

  // Fetch data from Firestore
  const fetchDelegates = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(db, "synod_registrations"),
      );
      const data: Delegate[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Delegate);
      });
      // Sort by newest first
      data.sort(
        (a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      );
      setDelegates(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDelegates();
  }, []);

  // Calculate Metrics
  const totalRevenue = delegates.reduce(
    (sum, del) => sum + (del.amountPaid || 0),
    0,
  );
  const totalDelegates = delegates.length;

  // Archdeaconry Breakdown
  const archBreakdown = delegates.reduce(
    (acc, del) => {
      acc[del.archdeaconry] = (acc[del.archdeaconry] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Delete Single Delegate
  const handleDelete = async (id: string, name: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This cannot be undone.`,
      )
    ) {
      try {
        await deleteDoc(doc(db, "synod_registrations", id));
        setDelegates(delegates.filter((d) => d.id !== id));
        toast.success("Delegate deleted successfully.");
      } catch (error) {
        toast.error("Error deleting delegate.");
      }
    }
  };

  // Delete All (Wipe Database)
  const handleDeleteAll = async () => {
    const confirmText = prompt(
      "Type 'DELETE ALL' to confirm wiping the entire registration database.",
    );
    if (confirmText === "DELETE ALL") {
      try {
        setIsLoading(true);
        // Delete each document one by one
        for (const delegate of delegates) {
          await deleteDoc(doc(db, "synod_registrations", delegate.id));
        }
        setDelegates([]);
        toast.success("All registrations have been deleted.");
      } catch (error) {
        toast.error("Error wiping database.");
      } finally {
        setIsLoading(false);
      }
    } else if (confirmText) {
      toast.error("Action cancelled: Text did not match.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      sessionStorage.removeItem("synodAdminAuth");
      navigate("/synod-2026-admin");
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  return (
    <div className={styles.adminWrapper}>
      <SEO title="Dashboard | Synod Admin" description="Admin Dashboard" />
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#0e9f6e",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#c52810",
              color: "#fff",
            },
          },
        }}
      />

      {/* Top Navigation */}
      <header className={styles.adminHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.logoBox}>Diocese of Calabar</div>
          <h1>Synod 2026 Operations</h1>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Secure Logout
        </button>
      </header>

      {isLoading ? (
        <div className={styles.loadingState}>Loading encrypted data...</div>
      ) : (
        <main className={styles.mainContent}>
          {/* METRICS GRID */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <h3>Total Revenue</h3>
              <p className={styles.revenueText}>
                ₦{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className={styles.metricCard}>
              <h3>Registered Delegates</h3>
              <p className={styles.countText}>{totalDelegates}</p>
            </div>
            <div className={`${styles.metricCard} ${styles.breakdownCard}`}>
              <h3>Archdeaconry Breakdown</h3>
              <ul className={styles.breakdownList}>
                {Object.entries(archBreakdown).map(([arch, count]) => (
                  <li key={arch}>
                    <span>{arch || "Unknown"}</span>
                    <strong>{count}</strong>
                  </li>
                ))}
                {Object.keys(archBreakdown).length === 0 && (
                  <li>No data yet</li>
                )}
              </ul>
            </div>
          </div>

          {/* DATA TABLE SECTION */}
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
                  disabled={totalDelegates === 0}
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
                  {delegates.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={styles.emptyState}>
                        No delegates registered yet.
                      </td>
                    </tr>
                  ) : (
                    delegates.map((del) => (
                      <tr key={del.id}>
                        <td>
                          <img
                            src={
                              del.photoUrl || "https://via.placeholder.com/150"
                            }
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
                          {/* Display Phone Number in Table */}
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
          </div>
        </main>
      )}

      {/* ID CARD MODAL */}
      {selectedDelegate && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedDelegate(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModal}
              onClick={() => setSelectedDelegate(null)}
            >
              ✕
            </button>

            {/* The Printable ID Card */}
            <div className={styles.idCardWrapper} id="printable-id-card">
              <div className={styles.idCardHeader}>
                <small>DIOCESE OF CALABAR</small>
                <h3>SYNOD 2026</h3>
              </div>
              <div className={styles.idCardBody}>
                <div className={styles.idPhotoContainer}>
                  <img src={selectedDelegate.photoUrl} alt="Delegate" />
                </div>
                <div className={styles.idDetails}>
                  <h2>
                    {selectedDelegate.title} {selectedDelegate.fullName}
                  </h2>
                  <p className={styles.idDesignation}>
                    {selectedDelegate.designation}
                  </p>

                  <div className={styles.idGrid}>
                    <div className={styles.idItem}>
                      <span>Archdeaconry</span>
                      <strong>{selectedDelegate.archdeaconry}</strong>
                    </div>
                    <div className={styles.idItem}>
                      <span>Church/Parish</span>
                      <strong>{selectedDelegate.church}</strong>
                    </div>
                    {/* Added Phone Number to ID Card */}
                    <div className={styles.idItem}>
                      <span>Phone Number</span>
                      <strong>{selectedDelegate.phone || "N/A"}</strong>
                    </div>
                    <div className={styles.idItem}>
                      <span>Unique ID</span>
                      <strong className={styles.idHighlight}>
                        {selectedDelegate.delegateId}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.idCardFooter}>
                {selectedDelegate.archdeaconry} * {selectedDelegate.delegateId}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.printBtn}
                onClick={() => window.print()}
              >
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
                Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

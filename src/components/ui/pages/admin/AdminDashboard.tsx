import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { 
  Users, 
  FileText, 
  PlusCircle
} from "lucide-react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const coll = collection(db, "blogs");
        const snapshot = await getCountFromServer(coll);
        setBlogCount(snapshot.data().count);
      } catch (error) {
        console.error("Error fetching blog count:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogCount();
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Overview</h1>
          <p className={styles.subtitle}>Welcome back to the Diocese of Calabar portal.</p>
        </div>
        <Link to="/admin/blog/create" className={styles.primaryBtn}>
          <PlusCircle size={20} />
          <span>New Blog Post</span>
        </Link>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <FileText size={24} className={styles.statIcon} style={{ color: "#3b82f6" }} />
          </div>
          <div>
            <p className={styles.statLabel}>Total Blog Posts</p>
            <h3 className={styles.statValue}>{isLoading ? "..." : blogCount}</h3>
          </div>
        </div>

        {/* Removed dummy statistics for Delegates, Visitors, and Revenue */}
      </div>

      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <Link to="/admin/blog" className={styles.actionCard}>
            <div className={styles.actionIcon} style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}>
              <FileText size={24} />
            </div>
            <div className={styles.actionContent}>
              <h3>Manage Blog</h3>
              <p>Edit or delete existing blog posts.</p>
            </div>
          </Link>

          <Link to="/admin/synod" className={styles.actionCard}>
            <div className={styles.actionIcon} style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}>
              <Users size={24} />
            </div>
            <div className={styles.actionContent}>
              <h3>Synod 2027</h3>
              <p>Registration has not started yet.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

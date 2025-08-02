import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/LineLoader.module.css";

export default function LineLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(true);
  const location = useLocation();
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const completionTimeout = useRef<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setIsComplete(false);
    setProgress(0);

    // Clear any existing intervals/timeouts
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (completionTimeout.current) clearTimeout(completionTimeout.current);

    // Simulate faster progress
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (progressInterval.current) clearInterval(progressInterval.current);
          return prev;
        }
        // Faster initial progress, then slower
        const increment = prev < 30 ? Math.random() * 20 : Math.random() * 8;
        return Math.min(prev + increment, 90);
      });
    }, 100); // Faster interval

    // Auto-complete after a reasonable time if not manually completed
    completionTimeout.current = setTimeout(() => {
      completeLoading();
    }, 800); // Reduced from potentially longer times
  };

  const completeLoading = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (completionTimeout.current) clearTimeout(completionTimeout.current);

    setProgress(100);

    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsComplete(true);
      }, 100);
    }, 200); // Faster completion
  };

  // Handle route changes with React Router
  useEffect(() => {
    startLoading();

    // Complete loading after a short delay to simulate page load
    const timer = setTimeout(() => {
      completeLoading();
    }, 600); // Faster default completion

    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger on route change

  // Handle browser navigation and initial load
  useEffect(() => {
    const handlePopState = () => {
      startLoading();
      setTimeout(completeLoading, 600);
    };

    const handleLoad = () => {
      completeLoading();
    };

    // Handle initial page load
    if (document.readyState === "loading") {
      startLoading();
      window.addEventListener("load", handleLoad);
    } else {
      // Page already loaded
      setIsComplete(true);
    }

    // Handle browser back/forward buttons
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("load", handleLoad);
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (completionTimeout.current) clearTimeout(completionTimeout.current);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (completionTimeout.current) clearTimeout(completionTimeout.current);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={styles.pageOverlay}>
          <div className={styles.lineLoaderContainer}>
            <div
              className={styles.lineLoader}
              style={{
                width: `${progress}%`,
                transition: "width 0.1s ease-out",
              }}
            />
          </div>
        </div>
      )}
      <div
        className={`${styles.contentWrapper} ${
          !isComplete ? styles.blurContent : ""
        }`}
      >
        {/* This div will wrap your page content */}
      </div>
    </>
  );
}

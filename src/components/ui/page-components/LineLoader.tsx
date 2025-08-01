import { useEffect, useState } from "react";
import styles from "../styles/LineLoader.module.css";

export default function LineLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      setIsComplete(false);
      setProgress(0);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setIsComplete(true);
      }, 300);
    };

    // Simulate progress
    const interval = setInterval(() => {
      if (isLoading && progress < 90) {
        setProgress((prev) => prev + Math.random() * 10);
      }
    }, 200);

    // Listen to route changes
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      handleStart();
      return originalPushState.apply(window.history, args);
    };

    window.history.replaceState = function (...args) {
      handleStart();
      return originalReplaceState.apply(window.history, args);
    };

    window.addEventListener("popstate", handleStart);
    window.addEventListener("load", handleComplete);

    return () => {
      clearInterval(interval);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handleStart);
      window.removeEventListener("load", handleComplete);
    };
  }, [isLoading, progress]);

  return (
    <>
      {isLoading && (
        <div className={styles.pageOverlay}>
          <div className={styles.lineLoaderContainer}>
            <div
              className={styles.lineLoader}
              style={{ width: `${progress}%` }}
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

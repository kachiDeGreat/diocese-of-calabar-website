"use client";

import { useEffect, useState } from "react";
import { Images } from "../../Assets/assets";
import styles from "../styles/loading.module.css";

interface LoadingScreenProps {
  progress: number;
  onLoadingComplete: () => void;
}

function LoadingScreen({ progress, onLoadingComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const checkAllResourcesLoaded = async () => {
      try {
        // Wait for document to be ready
        if (document.readyState !== "complete") {
          await new Promise((resolve) => {
            const handler = () => {
              if (document.readyState === "complete") {
                document.removeEventListener("readystatechange", handler);
                resolve(true);
              }
            };
            document.addEventListener("readystatechange", handler);
          });
        }

        // Wait for fonts to load
        if ("fonts" in document) {
          await document.fonts.ready;
        }

        // Wait for images to load
        const images = document.querySelectorAll("img");
        const imagePromises = Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails to load
          });
        });
        await Promise.all(imagePromises);

        // Additional delay to ensure everything is rendered
        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 300);
      } catch (error) {
        console.error("Loading error:", error);
        // Fallback: complete loading after timeout
        setTimeout(() => {
          setIsComplete(true);
          onLoadingComplete();
        }, 3000);
      }
    };

    // Start checking after a minimum time
    const minLoadTime = setTimeout(() => {
      checkAllResourcesLoaded();
    }, 1000);

    return () => clearTimeout(minLoadTime);
  }, [onLoadingComplete]);

  return (
    <div
      className={`${styles.loadingScreen} ${isComplete ? styles.fadeOut : ""}`}
    >
      {/* Main Loading Content */}
      <div className={styles.loadingContent}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <img
              src={Images.logoCalabar || "/placeholder.svg"}
              alt="Diocese of calabar"
              className={styles.logo}
            />
          </div>
        </div>

        {/* Line Loader */}
        <div className={styles.loadingAnimation}>
          <div className={styles.lineLoader}>
            <div className={styles.loadingLine}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;

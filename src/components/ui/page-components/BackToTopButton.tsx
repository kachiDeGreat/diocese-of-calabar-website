import { useState, useEffect } from "react";
import styles from "../styles/BackToTopButton.module.css";
import { MoveUp } from "lucide-react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const brandColor = "#c52810";

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const throttledScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    window.addEventListener("scroll", throttledScroll());
    return () => window.removeEventListener("scroll", throttledScroll());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ""}`}>
      <button
        onClick={scrollToTop}
        className={styles.button}
        style={
          {
            backgroundColor: brandColor,
            "--pulse-color": `${brandColor}80`,
          } as React.CSSProperties
        }
        aria-label="Back to top"
      >
        <MoveUp className={styles.icon} />
      </button>
    </div>
  );
};

export default BackToTopButton;

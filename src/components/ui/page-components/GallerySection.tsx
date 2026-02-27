"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "../styles/gallery.module.css";
import Button from "./button";
import LazyImage from "./LazyImage";

interface GalleryItem {
  id: number;
  image: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://i.postimg.cc/Qd0q6GN4/image.png",
    category: "events",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/1XrFfwfC/image.png",
    category: "church",
  },
  {
    id: 3,
    image: "https://i.postimg.cc/g0hnx87V/image.png",
    category: "events",
  },
  {
    id: 4,
    image: "https://i.postimg.cc/85VsMs8q/image.png",
    category: "events",
  },
];

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const lightboxVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const lightboxContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    const currentIndex = galleryItems.findIndex(
      (item) => item.id === selectedImage.id,
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
    } else {
      newIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(galleryItems[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section className={styles.gallerySection}>
      <motion.div
        className={styles.backgroundOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span className={styles.headerSub} variants={fadeInUp}>
            GALLERY
          </motion.span>
          <motion.h1 className={styles.title} variants={fadeInUp}>
            Our Gallery
          </motion.h1>
          <motion.div
            className={styles.titleUnderline}
            variants={fadeInUp}
          />
        </motion.div>

        <motion.div
          className={styles.galleryGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className={styles.galleryCard}
              onClick={() => openLightbox(item)}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.imageContainer}>
                <LazyImage
                  src={item.image || "/placeholder.svg"}
                  alt="Gallery image"
                  className={styles.galleryImage}
                />
                <motion.div
                  className={styles.overlay}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.overlayContent}>
                    <motion.svg
                      className={styles.zoomIcon}
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="m21 21-4.35-4.35"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M11 8v6M8 11h6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </motion.svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <center>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button style={{ textAlign: "center" }} size="medium">
              See More
            </Button>
          </motion.div>
        </center>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.lightbox}
            onClick={closeLightbox}
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
              variants={lightboxContentVariants}
            >
              <motion.button
                className={styles.closeBtn}
                onClick={closeLightbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </motion.button>

              <motion.button
                className={styles.navBtn}
                onClick={() => navigateImage("prev")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polyline
                    points="15,18 9,12 15,6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </motion.button>

              <motion.button
                className={`${styles.navBtn} ${styles.navNext}`}
                onClick={() => navigateImage("next")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polyline
                    points="9,18 15,12 9,6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </motion.button>

              <motion.div className={styles.imageWrapper}>
                <motion.img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt="Gallery image"
                  className={styles.lightboxImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  key={selectedImage.id}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

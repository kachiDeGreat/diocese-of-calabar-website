"use client";

import { useState, useEffect } from "react";
import styles from "../styles/gallery.module.css";
import Button from "./button";

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
  //   {
  //     id: 5,
  //     image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
  //     category: "community",
  //   },
  //   {
  //     id: 6,
  //     image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
  //     category: "church",
  //   },
  //   {
  //     id: 7,
  //     image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
  //     category: "events",
  //   },
  //   {
  //     id: 8,
  //     image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
  //     category: "community",
  //   },
  //   {
  //     id: 9,
  //     image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
  //     category: "events",
  //   },
];

const categories = [
  { id: "all", name: "All" },
  { id: "church", name: "Church" },
  { id: "events", name: "Events" },
  { id: "community", name: "Community" },
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered =
        selectedCategory === "all"
          ? galleryItems
          : galleryItems.filter((item) => item.category === selectedCategory);
      setFilteredItems(filtered);
      setIsLoading(false);
    }, 300);
  }, [selectedCategory]);

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

    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedImage.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredItems[newIndex]);
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
  }, [selectedImage, filteredItems]);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerSub}>GALLERY</span>
          <h1 className={styles.title}>Our Gallery</h1>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* <div className={styles.filterTabs}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${styles.filterTab} ${
                selectedCategory === category.id ? styles.active : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div> */}

        <div className={styles.galleryGrid}>
          {isLoading
            ? // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}></div>
                </div>
              ))
            : filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={styles.galleryCard}
                  onClick={() => openLightbox(item)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt="Gallery image"
                      className={styles.galleryImage}
                    />
                    <div className={styles.overlay}>
                      <div className={styles.overlayContent}>
                        <svg
                          className={styles.zoomIcon}
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
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
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <center>
          <Button style={{ textAlign: "center" }} size="medium">
            See More
          </Button>
        </center>

        {filteredItems.length === 0 && !isLoading && (
          <div className={styles.emptyState}>
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              className={styles.emptyIcon}
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polyline
                points="21,15 16,10 5,21"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <h3>No photos found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeLightbox}>
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
            </button>

            <button
              className={styles.navBtn}
              onClick={() => navigateImage("prev")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline
                  points="15,18 9,12 15,6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <button
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={() => navigateImage("next")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline
                  points="9,18 15,12 9,6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <div className={styles.imageWrapper}>
              <img
                src={selectedImage.image || "/placeholder.svg"}
                alt="Gallery image"
                className={styles.lightboxImage}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

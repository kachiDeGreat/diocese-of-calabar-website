import { useState, useEffect } from "react";
import styles from "../styles/carousel.module.css";
import { Images } from "../../Assets/assets";

import { ReactNode } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

interface Slide {
  id: number;
  image: string;
  title: string | ReactNode;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: Images.carouselImgOne,
    title: (
      <>
        Diocese of Calabar
        <br />
        <i className={styles.text}>(Anglican Communion)</i>
      </>
    ),
    description:
      "The Anglican Diocese of Calabar is one of 18 dioceses within the Anglican Province of the Niger Delta...",
    buttonText: "About Us",
    buttonLink: "/about-us/",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/Dzqr7x6F/Untitled-design.png",
    title: <>See upcoming events</>,
    description:
      "Stay connected with our diocese through various events and activities. Check out our calendar for details.",
    buttonText: "See Events",
    buttonLink: "/about-us/",
  },
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Track which slides have finished loading their images
  const [loadedSlides, setLoadedSlides] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleImageLoaded = (index: number) => {
    setLoadedSlides((prev) => ({ ...prev, [index]: true }));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const navigate = useNavigate();
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className={styles.carousel}>
      <div className={styles.carouselContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <div className={styles.imageContainer}>
              <LazyImage
                src={slide.image || "/placeholder.svg"}
                alt={
                  typeof slide.title === "string" ? slide.title : "Slide image"
                }
                className={styles.slideImage}
                placeholderColor="#000000" // Black background during load
                spinnerBoxColor="#ffffff"  // White box around spinner
                onLoadChange={() => handleImageLoaded(index)}
              />
            </div>
            
            {/* Smoothly hide content until the image is fully loaded */}
            <div 
              className={styles.slideContent}
              style={{
                opacity: loadedSlides[index] ? 1 : 0,
                visibility: loadedSlides[index] ? "visible" : "hidden",
                transition: "opacity 0.6s ease, visibility 0.6s ease"
              }}
            >
              <div className={styles.contentWrapper}>
                <h1 className={styles.slideTitle}>{slide.title}</h1>
                <p className={styles.slideDescription}>{slide.description}</p>
                <Button
                  style={{ marginLeft: "-10px" }}
                  size="medium"
                  onClick={() => navigate(slide.buttonLink)}
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
    </section>
  );
}

export default Carousel;
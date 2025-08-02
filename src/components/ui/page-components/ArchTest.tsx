import { CSSProperties, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "./Archdeaconry.css";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../styles/event.module.css";
import ArchdeaconryCard from "./ArchdeaconryCard";
import type { Swiper as SwiperType } from "swiper";
import { ArchdeaconryData } from "../../data/archdeaconries";

interface ArchdeaconrySliderProps {
  data: ArchdeaconryData[];
  header: string;
  title: string;
  style?: CSSProperties;
}

export default function ArchdeaconrySlider({
  data,
  header,
  title,
  style,
}: ArchdeaconrySliderProps) {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiper) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <section
      className={styles.eventSection}
      style={{
        marginTop: "40px",
        backgroundColor: "#fff",
        ...style,
      }}
    >
      <div className={styles.container}>
        <br />

        <div className="arch-header">
          <div className="arch-header-text">
            <span className="arch-header-sub">{header}</span>
            <h1 className="arch-title">{title}</h1>
            <div className="archtitle-underline" />
          </div>

          {/* Navigation Arrows */}
          <div className="display-none arch-controls">
            <button
              ref={navigationPrevRef}
              onClick={() => swiper?.slidePrev()}
              className="arch-nav-btn arch-nav-prev"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              ref={navigationNextRef}
              onClick={() => swiper?.slideNext()}
              className="arch-nav-btn arch-nav-next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.swiper}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <ArchdeaconryCard
                image={item.image}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

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
    transition: { staggerChildren: 0.2 },
  },
};

interface GenericSliderProps<T> {
  title: string;
  data: T[];
  renderItem: (item: T) => ReactNode;
  // Add an optional breakpoints prop here
  breakpoints?: Record<number, { slidesPerView: number }>;
}

export default function GenericSlider<T>({
  title,
  data,
  renderItem,
  breakpoints,
}: GenericSliderProps<T>) {
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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      style={{ position: "relative", marginBottom: "60px" }}
    >
      <motion.div
        style={{ textAlign: "center", marginBottom: "40px" }}
        variants={fadeInUp}
      >
        <h2 style={{ fontSize: "2rem", color: "#2d3748", fontWeight: 700 }}>
          {title}
        </h2>
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "#c52810",
            margin: "10px auto",
          }}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          loop={false}
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView={1} // Default for mobile
          // Use the passed breakpoints here
          breakpoints={breakpoints}
          style={{ padding: "10px 0" }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>{renderItem(item)}</SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Navigation Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          ref={navigationPrevRef}
          onClick={() => swiper?.slidePrev()}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "2px solid #c52810",
            background: "none",
            color: "#c52810",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>
        <button
          ref={navigationNextRef}
          onClick={() => swiper?.slideNext()}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "2px solid #c52810",
            background: "none",
            color: "#c52810",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          →
        </button>
      </div>
    </motion.div>
  );
}
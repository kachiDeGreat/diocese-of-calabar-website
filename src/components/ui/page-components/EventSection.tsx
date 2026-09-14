import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../styles/event.module.css";
import LazyImage from "./LazyImage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

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

export default function EventSection() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData: any[] = [];
        querySnapshot.forEach((doc) => {
          blogsData.push({ id: doc.id, ...doc.data() });
        });
        
        // Shuffle the array to randomize
        for (let i = blogsData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [blogsData[i], blogsData[j]] = [blogsData[j], blogsData[i]];
        }
        
        // Take first 6
        setBlogs(blogsData.slice(0, 6));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className={styles.eventSection}>
      <div className={styles.container}>
        <br />
        <motion.div
          className="event-header-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span className="event-header-sub" variants={fadeInUp}>
            NEWS
          </motion.span>
          <motion.h1
            style={{ fontWeight: "bold" }}
            className="event-title"
            variants={fadeInUp}
          >
            latest news
          </motion.h1>
          <motion.div className="eventtitle-underline" variants={fadeInUp} />
        </motion.div>
        <br />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          {blogs.length > 0 && (
            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              loop={true}
              autoplay={true}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass: styles.paginationBullet,
                bulletActiveClass: styles.paginationBulletActive,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className={styles.swiper}
            >
              {blogs.map((event) => (
                <SwiperSlide key={event.id}>
                  <div className={styles.eventCard}>
                    <div className={styles.imageContainer}>
                      <LazyImage
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className={styles.eventImage}
                      />
                      <div className={styles.dateTag}>
                        <span className={styles.dateText}>{event.date}</span>
                      </div>
                    </div>
                    <div className={styles.eventContent}>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://blog.anglicandioceseofcalabar.org/news/${event.slug}`}
                        className={styles.readMoreBtn}
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </section>
  );
}

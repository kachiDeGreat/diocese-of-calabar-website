import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../styles/event.module.css";

const events = [
  {
    id: 1,
    date: "APRIL 20, 2025",
    title:
      "Easter: A Celebration of Victory, Freedom, and Reconciliation in Christ",
    image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
    readMoreLink: "#",
  },
  {
    id: 2,
    date: "APRIL 13, 2025",
    title: "2025 Bishop's Palm Sunday Message",
    image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
    readMoreLink: "#",
  },
  {
    id: 3,
    date: "MARCH 30, 2025",
    title: "Celebrating the Grace and Strength of Motherhood – 2025",
    image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
    readMoreLink: "#",
  },
  {
    id: 4,
    date: "MARCH 15, 2025",
    title: "Youth Empowerment and Leadership Conference",
    image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
    readMoreLink: "#",
  },
  {
    id: 5,
    date: "FEBRUARY 28, 2025",
    title: "Community Outreach and Social Justice Initiative",
    image: "https://i.postimg.cc/c1RRvZMR/placeholder.png",
    readMoreLink: "#",
  },
];

export default function EventSection() {
  return (
    <section className={styles.eventSection}>
      <div className={styles.container}>
        <br />
        <div className="event-header-text">
          <span className="event-header-sub">NEWS</span>
          <h1 className="event-title">latest news</h1>
          <div className="eventtitle-underline"></div>
        </div>
        <br />
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
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
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className={styles.eventCard}>
                <div className={styles.imageContainer}>
                  <img
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
                  <a href={event.readMoreLink} className={styles.readMoreBtn}>
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

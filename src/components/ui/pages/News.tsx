import React, { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import SEO from "../page-components/SEO";
import Banner from "../page-components/Banner";
import LazyImage from "../page-components/LazyImage";
import styles from "../styles/News.module.css";
import { eventsData } from "../../data/eventsData";

export default function News() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
      <SEO
        title="News & Events | Diocese of Calabar"
        description="Stay updated with the latest news, events, and announcements from the Anglican Diocese of Calabar."
        url="/news_and_events"
      />
      <Banner title="News & Events" />

      <section className={styles.newsSection}>
        <div className="container">
          <div className={styles.newsGrid}>
            {eventsData.map((event) => (
              <div key={event.id} className={styles.newsCard}>
                <div className={styles.imageContainer}>
                  <LazyImage
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className={styles.newsImage}
                  />
                  <div className={styles.categoryBadge}>{event.category}</div>
                </div>

                <div className={styles.newsContent}>
                  <div className={styles.dateRow}>
                    <i className="far fa-calendar-alt"></i>
                    <span>{event.date}</span>
                  </div>

                  <h3 className={styles.newsTitle}>
                    <Link to={`/news_and_events/${event.slug}`}>
                      {event.title}
                    </Link>
                  </h3>

                  <p className={styles.newsExcerpt}>
                    {event.content[0].substring(0, 120)}...
                  </p>

                  <Link
                    to={`/news_and_events/${event.slug}`}
                    className={styles.readMoreBtn}
                  >
                    Read Article <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}

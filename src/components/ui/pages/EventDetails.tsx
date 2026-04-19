import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../page-components/SEO";
import Banner from "../page-components/Banner";
import LazyImage from "../page-components/LazyImage";
import NotFound from "./NotFound";
import { eventsData } from "../../data/eventsData";
import styles from "../styles/EventDetails.module.css";

export default function EventDetails() {
  const { slug } = useParams<{ slug: string }>();

  // Find the specific event based on the URL slug
  const event = eventsData.find((e) => e.slug === slug);

  // Scroll to top when loading a new event
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If someone types a bad URL, show the 404 page
  if (!event) {
    return (
      <NotFound
        is404={true}
        title="Article Not Found"
        message="The news article you are looking for does not exist."
      />
    );
  }

  // Get 3 other recent events for the sidebar (excluding the current one)
  const popularNews = eventsData.filter((e) => e.id !== event.id).slice(0, 3);

  // Get unique categories for the sidebar
  //   const categories = Array.from(new Set(eventsData.map((e) => e.category)));

  return (
    <HelmetProvider>
      <SEO
        title={`${event.title} | Diocese of Calabar`}
        description={event.content[0].substring(0, 150) + "..."}
        url={`/news_and_events/${event.slug}`}
        image={event.image}
      />
      <Banner title="News & Events" />

      <section className={styles.detailsSection}>
        <div className="container">
          <div className="row">
            {/* MAIN ARTICLE CONTENT (Left Side) */}
            <div className="col-lg-8">
              <div className={styles.articleContainer}>
                <div className={styles.mainImageWrapper}>
                  <LazyImage
                    src={event.image}
                    alt={event.title}
                    className={styles.mainImage}
                  />
                  <div className={styles.categoryTag}>{event.category}</div>
                </div>

                <div className={styles.articleHeader}>
                  <span className={styles.dateText}>
                    <i
                      className="far fa-calendar-alt"
                      style={{ marginRight: "8px" }}
                    ></i>
                    {event.date}
                  </span>
                  <h1 className={styles.articleTitle}>{event.title}</h1>
                </div>

                <div className={styles.articleBody}>
                  {event.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR (Right Side) */}
            <div className="col-lg-4">
              <div className={styles.sidebar}>
                {/* Popular News Widget */}
                <div className={styles.sidebarWidget}>
                  <h3 className={styles.widgetTitle}>
                    <span className={styles.titleLine}></span>
                    Popular News
                  </h3>
                  <div className={styles.popularList}>
                    {popularNews.map((news) => (
                      <Link
                        to={`/news_and_events/${news.slug}`}
                        key={news.id}
                        className={styles.popularItem}
                      >
                        <div className={styles.popularImgBox}>
                          <img src={news.image} alt={news.title} />
                        </div>
                        <div className={styles.popularInfo}>
                          <h4>{news.title}</h4>
                          <span>
                            <i
                              className="far fa-clock"
                              style={{ marginRight: "5px", color: "#c52810" }}
                            ></i>
                            {news.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories Widget */}
                {/* <div className={styles.sidebarWidget}>
                  <h3 className={styles.widgetTitle}>
                    <span className={styles.titleLine}></span>
                    Categories
                  </h3>
                  <ul className={styles.categoryList}>
                    {categories.map((cat, index) => (
                      <li key={index}>
                        <Link to="#">
                          {cat}
                          <i className="fas fa-chevron-right"></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}

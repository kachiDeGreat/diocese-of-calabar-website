import { useParams, Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import styles from "../styles/ArchdeaconryDetails.module.css";
import LazyImage from "../page-components/LazyImage";
import Banner from "../page-components/Banner";
import GenericSlider from "../page-components/GenericSlider";
import { archdeaconryDetailsData } from "../../data/archdeaconryDetails";
import SEO from "../page-components/SEO"; // <-- Import SEO

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

export default function ArchdeaconryDetails() {
  const { slug } = useParams<{ slug: string }>();

  const data = slug ? archdeaconryDetailsData[slug] : null;

  if (!data) {
    return (
      <div className={styles.notFound}>
        <SEO title="Not Found" /> {/* Handle 404 title */}
        <h2>Archdeaconry not found.</h2>
        <Link to="/archdeaconries">Return to all Archdeaconries</Link>
      </div>
    );
  }

  const renderLeaderCard = (leader: any) => (
    <div className={styles.leaderCard}>
      <img src={leader.image} alt={leader.name} className={styles.leaderImg} />
      <div className={styles.leaderInfo}>
        <span className={styles.leaderRole}>{leader.role}</span>
        <h3 className={styles.leaderName}>{leader.name}</h3>
        <p className={styles.leaderBio}>{leader.bio}</p>
      </div>
    </div>
  );

  const renderChurchCard = (church: any) => (
    <div className={styles.churchCard}>
      <div className={styles.churchImgContainer}>
        <img
          src={church.image}
          alt={church.name}
          className={styles.churchImg}
        />
      </div>
      <div className={styles.churchInfo}>
        <h3 className={styles.churchName}>{church.name}</h3>
        <p className={styles.churchAddress}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "8px", marginBottom: "-2px" }}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {church.address}
        </p>
        <Link to={church.link} className={styles.churchBtn}>
          View Details
        </Link>
      </div>
    </div>
  );

  return (
    <div className={styles.pageContainer}>
      {/* DYNAMIC SEO TAGS */}
      <SEO title={data.name} description={data.history.paragraphs1[0]} />

      {/* Replaced custom hero with your Banner */}
      <Banner title={data.name} />

      {/* History Section */}
      <motion.section
        className={styles.historySection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className={styles.sectionHeader} variants={fadeInUp}>
          <h2>History</h2>
          <div className={styles.underline}></div>
        </motion.div>

        <div className={styles.historyGrid}>
          <motion.div
            className={styles.historyText}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeInUp}>Founding Years</motion.h3>
            {data.history.paragraphs1.map((p, idx) => (
              <motion.p key={idx} variants={fadeInUp}>
                {p}
              </motion.p>
            ))}

            <motion.blockquote
              className={styles.historyQuote}
              variants={fadeInUp}
            >
              "{data.history.quote}"
            </motion.blockquote>

            <motion.h3 variants={fadeInUp}>A Century of Growth</motion.h3>
            {data.history.paragraphs2.map((p, idx) => (
              <motion.p key={idx} variants={fadeInUp}>
                {p}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            className={styles.historyImageWrapper}
            variants={fadeInUp}
          >
            <LazyImage
              src={data.history.image}
              alt={`${data.name} History`}
              className={styles.historyImg}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Leadership Slider Section */}
      <section className={styles.sliderSectionAlt}>
        <div className={styles.container}>
          <GenericSlider
            title="Our Leadership"
            data={data.leaders}
            renderItem={renderLeaderCard}
            // Lock to 1 slide on all screens
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
          />
        </div>
      </section>

      {/* Churches Slider Section */}
      <section className={styles.sliderSection}>
        <div className={styles.container}>
          <GenericSlider
            title="Parishes & Churches"
            data={data.churches}
            renderItem={renderChurchCard}
            // Scale dynamically based on screen size
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: Math.min(data.churches.length, 3) },
            }}
          />
        </div>
      </section>
    </div>
  );
}

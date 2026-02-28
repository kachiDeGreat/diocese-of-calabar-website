import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "../styles/intro.module.css";
// import { Images } from "../../Assets/assets";
import Button from "./button";
import LazyImage from "./LazyImage";

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

function Intro() {
  const navigate = useNavigate();
  return (
    <div className={styles.introSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.introContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Bishop Image */}
          <div className={styles.imageWrapper}>
            <motion.div
              className={styles.imageContainer}
              variants={fadeInUp}
             
              style={{
                width: "100%",
                maxWidth: "400px",
                aspectRatio: "3/4",
                margin: "0 auto",
              }}
            >
              <LazyImage
                src="https://dropimg.onyekachi.dev/wnpxtpcee40rzbs4gt4p"
                alt="The Rt. Rev'd. Prof. Nneoyi Onen Egbe - Lord Bishop of Calabar"
                className={styles.bishopImage}
                placeholderColor="#f4f4f4"
              />
            </motion.div>

            {/* Name Card Below Image */}
            <motion.div className={styles.nameCard} variants={fadeInUp}>
              <h3 className={styles.cardBishopName}>
                The Rt. Rev'd. Prof. Nneoyi Onen Egbe
              </h3>
              <p className={styles.cardCredentials}>
                B.Sc(Calabar), M.Sc(Ibadan), Ph.D(Aberdeen), MARN, FASL, GMSRP,
                MIPEM, AMLNSEP
              </p>
              <p className={styles.cardBishopTitle}>Lord Bishop of Calabar</p>
            </motion.div>
          </div>

          <div className={styles.textContent}>
            <motion.div
              className={styles.textWrapper}
              variants={staggerContainer}
            >
              <motion.span
                className="intro-subtitle"
                style={{
                  fontSize: "0.9em",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  color: "#c52810",
                  display: "inline-block",
                }}
                variants={fadeInUp}
              >
                About Us
              </motion.span>

              <motion.h1 className={styles.mainTitle} variants={fadeInUp}>
                Welcome to the Anglican Diocese of Calabar
                <span className={styles.titleYear}> </span>
              </motion.h1>

              <motion.div className={styles.messageContent} variants={fadeInUp}>
                <p className={styles.welcomeText}>
                  The Anglican Diocese of Calabar was established as a
                  Missionary Diocese on 20 December 1990 by the Church of
                  Nigeria (Anglican Communion), forming one of eight new
                  dioceses created that year to accommodate the expanding
                  Anglican community in southeastern Nigeria. This creation
                  occurred amid the Church of Nigeria's broader
                  late-20th-century diocesan proliferation, driven by the rapid
                  post-colonial growth of Christianity in the Niger Delta
                  region, where missionary activities had laid foundational
                  roots since the mid-19th century. The diocese drew from
                  earlier Anglican efforts, including the establishment of Holy
                  Trinity Anglican Church in Calabar in 1911, which evolved from
                  a multi-denominational congregation aligned with the Niger
                  Delta Pastorate under the Church Missionary Society's
                  influence.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button size="medium" onClick={() => navigate("/about-us")}>
                  about the diocese
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Intro;

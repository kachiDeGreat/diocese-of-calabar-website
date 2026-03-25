import { motion, Variants } from "framer-motion";
import styles from "../styles/intro.module.css";
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

function FormerBishop() {
  return (
    <div
      className={styles.introSection}
      style={{ borderTop: "1px solid #eaeaea", backgroundColor: "#fafafa" }}
    >
      <div className={styles.container}>
        <motion.div
          style={{ minHeight: "auto" }}
          className={styles.introContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className={styles.textContent}>
            <motion.div
              className={styles.textWrapper}
              variants={staggerContainer}
            >
              <motion.span
                className="intro-subtitle mt-4 mt-lg-0"
                style={{
                  fontSize: "0.9em",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  color: "#c52810",
                  display: "inline-block",
                }}
                variants={fadeInUp}
              >
                Our Former Bishop
              </motion.span>

              <motion.h1 className={styles.mainTitle} variants={fadeInUp}>
                The Most Rev. Tunde Adeleye
              </motion.h1>

              <motion.div className={styles.messageContent} variants={fadeInUp}>
                <p className={styles.welcomeText}>
                  The Most Rev. Tunde Adeleye was born to the family of Late
                  Rev. And Mrs. G. E. Adeleye of Akoko Edo Local Government Area
                  of Edo State, Nigeria. He had his Primary School Education at
                  St. Stephen Anglican School, Enwa. He further went in pursuit
                  of Secondary Education between 1964-1968, at Oyemekun Grammar
                  School, Akure and had his West African School Certificate
                  (WASC) and Higher School Certificate (HSC).
                </p>

                <p className={styles.welcomeText}>
                  He attended the Mid-Western Polytechnic, Benin campus, and
                  Kwara State College of Technology, where he studied
                  Professional Secretarial Administration. He later attended the
                  University of Calabar from 1978 to 1982 and obtained a
                  Bachelor's Degree (with honours) in English and Literary
                  Studies. He also attended the famous Haggai Institute of
                  Leadership Training, Singapore, and Immanuel College of
                  Theology (Ibadan) where he had his theological and pastoral
                  studies.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Former Bishop Image */}
          <div className={styles.imageWrapper} style={{ marginBottom: "30px" }}>
            <motion.div
              className={styles.imageContainer}
              variants={fadeInUp}
              style={{
                width: "100%",
                maxWidth: "400px",
                aspectRatio: "3/4",
                margin: "0 auto",
                filter: "grayscale(20%)",
              }}
            >
              <LazyImage
                src="https://dropimg.onyekachi.dev/rgam72tuhgjfako1q0ix"
                alt="The Most Rev. Tunde Adeleye - Former Bishop of Calabar"
                className={styles.bishopImage}
                placeholderColor="#e0e0e0"
              />
            </motion.div>

            {/* Name Card Below Image */}
            <motion.div className={styles.nameCard} variants={fadeInUp}>
              <h3 className={styles.cardBishopName}>
                The Most Rev. Tunde Adeleye
              </h3>
              <p className={styles.cardCredentials}>
                B.A (Calabar), FICT (Ibadan)
              </p>
              <p className={styles.cardBishopTitle}>
                Former Lord Bishop of Calabar & <br /> Archbishop of Niger Delta
                Province
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Extended Biography */}
        <motion.div
          className="col-12 text-text p-0 p-lg-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p className={styles.welcomeText} variants={fadeInUp}>
            He worked as a teacher in many secondary schools and at Auchi
            Polytechnic, being the best-behaved student for the year in the
            school. While in school, he was the president of the Christian
            Union, Midwestern Polytechnic, and twice president of the Christian
            Union, University of Calabar. He later became the National
            President, Nigeria Fellowship of Evangelical Students (NIFES), and
            held various leadership positions in the Christian Association of
            Nigeria (CAN), Scripture Union, and Christian Council of Nigeria.
          </motion.p>

          <motion.p className={styles.welcomeText} variants={fadeInUp}>
            He was ordained as a Deacon in Akure Diocese in 1990 and became a
            full priest in June 1991. He served as a Chaplain in All Saints
            Chapel, University of Benin, and later became the first full-time
            Chaplain of Chapel of Redemption, University of Calabar (1991-2000).
            He was preferred as Canon and later as Archdeacon by His Lordship,
            Rt. Revd. Dr. Ekpirikpo. In 1999, he was elected, confirmed,
            consecrated, and enthroned as the second Bishop of the Diocese of
            Calabar, serving faithfully until February 2021. To the glory of
            God, he was later elected and presented as the Archbishop of the
            Ecclesiastical Province of Niger Delta.
          </motion.p>

          <motion.p className={styles.welcomeText} variants={fadeInUp}>
            Archbishop Adeleye is a gifted teacher with a powerful prophetic
            ministry. He is a regular speaker in conferences, camps, seminars,
            and revivals across denominations and cultures. He served as
            Chairman of the Divine Commonwealth Conference (DIVCCON) and
            initiated the popular "Glass House" Television programme. In 2021,
            he was appointed as an adjunct professor of Missions and Evangelism
            in Trinity College of Theology, Umuahia.
          </motion.p>

          <motion.p className={styles.welcomeText} variants={fadeInUp}>
            He is a prolific author of many widely used books, including{" "}
            <em>Evangelism Made Easy</em>, <em>Pastoring Made Easy</em>, and{" "}
            <em>Praying Made Easy</em>. He currently serves as the Missioner and
            Chairman of Parables Foundation Production, involved in the Online
            School of Evangelism. He is happily married to Ezinne Lady Dorothy
            Tunde-Adeleye, and they are blessed with five children and thirteen
            grandchildren.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default FormerBishop;

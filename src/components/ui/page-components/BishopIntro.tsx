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

function BishopIntro() {
  return (
    <div className={styles.introSection}>
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
                Meet Our Bishop
              </motion.span>

              <motion.h1 className={styles.mainTitle} variants={fadeInUp}>
                The Rt. Rev'd. Prof. Nneoyi Onen Egbe
                <span className={styles.titleYear}> </span>
              </motion.h1>

              <motion.div className={styles.messageContent} variants={fadeInUp}>
                <p className={styles.welcomeText}>
                  The Rt. Rev. Professor Nneoyi Onen Egbe is a multifaceted
                  individual whose life combines spiritual depth, academic
                  excellence, and a heart for service. He is a bishop,
                  professor, singer, instrumentalist, teacher, preacher, mentor,
                  and an enduring inspiration to many. A proud alumnus of the
                  University of Calabar (UNICAL), he holds an honours degree in
                  Radiography and advanced degrees in Physics and Medical
                  Physics from the University of Ibadan and the University of
                  Aberdeen in the United Kingdom.
                </p>

                <p className={styles.welcomeText}>
                  He is the first Medical Physicist from Cross River State and
                  also the first Professor of Radiography from the entire
                  South-South geopolitical zone of Nigeria. In addition to his
                  scientific training, he holds a Bachelor’s degree in Theology
                  from Trinity Theological College, Umuahia.
                </p>
              </motion.div>

              <div />
            </motion.div>
          </div>
          {/* Bishop Image */}
          <div className={styles.imageWrapper} style={{ marginBottom: "30px" }}>
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
        </motion.div>

        <motion.div
          className="col-12 text-text p-0 p-lg-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p className={styles.welcomeText} variants={fadeInUp}>
            Bishop Egbe’s encounter with Jesus Christ at an early age marked the
            beginning of a vibrant Christian journey. He navigated the
            challenges of youth with the guidance of the Holy Spirit, nurtured
            by fellowships such as the Scripture Union in Nko and the Christian
            Union at UNICAL. His passion for God left lasting imprints on the
            lives of many, particularly within the UNICAL Chapel of Redemption,
            where he played a foundational role in establishing the Redemption
            Praise Band and Redemption Bells (Acapella). His ministry influence
            extended into the Cathedral Church of the Holy Trinity, Calabar,
            where he served as a key leader, worship team chaplain, and integral
            member of the Anglican Praise Band.
          </motion.p>
          <motion.p className={styles.welcomeText} variants={fadeInUp}>
            Answering a divine call to ministry, he pursued theological
            education at Trinity Theological College, Umuahia, and advanced
            through the ecclesiastical ranks: ordained as Deacon in 2002, Priest
            in 2003, Canon in 2012, and Venerable in 2018. In 2021, he became
            the first indigenous Bishop of the Anglican Diocese of Calabar,
            following his election, confirmation, consecration, and
            enthronement. A 2005 Commonwealth Scholar and 2012 Fellow, Professor
            Egbe is not only a leading academic but also a transformational
            figure in medical education in Nigeria. He has been pivotal in the
            development and survival of Radiography at the University of
            Calabar, earning him the title “father of Radiography” in the
            institution. He served as Head of the Department of Radiography and
            Radiological Science—initially in an acting capacity from 2010 to
            2014, and later as the first substantive Head from 2018 to 2021. He
            was Deputy Dean of the Faculty of Allied Medical Sciences
            (2014–2016) and the pioneering Chairman of the Committee of Heads of
            Radiography Departments in Nigerian Universities until his elevation
            to the episcopacy.
          </motion.p>
          <motion.p className={styles.welcomeText} variants={fadeInUp}>
            As a prolific academic, he has over 80 publications in reputable
            local and international journals. Yet, he is equally known for his
            commitment to mentorship, evangelism, counseling, and worship
            leadership. Whether singing, dancing, teaching, playing instruments,
            or cooking—an activity he particularly enjoys—Bishop Egbe approaches
            all things with the aim of glorifying God. He is a member of
            numerous learned societies across Nigeria and abroad. Throughout his
            life and career, he has maintained the conviction that every
            role—secular or sacred—is a divine assignment for the service of
            others. Bishop Nneoyi Egbe is married to Dr. Mrs. Ada Nneoyi-Egbe,
            and they are blessed with four children—two sons and two daughters.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default BishopIntro;

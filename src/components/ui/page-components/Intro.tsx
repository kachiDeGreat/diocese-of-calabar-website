import { motion, Variants } from "framer-motion";
import styles from "../styles/intro.module.css";
import { Images } from "../../Assets/assets";

function Intro() {
  // Animation variants with proper TypeScript typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Using cubic bezier array instead of string
      },
    },
  };

  return (
    <motion.section
      className={styles.introSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.introContent}
          variants={containerVariants}
        >
          {/* Text Content */}
          <motion.div className={styles.textContent} variants={itemVariants}>
            <div className={styles.textWrapper}>
              <motion.h1 className={styles.mainTitle} variants={itemVariants}>
                Our <span className={styles.titleYear}> Mission</span>
              </motion.h1>
              <motion.div
                className={styles.titleUnderline}
                variants={itemVariants}
              ></motion.div>

              <motion.div
                className={styles.messageContent}
                variants={itemVariants}
              >
                <p className={styles.welcomeText}>
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Atque vitae blanditiis nisi, facilis provident molestias
                  harum? Unde, fugiat iste distinctio aut ratione quaerat illo
                  officiis fuga nam cupiditate tempora, omnis cum maxime,
                  architecto illum itaque."
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Bishop Image */}
          <motion.div className={styles.imageWrapper} variants={itemVariants}>
            <motion.div
              className={styles.imageContainer}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={Images.bishopTwo || "/placeholder.svg"}
                alt="The Rt. Rev'd. Prof. Nneoyi Onen Egbe - Lord Bishop of Calabar"
                className={styles.bishopImage}
              />
            </motion.div>
            {/* Name Card Below Image */}
            <motion.div className={styles.nameCard} variants={itemVariants}>
              <h3 className={styles.cardBishopName}>
                The Rt. Rev'd. Prof. Nneoyi Onen Egbe
              </h3>
              <p className={styles.cardCredentials}>
                B.Sc(Calabar), M.Sc(Ibadan), Ph.D(Aberdeen), MARN, FASL, GMSRP,
                MIPEM
              </p>
              <p className={styles.cardBishopTitle}>Lord Bishop of Calabar</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Intro;

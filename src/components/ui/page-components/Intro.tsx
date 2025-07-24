import { motion, Variants } from "framer-motion";
import styles from "../styles/intro.module.css";
import { Images } from "../../Assets/assets";
import Button from "./button";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0.2,
    },
  },
};

function Intro() {
  return (
    <motion.div
      className={styles.introSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className={styles.container}>
        <div className={styles.introContent}>
          {/* Bishop Image */}
          <motion.div
            className={styles.imageWrapper}
            variants={containerVariants}
          >
            <motion.div
              className={styles.imageContainer}
              variants={imageVariants}
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

          <motion.div
            className={styles.textContent}
            variants={containerVariants}
          >
            <motion.div
              className={styles.textWrapper}
              variants={containerVariants}
            >
              <motion.span
              className="intro-subtitle"
                style={{
                  fontSize: "0.9em",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  color: "#c52810",
                }}
                variants={itemVariants}
              >
                About Us
              </motion.span>

              <motion.h1 className={styles.mainTitle} variants={itemVariants}>
                Welcome to the Anglican Diocese of Calabar
                <span className={styles.titleYear}> </span>
              </motion.h1>

              <motion.div
                className={styles.titleUnderline}
                variants={itemVariants}
              />

              <motion.div
                className={styles.messageContent}
                variants={containerVariants}
              >
                <motion.p
                  className={styles.welcomeText}
                  variants={itemVariants}
                >
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Atque vitae blanditiis nisi, facilis provident molestias
                  harum? Unde, fugiat iste distinctio aut ratione quaerat illo
                  officiis fuga nam cupiditate tempora, omnis cum maxime,
                  architecto illum itaque."
                </motion.p>
                <motion.p
                  className={styles.welcomeText}
                  variants={itemVariants}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ullam quis officiis odit voluptates optio dolor, tempore qui
                  sunt minus? Iste dicta facilis modi, adipisci quos eaque! Et
                  est esse eum. Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Animi, totam.
                </motion.p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button size="medium" onClick={() => console.log("Clicked!")}>
                  about the diocese
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Intro;

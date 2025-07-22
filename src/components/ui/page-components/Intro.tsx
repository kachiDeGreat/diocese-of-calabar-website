import { motion, Variants } from "framer-motion";
import styles from "../styles/intro.module.css";
import { Images } from "../../Assets/assets";

function Intro() {

  return (
    <div className={styles.introSection}>
      <div className={styles.container}>
        <div className={styles.introContent}>
          {/* Text Content */}
          <div className={styles.textContent}>
            <div className={styles.textWrapper}>
              <h1 className={styles.mainTitle}>
                Our <span className={styles.titleYear}> Mission</span>
              </h1>
              <div className={styles.titleUnderline}></div>

              <div className={styles.messageContent}>
                <p className={styles.welcomeText}>
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Atque vitae blanditiis nisi, facilis provident molestias
                  harum? Unde, fugiat iste distinctio aut ratione quaerat illo
                  officiis fuga nam cupiditate tempora, omnis cum maxime,
                  architecto illum itaque."
                </p>
              </div>
            </div>
          </div>

          {/* Bishop Image */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <img
                src={Images.bishopTwo || "/placeholder.svg"}
                alt="The Rt. Rev'd. Prof. Nneoyi Onen Egbe - Lord Bishop of Calabar"
                className={styles.bishopImage}
              />
            </div>
            {/* Name Card Below Image */}
            <div className={styles.nameCard}>
              <h3 className={styles.cardBishopName}>
                The Rt. Rev'd. Prof. Nneoyi Onen Egbe
              </h3>
              <p className={styles.cardCredentials}>
                B.Sc(Calabar), M.Sc(Ibadan), Ph.D(Aberdeen), MARN, FASL, GMSRP,
                MIPEM
              </p>
              <p className={styles.cardBishopTitle}>Lord Bishop of Calabar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;

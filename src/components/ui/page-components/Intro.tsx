import { motion, Variants } from "framer-motion";
import styles from "../styles/intro.module.css";
import { Images } from "../../Assets/assets";
import Button from "./button";

function Intro() {
  return (
    <div className={styles.introSection}>
      <div className={styles.container}>
        <div className={styles.introContent}>
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
          <div className={styles.textContent}>
            <div className={styles.textWrapper}>
              <span
                style={{
                  fontSize: "1.1em",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  color: "#c52810",
                  // marginBottom: "-25px"
                }}
              >
                About Us
              </span>
              <h1 className={styles.mainTitle}>
                Welcome to the Anglican Diocese of Calabar
                <span className={styles.titleYear}> </span>
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
                <p className={styles.welcomeText}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ullam quis officiis odit voluptates optio dolor, tempore qui
                  sunt minus? Iste dicta facilis modi, adipisci quos eaque! Et
                  est esse eum. Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Animi, totam.
                </p>
              </div>
              <Button size="medium" onClick={() => console.log("Clicked!")}>
                about the diocese
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;

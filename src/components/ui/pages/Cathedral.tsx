import React from "react";
import { motion } from "framer-motion";
import Banner from "../page-components/Banner";
import styles from "../styles/cathedral.module.css";

function Cathedral() {
  return (
    <div className={styles.cathedralPage}>
      <Banner title="The Cathedral Church of the Holy Trinity" />

      <div className={styles.container}>
        {/* History Section */}
        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.grid}>
            <div className={styles.imageWrapper}>
              <img
                src="https://placehold.co/800x600"
                alt="Cathedral History"
                className={styles.image}
              />
            </div>
            <div className={styles.textWrapper}>
              <div className={styles.card}>
                <h2>Our History</h2>
                <p>
                  The Cathedral Church of the Holy Trinity serves as the mother
                  church and principal seat of the Anglican Diocese of Calabar
                  in Cross River State, Nigeria. Established in the early 20th
                  century, it originated from a group of non-indigenous members
                  who separated from the Duke Town United Free Church of
                  Scotland in 1906 and formed a new congregation in 1908,
                  initially worshiping in a building on Boco Street, Cobham
                  Town.
                </p>
                <p>
                  The church's current site was secured on a 99-year lease from
                  Prince Bassey Duke Ephraim IX, who also donated the bell still
                  used today. The foundation stone was laid on January 7, 1911.
                  Renamed the Holy Trinity Anglican Church, Calabar, it marked
                  the establishment of the first Anglican presence in the area
                  and has since hosted annual traditions such as the first
                  Harvest Thanksgiving in 1912.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Present Day Section */}
        <motion.div
          className={`${styles.section} ${styles.reverse}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.grid}>
            <div className={styles.imageWrapper}>
              <img
                src="https://placehold.co/800x600"
                alt="Cathedral Present Day"
                className={styles.image}
              />
            </div>
            <div className={styles.textWrapper}>
              <div className={styles.card}>
                <h2>Present Day</h2>
                <p>
                  Today, the Cathedral stands as a beacon of faith and history
                  in Calabar. It continues to play a pivotal role in the
                  spiritual life of the diocese, hosting major diocesan events,
                  ordinations, and synods. The architectural grandeur has been
                  preserved while modern amenities have been added to enhance
                  worship.
                </p>
                <p>
                  The Cathedral community is vibrant, with various guilds and
                  societies actively participating in evangelism, community
                  service, and youth development. It remains a testament to the
                  enduring legacy of the Anglican Church in Cross River State.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Cathedral;

import React from "react";
import styles from "../styles/officials.module.css";

interface Official {
  title: string;
  image: string;
  description: string;
}

interface OfficialsSectionProps {
  officials: Official[];
  headerSubtitle?: string;
  headerTitle?: string;
}

export default function OfficialsSection({
  officials,
}: //   headerSubtitle = "LEADERSHIP",
//   headerTitle = "diocesan officials",
OfficialsSectionProps) {
  return (
    <section className={styles.officialsSection}>
      <div className={styles.container}>
        <br />
        <div className="officials-header-text">
          {/* <span className="officials-header-sub">{headerSubtitle}</span>
          <h1 style={{ fontWeight: "bold" }} className="officials-title">
            {headerTitle}
          </h1> */}
          <div className="officialstitle-underline" />
        </div>
        <br />

        <div className="row">
          {officials.map((official, index) => (
            <div key={index} className="col-12 col-md-4 mb-4">
              <div className={styles.officialCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={official.image || "/placeholder.svg"}
                    alt={official.title}
                    className={styles.officialImage}
                  />
                </div>
                <div className={styles.officialContent}>
                  <h3 className={styles.officialTitle}>{official.title}</h3>
                  <p className={styles.officialDescription}>
                    {official.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

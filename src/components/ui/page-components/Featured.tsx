import React from "react";
import { motion, Variants, Transition } from "framer-motion";
import { Images } from "../../Assets/assets";
import styles from "../styles/featured.module.css";

interface FeaturedPerson {
  id: number;
  name: string;
  role: string;
  church: string;
  imageUrl: string;
}

function Featured() {
  const featuredPeople: FeaturedPerson[] = [
    {
      id: 1,
      name: "Onyekachi, Godswill Richard",
      role: "Featured Priest of the Month",
      church: "Anglican Church of Ascension | Ascension Deanery",
      imageUrl: Images.kachi,
    },
    {
      id: 2,
      name: "Onyekachi, Godswill Richard",
      role: "Featured Laity of the Month",
      church: "Anglican Church of Ascension | Ascension Deanery",
      imageUrl: Images.kachi,
    },
  ];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "/images/default-profile.jpg";
  };

  return (
    <section className={styles.featuredSection}>
      <div className={styles.featuredContainer}>
        <br />
        <div className={styles.cardsContainer}>
          {featuredPeople.map((person) => (
            <div key={person.id} className={styles.card}>
              <img
                src={person.imageUrl}
                alt={person.name}
                className={styles.cardImage}
                onError={handleImageError}
              />
              <div className={styles.fullOverlay}>
                <div className={styles.bottomContent}>
                  <h3 className={styles.name}>{person.name}</h3>
                  <p className={styles.role}>{person.role}</p>
                  <p className={styles.church}>{person.church}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Featured;

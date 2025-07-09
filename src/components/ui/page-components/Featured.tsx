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

  // Type-safe transition configuration
  const cardTransition: Transition = {
    duration: 0.6,
    ease: "easeOut", // Using one of Framer Motion's predefined easing functions
  };

  // Properly typed variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: cardTransition,
    },
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "/images/default-profile.jpg";
  };

  return (
    <motion.section
      className={styles.featuredSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className={styles.featuredContainer}>
        <br />
        <motion.div className={styles.cardsContainer}>
          {featuredPeople.map((person) => (
            <motion.div
              key={person.id}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Featured;

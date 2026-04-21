import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import styles from "../styles/UpcomingEvent.module.css";
import Button from "./button";

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
    transition: { staggerChildren: 0.2 },
  },
};

const UpcomingEvent = () => {
  const navigate = useNavigate();
  const targetDate = new Date("2026-07-08T08:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className={styles.eventBanner}>
      {/* <div className={styles.eventOverlay}></div> */}

      <motion.div
        className={styles.eventContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Countdown Logic */}
        <motion.div className={styles.eventTimerCol} variants={fadeInUp}>
          <div className={styles.timerGrid}>
            <div className={styles.timerItem}>
              <span className={styles.timerNum}>{timeLeft.days}</span>
              <span className={styles.timerLabel}>DAYS</span>
            </div>
            <div className={styles.timerItem}>
              <span className={styles.timerNum}>{timeLeft.hours}</span>
              <span className={styles.timerLabel}>HRS</span>
            </div>
            <div className={styles.timerItem}>
              <span className={styles.timerNum}>{timeLeft.minutes}</span>
              <span className={styles.timerLabel}>MINS</span>
            </div>
            <div className={styles.timerItem}>
              <span className={styles.timerNum}>{timeLeft.seconds}</span>
              <span className={styles.timerLabel}>SECS</span>
            </div>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          className={styles.eventContentCol}
          variants={staggerContainer}
        >
          <motion.span className={styles.eventBadge} variants={fadeInUp}>
            UPCOMING EVENT
          </motion.span>
          <motion.h2 className={styles.eventTitle} variants={fadeInUp}>
            3RD SESSION OF THE 12TH SYNOD
          </motion.h2>

          <motion.div className={styles.eventInfoRow} variants={fadeInUp}>
            <div className={styles.infoItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>8th - 12th July, 2026</span>
            </div>
            <div className={styles.infoItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Holy Trinity Cathedral, Calabar</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              size="medium"
              onClick={() => navigate("/synod-2026")}
              style={{ width: "30%" }}
            >
              REGISTER NOW
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UpcomingEvent;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../../styles/NotFound.module.css";
import SEO from "../page-components/SEO";

interface NotFoundProps {
  title?: string;
  message?: string;
  is404?: boolean;
}

export default function NotFound({
  title = "Page Not Found",
  message = "We're sorry, the page you are looking for doesn't exist or has been moved.",
  is404 = true,
}: NotFoundProps) {
  return (
    <section className={styles.container}>
      <SEO title={title} description={message} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {is404 ? (
          <h1 className={styles.errorCode}>404</h1>
        ) : (
          <div className={styles.iconWrapper}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </div>
        )}

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <Link to="/" className={styles.homeButton}>
          Return to Homepage
        </Link>
      </motion.div>
    </section>
  );
}

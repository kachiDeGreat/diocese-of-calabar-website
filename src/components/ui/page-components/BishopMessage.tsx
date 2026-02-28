import React from "react";
import { motion, Variants } from "framer-motion";
import "../styles/BishopMessage.css";
// import Button from "./button";

function BishopMessage() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
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

  const videoVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.section
      className="BishopMessage-hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="BishopMessage-overlay" variants={itemVariants} />

      <div className="BishopMessage-container">
        <motion.div
          className="BishopMessage-content"
          variants={containerVariants}
        >
          <motion.div
            className="BishopMessage-header"
            variants={containerVariants}
          >
            <motion.div className="BishopMessage-badge" variants={itemVariants}>
              New Month Message
            </motion.div>
            <motion.h1 className="BishopMessage-title" variants={itemVariants}>
              <span className="BishopMessage-titleHighlight">Bishop's</span>{" "}
              Divine Word
            </motion.h1>
            <motion.p className="BishopMessage-intro" variants={itemVariants}>
              Watch this month's special message from our beloved Bishop
            </motion.p>
          </motion.div>

          <motion.div
            className="BishopMessage-videoContainer"
            variants={containerVariants}
          >
            <motion.div
              className="BishopMessage-videoWrapper"
              variants={videoVariants}
              // Applied the vertical aspect ratio styling from Vimeo
              style={{ padding: "177.78% 0 0 0", position: "relative" }}
            >
              <iframe
                src="https://player.vimeo.com/video/1169142384?badge=0&autopause=0&player_id=0&app_id=58479"
                className="BishopMessage-video"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="bishop_feb_vide"
              />
              <div className="BishopMessage-videoOverlay"></div>
            </motion.div>

            {/* <Button
              size="medium"
              style={{ marginTop: "-45px" }}
              onClick={() => {
                console.log("hi");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              Play Full Message
            </Button> */}
          </motion.div>

          <motion.div
            className="BishopMessage-footer"
            variants={containerVariants}
          >
            <motion.p className="BishopMessage-date" variants={itemVariants}>
              Posted on the 1st of every month
            </motion.p>
            {/* <motion.button
              className="BishopMessage-ctaButton"
              variants={itemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              View Previous Messages
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </motion.button> */}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default BishopMessage;

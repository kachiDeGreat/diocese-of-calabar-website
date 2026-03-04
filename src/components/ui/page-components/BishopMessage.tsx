import React from "react";
import { motion, Variants } from "framer-motion";
import "../styles/BishopMessage.css";

function BishopMessage() {

  const videoLink = "https://www.facebook.com/reel/1445969566901359";
  
  const isVertical = videoLink.includes("/reel/");

  const encodedUrl = encodeURIComponent(videoLink);
  const iframeSrc = `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false`;

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const videoVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, delay: 0.3 },
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
            // AUTO-ADJUST: Switches between 400px (Reel) and 900px (Widescreen)
            style={{ maxWidth: isVertical ? "400px" : "900px", margin: "0 auto" }}
          >
            <motion.div
              className="BishopMessage-videoWrapper"
              variants={videoVariants}
              // AUTO-ADJUST: Switches between 177.78% (Reel) and 56.25% (Widescreen)
              style={{ paddingBottom: isVertical ? "177.78%" : "56.25%", position: "relative" }}
            >
              <iframe
                src={iframeSrc}
                className="BishopMessage-video"
                style={{
                  border: "none",
                  overflow: "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Bishop's New Month Message"
              />
              <div className="BishopMessage-videoOverlay"></div>
            </motion.div>
          </motion.div>

          <motion.div
            className="BishopMessage-footer"
            variants={containerVariants}
          >
            <motion.p className="BishopMessage-date" variants={itemVariants}>
              Posted on the 1st of every month
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default BishopMessage;
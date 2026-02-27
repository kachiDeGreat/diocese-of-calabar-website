import type React from "react";
import { CSSProperties } from "react";
import { motion, Variants } from "framer-motion";
import "./Archdeaconry.css";
import ArchdeaconryCard from "./ArchdeaconryCard";
import { ArchdeaconryData } from "../../data/archdeaconries";

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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface ArchdeaconryGridProps {
  data: ArchdeaconryData[];
  header?: string;
  title?: string;
  style?: CSSProperties;
}

const ArchdeaconryGrid: React.FC<ArchdeaconryGridProps> = ({ data, style }) => {
  return (
    <section
      className="arch-section"
      style={{
        marginTop: "40px",
        backgroundColor: "#fff",
        ...style,
      }}
    >
      <motion.div
        className="arch-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="arch-grid-item"
            variants={fadeInUp}
          >
            <ArchdeaconryCard
              image={item.image}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ArchdeaconryGrid;

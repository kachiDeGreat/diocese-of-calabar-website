import type React from "react";
import { CSSProperties } from "react";
import "./Archdeaconry.css";
import ArchdeaconryCard from "./ArchdeaconryCard";
import { ArchdeaconryData } from "../../data/archdeaconries";

interface ArchdeaconryGridProps {
  data: ArchdeaconryData[];
  header?: string;
  title?: string;
  style?: CSSProperties;
}

const ArchdeaconryGrid: React.FC<ArchdeaconryGridProps> = ({
  data,
  header,
  title,
  style,
}) => {
  return (
    <section
      className="arch-section"
      style={{
        marginTop: "40px",
        backgroundColor: "#fff",
        ...style,
      }}
    >
      {/* <div className="arch-header"> 
        <div className="arch-header-text">
          <span className="arch-header-sub">{header}</span>
          <h1 className="arch-title">{title}</h1>
        </div>
      </div> */}

      <div className="arch-grid">
        {data.map((item, index) => (
          <div key={index} className="arch-grid-item">
            <ArchdeaconryCard
              image={item.image}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArchdeaconryGrid;

import React from "react";
import { Link } from "react-router-dom";
import "./ArchdeaconryCard.css";

interface ArchdeaconryCardProps {
  image: string;
  title: string;
  description: string;
  link?: string;
}

const ArchdeaconryCard: React.FC<ArchdeaconryCardProps> = ({
  image,
  title,
  description,
  link = "#",
}) => {
  return (
    <div className="arch-card">
      <img src={image} alt={title} className="arch-card-image" />
      <div className="arch-card-content">
        <Link to={link} className="arch-card-title">
          {title}
        </Link>
        <br /><br />
        <p className="arch-card-description">{description}</p>
        <br />
        <Link to={link} className="arch-card-link">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArchdeaconryCard;

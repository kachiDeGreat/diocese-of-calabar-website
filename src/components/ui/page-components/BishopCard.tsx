import type React from "react";
import { Link } from "react-router-dom";
import "./BishopCard.css";

interface BishopCardProps {
  image: string;
  title: string;
  description: string;
  link?: string; // now optional
}

const BishopCard: React.FC<BishopCardProps> = ({
  image,
  title,
  description,
  link,
}) => {
  return (
    <div className="bishop-card">
      <div className="bishop-card-image-container">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="bishop-card-image"
        />
      </div>
      <div className="bishop-card-content">
        <h3 className="bishop-card-title">{title}</h3>
        <p className="bishop-card-description">{description}</p>

        {/* Only render if link exists */}
        {link && (
          <Link to={link} className="bishop-read-more-btn">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
};

export default BishopCard;

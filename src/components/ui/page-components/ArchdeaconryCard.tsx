import type React from "react";

interface ArchdeaconryCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const ArchdeaconryCard: React.FC<ArchdeaconryCardProps> = ({
  image,
  title,
  description,
  link,
}) => {
  return (
    <div className="arch-card">
      <div className="arch-card-image-container">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="arch-card-image"
        />
      </div>
      <div className="arch-card-content">
        <h3 className="arch-card-title">{title}</h3>
        <p className="arch-card-description">{description}</p>
        <a href={link} className="arch-read-more-btn">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArchdeaconryCard;

import React from "react";
import "./LocationCard.scss";
export default function LocationCard({ imageUrl, name }) {
  return (
    <div className="venue-card">
      <div className="venue-card__image-container">
        <img src={imageUrl} alt={name} className="venue-card__image" />
        <div className="venue-card__overlay">
          <div className="venue-card__content">
            <h2 className="venue-card__title">{name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

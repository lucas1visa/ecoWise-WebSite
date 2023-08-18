import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ productId }) => {
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem(`rating_${productId}`);
    return savedRating ? Number(savedRating) : 0;
  });

  const handleRatingClick = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${productId}`, value);
  };

  return (
    <div className="star-container">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          className={value <= rating ? 'star filled' : 'star'}
          onClick={() => handleRatingClick(value)}
        />
      ))}
    </div>
  );
};

export default StarRating;

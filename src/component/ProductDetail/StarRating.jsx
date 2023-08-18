import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const savedRating = localStorage.getItem('rating');
    if (savedRating) {
      setRating(Number(savedRating));
    }
  }, []);

  const handleRatingClick = (value) => {
    setRating(value);
    localStorage.setItem('rating', value);
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

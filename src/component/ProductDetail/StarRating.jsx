import React, {useState} from 'react'
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [ hover, setHover ] = useState(null);

  const ratingChange = (rating) => {
    alert(`nos ha dado ${rating} calificación de estrellas`)
  }


  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return ( 
        <label>
          <input 
          type="radio" 
          name="rating"
          value={ratingValue} 
          onClick={() => setRating = (ratingValue)}
          

          />
           <FaStar 
           className="star" 
           color={ratingValue < (hover || rating) ? "red" : "yellow" } 
           size={20}
           onMouseEnter={() => setHover = (ratingValue)}
          onMouseLeave={() => setHover = (null)}
          onChange={ratingChange}
           />
        </label>
        );
      })}
    </div>
  )
}

export default StarRating
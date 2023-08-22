import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReview } from "../../redux/actions/index";
import ReviewForm from "./ReviewForm";

const Review = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  return (
    <div>
      <h2 className="h2-review">Reseñas</h2>
      <ReviewForm />
      {reviews.length === 0 ? (
        <p>No hay reseñas disponibles.</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review, index) => (
            <li key={index}>
              <div className="review-item" key={index}>
                <h3 className="h3-review">Review {index + 1}</h3>
                <p className="p-rating">Rating: {review.rating}</p>
                <p className="p-comment">{review.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;

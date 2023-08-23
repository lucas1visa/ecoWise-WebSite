import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReview } from "../../redux/actions/index";
import ReviewForm from "./ReviewForm";
import "./Review.css"


const Review = ({idreview, UserId}) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  console.log(reviews)

  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  const rev = reviews.filter((el) => el.Products && el.Products.find((e) => e.id == idreview)) || [];

  console.log(rev)
  console.log(idreview)

  const firstTenReviews = rev.slice(0, 10); // Obtener las 10 primeras reseñas
 const averageRating = firstTenReviews.reduce((total, review) => total + review.rating, 0) / firstTenReviews.length;
 



  return (
    <div>
    <h4 className="h2-review">Reseñas</h4>
    <ReviewForm id={idreview} UserId={UserId} />

    {rev.length === 0 ? (
      <p>No hay reseñas</p>
    ) : (
      <div className="review-container">
        <div className="average-rating">
          <span className="ml-2 text-yellow-700 font-bold">
             Estrellas ({averageRating.toFixed(2)} / 5.00)
          </span>
        </div>

        <ul className="reviews-list">
          {rev.map((review, index) => (
            <li key={index}>
              <div className="review-item" key={index}>
              <h5 className="h6-review">Reseña {index + 1}:</h5>
                <p className="p-rating">Estrellas: {review.rating}</p>
                <p className="p-comment">{review.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  );
};

export default Review;

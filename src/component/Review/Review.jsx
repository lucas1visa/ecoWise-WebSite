import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReview } from "../../redux/actions/index";
import ReviewForm from "./ReviewForm";

const Review = ({idreview, UserId}) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  console.log(reviews)

  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  const rev = reviews.filter((el)=>el.Products.find((e)=> e.id == idreview))|| [];
  console.log(rev)
  console.log(idreview)


  return (
    <div>
      <h4 className="h2-review">Reseñas</h4>
      <ReviewForm id = {idreview} UserId = {UserId} />
      {rev.length === 0 ? (
        <p>No hay reseñas</p>
      ) : (
        <ul className="reviews-list">

          {rev.map((review, index) => (
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

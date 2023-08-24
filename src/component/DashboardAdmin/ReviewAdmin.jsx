import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../redux/actions";
import { Rating } from "@material-tailwind/react";

const RevivewAdmin = () =>{
    const dispatch = useDispatch()
    const reviews = useSelector((state)=>state.reviews || [])//esta global
    useEffect(()=>{
        dispatch(getReview())
    },[])
        return (
          <>
          {reviews.map((review) => (
  review.Products.map((product, productIndex) => (
    <div key={ productIndex} className="flex items-center gap-4 mb-8 mini-container-admin">
      <img
        src={product.image}
        className="w-14 h-14 object-cover rounded-full"
        alt="User"
      />
      <div className=" items-center">
     <Rating value={review.rating} readonly className="flex items-end"/>
        <h3 className="font-bold info-reseñas">
          {review.comment}
        </h3>
        <p className="text-gray-500">{review.review}</p>
      </div>
    </div>
  ))
))}
               
          </>
        )
      }
export default RevivewAdmin;
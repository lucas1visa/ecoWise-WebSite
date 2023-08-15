import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postPurcharse } from "../../redux/actions";
    const FeedbackCompras = () => {
        const dispatch = useDispatch
        const {payment_id,payment_type,status}=useParams()
        useEffect(()=>{
           const {userId,idProduct,quantity} = localStorage.getItem("cart");
           console.log(userId)

            dispatch(postPurcharse(payment_id,payment_type,status,userId,idProduct,quantity))
        },[])
        return (
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Gracias por comprar en ecoWise</h3>
            <p className="mb-4">Has adquirido <span className="font-semibold"></span> por $.</p>
            <p className="text-gray-600">Esperamos que disfrutes de tu compra. ¡Vuelve pronto!</p>
          </div>
        );
      };
export default FeedbackCompras;
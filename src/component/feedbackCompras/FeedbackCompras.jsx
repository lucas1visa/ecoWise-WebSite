import React from "react";
const FeedbackCompras = () => {
//   const dispatch = useDispatch();
//   const location = useLocation(); 

//   useEffect(() => {
//     const queryParams = queryString.parse(location.search); 
//     const { payment_id, payment_type, status} = queryParams;
//     const x = localStorage.getItem("cart");
//     const {userId,idProduct,quantity} = JSON.parse(x);
//     dispatch(postPurcharse(payment_id, payment_type, status, userId, idProduct, quantity));
//   }, []); // 

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Gracias por comprar en ecoWise</h3>
      <p className="mb-4">Has adquirido <span className="font-semibold"></span> por $.</p>
      <p className="text-gray-600">Esperamos que disfrutes de tu compra. ¡Vuelve pronto!</p>
    </div>
  );
};

export default FeedbackCompras;

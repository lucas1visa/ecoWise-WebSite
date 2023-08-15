import React from "react";
    const FeedbackCompras = ({ productName, price }) => {
        return (
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Gracias por tu compra</h3>
            <p className="mb-4">Has adquirido <span className="font-semibold">{productName}</span> por ${price}.</p>
            <p className="text-gray-600">Esperamos que disfrutes de tu compra. ¡Vuelve pronto!</p>
          </div>
        );
      };
export default FeedbackCompras;
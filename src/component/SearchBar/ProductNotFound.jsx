import React from 'react';

const ProductNotFound = () => {
  return (
    <div className="">
      <div className="bg-red-100 border border-red-400 text-red-700  rounded w-34 h-30 relative" role="alert">
        <h1 className="text-sm font-semibold">
          ¡Atención! No se encontró el producto que buscas.
        </h1>
      </div>
    </div>
  );
};

export default ProductNotFound;
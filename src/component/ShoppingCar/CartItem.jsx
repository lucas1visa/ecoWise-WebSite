import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';
import { BsFillCartXFill } from "react-icons/bs";

const CartItem = ( {product,handleCantidadChange,selectedCantidad,cartId,handleDelete} ) => {
  const dispatch = useDispatch();
  console.log(product)
  return (
  
    <div class="flex">

<td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
  <img
    src={product.image}
    alt={product.name}
    height={64}
    width={64}
    className={`hidden sm:inline-flex`}
    />
 
   <h6 class="overflow-hidden whitespace-nowrap w-24 overflow-ellipsis"> {product.name}</h6>
   {/* <h6 class="truncate">{product.name}</h6>otro ejemplo */}

 
</td>
<td className="font-primary font-medium px-4 sm:px-6 py-4">
  <select
    name="cantidad"
    id="cantidad"
    onChange={(event) => handleCantidadChange(event, cartId, product.price)}
    value={selectedCantidad.forEach(element => {})}
    className="text-gray-900 form-select border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
    >
    <option>0</option>
    {[...Array(product.quantityAvailable)].map((_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ))}
  </select>
</td>
<td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
  {product.price}
</td>
<td className="font-primary font-medium px-4 sm:px-6 py-4">
  <button onClick={() => handleDelete(product.id)} className=' hover:text-red-500'>
    Eliminar
  </button>
</td>
        </div>
  );
};

export default CartItem;

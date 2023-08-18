import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';

const CartItem = ( {product,handleCantidadChange,selectedCantidad,cartId} ) => {
  const dispatch = useDispatch();
  console.log(cartId)
  return (
    <div className='container-cart'>
      <h3>Nombre Del Producto: {product.name}</h3>
      <img src={product.image} alt={product.name} className='image-product-cart' />
      <p>Precio: {product.price}</p>

      <p>
        <label htmlFor="cantidad">Cantidad</label>
        <select
        name="cantidad"
        id="cantidad"
        onChange={(event) => handleCantidadChange(event, cartId,product.price)}
        value={selectedCantidad[cartId]?.cantidad || 1}
      >
        {[...Array(product.quantityAvailable)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      </p>
      
    </div>
  );
};

export default CartItem;

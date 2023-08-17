import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';

const CartItem = ( {product,handleCantidadChange,selectedCantidad,cartId} ) => {
  const dispatch = useDispatch();

  return (
    <div className='container-cart'>
      <h3>Nombre Del Producto: {product.name}</h3>
      <img src={product.image} alt={product.name} className='image-product-cart' />
      <p>Precio: {product.price}</p>
      <p>
        <label htmlFor="cantidad">Cantidad</label>
        <select name="cantidad" id="cantidad"  onChange={(event) => handleCantidadChange(event, cartId, product.id)}
        value={selectedCantidad[cartId]?.[product.id] || 1}>
          {[...Array(product.quantityAvailable)].map((_, index) => (//array spreading crea un array mediante un bucle
            <option key={index + 1} value={index + 1}>{/*Cada opción tiene un valor y texto igual al número  el key es para que react no de advertencia*/}
              {index + 1}
            </option>
          ))}
        </select>
      </p>
      
    </div>
  );
};

export default CartItem;

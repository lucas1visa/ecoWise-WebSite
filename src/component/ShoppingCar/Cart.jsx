import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito, removeFromCart } from '../../redux/actions/index';
import CartItem from './CartItem';
const Cart = () => {
  const cartItems = useSelector(state => state.cartItems);
  const [selectedCantidad, setSelectedCantidad] = useState({})// estado para la cantidad
  const userid = localStorage.getItem("userid");// id del usuario logueado
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCarrito())
  },[])
const cartUsers = cartItems.filter(e=>e.UserId == parseInt(userid))//filtramos usuarios segun el id
// Función para manejar el cambio de cantidad
const handleCantidadChange = (event, cartId, productId) =>{
  const newCantidad = parseInt(event.target.value);
  setSelectedCantidad((prevSelectedCantidad) => ({
    ...prevSelectedCantidad,
    [cartId]: {
      ...(prevSelectedCantidad[cartId] || {}),
      [cartId]: newCantidad,
    },
  }))
}
  return (
    <div>
  <h1>Carrito De Compras</h1>
  {cartUsers.map(item => (
    <div key={item.id}>
      {item.Products.map(product => (
        <CartItem
          key={product.id}
          product={product}
          cartId={item.id}
          cantidad={product.quantityAvailable}
          handleCantidadChange={handleCantidadChange}
          selectedCantidad={selectedCantidad}
        />
      ))}
    </div>
  ))}
  <p>Precio Total: ${
    cartItems.reduce((total, item) => {
      return ( total + item.Products.reduce((subtotal, product) => {
          const selected =selectedCantidad[item.id]?.[product.id] || 1;
          return subtotal + product.price * selected;
        }, 0)
      );
    }, 0)
  }</p>
</div>
  );}

export default Cart;
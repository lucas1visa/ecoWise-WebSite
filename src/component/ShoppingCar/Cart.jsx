import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito, removeFromCart } from '../../redux/actions/index';
import CartItem from './CartItem';
import MPButton from '../MPButton/MPButton';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems);//estado global de carrito
  const userid = localStorage.getItem("userid");
  const carrito = localStorage.getItem("carrito");
  const [selectedCantidad, setSelectedCantidad] = useState({});
  const [precioTotal, setPrecioTotal] = useState(0);

  const carritoParse = JSON.parse(carrito) || [];//parcear a json

  useEffect(() => {
    dispatch(getCarrito());
  }, [dispatch]);

  let cartToShow = cartItems; // let para sobrescribir

  if (!parseInt(userid)) {//caso no logueado
    const c = [{ UserId: null, Products: carritoParse || [] }];//carrito localstorage
    cartToShow = c;
  }
  const handleCantidadChange = (event, productId) => {
    const newCantidad = parseInt(event.target.value);
    setSelectedCantidad(e => ({
      ...e,
      [productId]: {
        ...e[productId],
        cantidad: newCantidad,
        productId: productId,
      },
    }));
  };
  // useEffect(() => {
  //   const total = cartItems.reduce((total, item) => {
  //     return total + item.Products.reduce((subtotal, product) => {
  //       const selected = selectedCantidad[item.id]?.[product.id] || 1;
  //       return subtotal + product.price * selected;
  //     }, 0);
  //   }, 0);
  //   setPrecioTotal(total);
  // }, [cartItems, selectedCantidad]);
  return (
    <div>
      <h1>Carrito De Compras</h1>
      {cartToShow.map(item => (
        <div key={item.Products.id}>
          {item.Products.map(product => (
            <CartItem
              key={product.id}
              product={product}
              cartId={product.id}
              cantidad={product.quantityAvailable}
              handleCantidadChange={handleCantidadChange}
              selectedCantidad={selectedCantidad}
            />
          ))}
        </div>
      ))}
      <p>Precio Total: ${precioTotal}</p>
      <MPButton titul={"ecoWise"} precio={precioTotal} cantidad={1} />
    </div>
  );
};

export default Cart;

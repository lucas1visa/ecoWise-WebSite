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

  
  const calcularPrecioTotal = () => {
    let total = 0;
    
  };

  const totalPrecio = calcularPrecioTotal();
  console.log(totalPrecio)

  


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
      <p>Precio Total: ${totalPrecio}</p>
      <MPButton titul={"ecoWise"} precio={totalPrecio} cantidad={1} />
    </div>
  );
};

export default Cart;

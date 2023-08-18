import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito, removeFromCart } from '../../redux/actions/index';
import CartItem from './CartItem';
import MPButton from '../MPButton/MPButton';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems);//estado global de carrito
  const userid = localStorage.getItem("userid");//id
  const carrito = localStorage.getItem("carrito");//carrito 
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
  const handleCantidadChange = (event, productId, price) => {
    const newCantidad = parseInt(event.target.value);


    cartToShow.filter((e)=>e.UserId == userid)
    setSelectedCantidad(prevSelectedCantidad => {
      const updatedProduct = {
        cantidad: newCantidad,
        productId: productId,
        precio: newCantidad * price
      };
      const updatedSelectedCantidad = { ...prevSelectedCantidad };
      updatedSelectedCantidad[productId] = updatedProduct;
      const resultArray = Object.values(updatedSelectedCantidad);

      return resultArray;
    });
  };
  const calcularPrecioTotal = () => {
    let total = 0;
    selectedCantidad.forEach(element => {
      
    });
  };

//   const totalPrecio = calcularPrecioTotal();
 
console.log(selectedCantidad)
  


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
      <p>Precio Total: ${100}</p>
      <MPButton titul={"ecoWise"} precio={100} cantidad={1} />
    </div>
  );
};

export default Cart;

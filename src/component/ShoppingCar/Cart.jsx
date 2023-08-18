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
  const [selectedCantidad, setSelectedCantidad] = useState([]);
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
  cartToShow.filter((e)=>e.UserId == userid)
  const handleCantidadChange = (event, productId, price) => {
    const newCantidad = parseInt(event.target.value);
  
    setSelectedCantidad(prevSelectedCantidad => {
      // Buscar el índice del producto en el array
      const index = prevSelectedCantidad.findIndex(producto => producto.productId === productId);
  
      if (index !== -1) {
        // Si el producto ya existe, actualiza su cantidad y precio
        const updatedProduct = {
          cantidad: newCantidad,
          productId: productId,
          precio: newCantidad * price
        };
  
        // Crear una copia del array y actualizar el producto en el índice correspondiente
        const updatedArray = [...prevSelectedCantidad];
        updatedArray[index] = updatedProduct;
  
        return updatedArray;
      } else {
        // Si el producto no existe en el array, añadirlo como un nuevo producto
        const newProduct = {
          cantidad: newCantidad,
          productId: productId,
          precio: newCantidad * price
        };
  
        return [...prevSelectedCantidad, newProduct];
      }
    });
  };
  
    let total = 0;
    selectedCantidad.forEach(element => {
      total += element.precio
    });
  
  console.log(selectedCantidad)

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
      <p>Precio Total: ${total}</p>
      <MPButton titul={"ecoWise"} precio={total} cantidad={1} />
    </div>
  );
};

export default Cart;

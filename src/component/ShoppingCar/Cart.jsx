import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito, removeFromCart } from '../../redux/actions/index';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  const [totalPrices, setTotalPrices] = useState([]);
  const [carritoTotals, setCarritoTotals] = useState([]); // Estado para almacenar totales individuales
  const [totalCarritoss, setTotalCarritos] = useState(0);
  
  

  
  useEffect(() => {
    dispatch(getCarrito());
  }, [dispatch]);

  useEffect(() => {
    const newTotalPrices = cartItems.map(item =>
      item.Products.reduce((acc, product) => {
        const total = product.price * product.quantitySelected;
        return acc + total;
      }, 0)
    );

    // Crear un objeto que mapee el ID del carrito a su total
    const newCarritoTotals = {};
    cartItems.forEach((item, index) => {
      newCarritoTotals[item.id] = newTotalPrices[index];
    });
    const safeCarritoTotals = {};
    Object.keys(newCarritoTotals).forEach(cartId => {
      safeCarritoTotals[cartId] = isNaN(newCarritoTotals[cartId]) ? 0 : newCarritoTotals[cartId];
    });

    setTotalPrices(newTotalPrices);
    setCarritoTotals(safeCarritoTotals); // Usar los totales seguros
    setTotalCarritos(0);
  }, [cartItems]);

  const handleDeleteCart = (cartId, productId) => {
    dispatch(removeFromCart(cartId, productId));
  };
  const handleSaveCartTotal = (cartId, total) => {
    setCarritoTotals(prevState => ({
      ...prevState,
      [cartId]: total,
    }));
  };
  const totalCarritos = Object.values(carritoTotals).reduce((acc, total) => acc + total, 0);
  const totalGeneralSafe = isNaN(totalCarritos) ? 0 : totalCarritos;

  return (
    <div>
      <h1>Carrito De Compras</h1>
      {cartItems.map(item => (
        <div key={item.id}>
          {item.Products.map(product => (
            <CartItem
              key={product.id}
              product={product}
              cartId={item.id}
              cartTotal={carritoTotals[item.id]} // Usar el total almacenado
              onSaveCartTotal={(cartId, total) => handleSaveCartTotal(cartId, total)} // Función para almacenar el total
              handleDeleteCart={handleDeleteCart}
            />
          ))}
          {console.log(carritoTotals[item.id])}
        </div>
      ))}
      <p>Total general de todos los carritos: {totalGeneralSafe}</p>
      
    </div>
  );}

export default Cart;
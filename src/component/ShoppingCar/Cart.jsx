import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito, removeFromCart } from '../../redux/actions/index';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarrito());
  }, [dispatch]);

  const handleDeleteCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <h1>Carrito De Compras</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          {item.Products.map((product) => (
            <CartItem key={product.id} product={product} handleDeleteCart={handleDeleteCart} />
          ))}
        </div>
      ))}
    </div>
  );
};

const CartItem = ({ product, handleDeleteCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div>
      <h3>Nombre Del Producto: {product.name}</h3>
      <img src={product.image} alt={product.name} />
      <p>
        <label htmlFor={`quantity-select-${product.id}`} className="texto">
          Cantidad
        </label>
        <select
          id={`quantity-select-${product.id}`}
          value={quantity}
          onChange={handleQuantityChange}
          className="form-select custom-select"
        >
          {Array.from({ length: product.quantityAvailable }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </p>
      <p>Precio: {product.price}</p>
      <h3>Total: {product.price * quantity}</h3>
      <button onClick={() => handleDeleteCart(product.id)}>Quitar</button>
      <br />
      <button>Finalizar Compras</button>
    </div>
  );
};

export default Cart;
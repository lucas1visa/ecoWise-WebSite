import { useSelector, useDispatch } from 'react-redux';
import { getCarrito, resetQuantity } from '../../redux/actions/index';
import { useEffect } from 'react';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  console.log(cartItems)
  
  useEffect(() => {
    dispatch(getCarrito());
  },[dispatch]); 


  const handleResetQuantity = (cartId) => {
    dispatch(resetQuantity(cartId));
  };
  
  return (
    <div>
      <h1>Carrito De Compras</h1>
        {cartItems.map((item) => (
        <div key={item.id}>
          {item.Products.map((product, index) => (
            <div key={product.id + index}>
              <h3>Nombre Del Producto: {product.name}</h3>
              <img src={product.image} alt={product.name} />
              <p>Cantidad: {product.quantityAvailable}</p>  
              <p>Precio: {product.price}</p>
              <h3>Total: {product.price * product.quantityAvailable}</h3>
            </div>
          ))}
          <button onClick={() => handleResetQuantity(item.id)}>Quitar</button>
          </div>
        ))}
    </div>
  );
};

export default Cart;

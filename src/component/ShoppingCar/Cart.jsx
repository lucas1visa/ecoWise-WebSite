import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarrito, removeFromCart } from '../../redux/actions/index';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarrito());
  }, [dispatch]);

  const handleDeleteCart = (cartId, productId) => {
    dispatch(removeFromCart(cartId, productId));
  };

  const [productTotals, setProductTotals] = useState({}); // Almacena los totales individuales de cada producto

  useEffect(() => {
    const newProductTotals = {};

    cartItems.forEach((item) => {
      item.Products.forEach((product) => {
        const total = product.price * product.quantitySelected;
        newProductTotals[product.id] = total;
      });
    });

    setProductTotals(newProductTotals);
  }, [cartItems]);

  const total = Object.values(productTotals).reduce((acc, val) => acc + val, 0);

  return (
    <div>
      <h1>Carrito De Compras</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          {item.Products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              cartId={item.id}
              handleDeleteCart={handleDeleteCart}
              productTotal={productTotals[product.id]} // Pasa el total del producto como prop
            />
          ))}
        </div>
      ))}
      <p>Suma total de precios de productos: {total}</p>
    </div>
  );
};

export default Cart;
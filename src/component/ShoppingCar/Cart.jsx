import { useSelector, useDispatch } from 'react-redux';
import { resetQuantity } from '../../redux/actions/index';
import {Link} from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleResetQuantity = (productId) => {
    dispatch(resetQuantity(productId));
  };
  
  return (
    <div>
      <h2>Carrito De Compras</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product.id}>
            {item.product.name} - Quantity: {item.quantity}
            <img src={item.product.image} alt={item.product.name} />
            <button onClick={() => handleResetQuantity(item.product.id)}>Quitar</button>
          </li>
        ))}
      </ul>
      <Link to='/' className='nav-link'>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Cart;

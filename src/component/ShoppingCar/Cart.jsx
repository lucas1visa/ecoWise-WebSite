import { useSelector, useDispatch } from 'react-redux';
import { getCarrito, /* resetQuantity, */ removeFromCart } from '../../redux/actions/index';
import { useEffect, useState} from 'react';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  console.log(cartItems)
  
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getCarrito());
  },[dispatch]); 


/*   const handleResetQuantity = (id) => {
    dispatch(resetQuantity(id));
  }; */

  const handleDeleteCart= (id) => {
    dispatch(removeFromCart(id));
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
              <p>
                
                  <label htmlFor="quantity-select" className="texto">Cantidad</label>
                    <select
                      id="quantity-select"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="form-select custom-select"
                    >
                      {Array.from(
                        { length: product.quantityAvailable },
                        (_, index) => index + 1
                      ).map((count) => (
                        <option
                          key={count}
                          value={count}
                          disabled={count > product.quantityAvailable}
                        >
                          {count}
                        </option>
                      ))}
                  </select> 
                </p>  
              <p>Precio: {product.price}</p>
              <h3>Total: {product.price * quantity}</h3>
            </div>
          ))}
          <button onClick={() => handleDeleteCart(item.id)}>Quitar</button>
          <br />
          <button>Finalizar Compras</button>
          </div>
        ))}
    </div>
  );
};

export default Cart;

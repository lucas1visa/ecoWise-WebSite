import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/index';

const CartItem = ({ product, cartId }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.quantitySelected || 1);

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleDeleteCart = () => {
        dispatch(removeFromCart(cartId, product.id));
    };

    const totalPrice = product.price * quantity;

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
            <h3>Total: {totalPrice}</h3>
            <button onClick={handleDeleteCart}>Quitar</button>
        </div>
    );
};

export default CartItem;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/index';
import '../ShoppingCar/Cart.css'

const CartItem = ({ product, cartId, cartTotal , onSaveCartTotal }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.quantitySelected || 1);

    const handleQuantityChange = e => {
        const newQuantity = Number(e.target.value);
        setQuantity(newQuantity);

        // Calcula el nuevo total después de cambiar la cantidad
        const newTotalPrice = product.price * newQuantity;
        const safeTotalPrice = isNaN(newTotalPrice) ? 0 : newTotalPrice;

        // Llama a la función para almacenar el nuevo total del carrito
        onSaveCartTotal(cartId, safeTotalPrice);
    };

    const handleDeleteCart = () => {
        dispatch(removeFromCart(cartId, product.id));
    };
    // const handleSaveCartTotal = () => {
    //     onSaveCartTotal(cartId, totalPrice); // Llamar a la función prop para almacenar el total
    // };

    const totalPrice = product.price * quantity;
    const safeCartTotal = isNaN(cartTotal) ? 0 : cartTotal;
    return (
        <div className='container-cart'>
            <h3>Nombre Del Producto: {product.name}</h3>
            <img src={product.image} alt={product.name} className='image-product-cart' />
            <p>
                <label htmlFor={`quantity-select-${product.quantityAvailable}`} className="texto">
                    Cantidad
                </label>
                <select
                    id={`quantity-select-${product.quantityAvailable}`}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="form-select custom-select"
                >
                    <option value="1">Seleccione cantidad</option> {/* Opción adicional */}
                    {Array.from({ length: product.quantityAvailable }, (_, index) => index + 1).map(count => (
                        <option key={count} value={count}>
                            {count}
                        </option>
                    ))}
                </select>
            </p>
            <p>Precio: {totalPrice}</p>
            
            {console.log(safeCartTotal)} {/* Mostrar el total del carrito aquí */}
            {/* <button onClick={handleSaveCartTotal}>Guardar Total</button> Agregar el botón para guardar el total */}
            <button onClick={handleDeleteCart}  className='quitar-product-cart'>❌</button>
        </div>
    );
};

export default CartItem;
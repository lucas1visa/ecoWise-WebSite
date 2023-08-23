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

  const carritoParse = JSON.parse(carrito) || //parcear a json

  useEffect(() => {
    dispatch(getCarrito());
  }, [cartItems]);


let cartToShow = cartItems // let para sobrescribir

  if (!parseInt(userid)) {//caso no logueado
    const c = [{ UserId: null, Products: carritoParse  }];//carrito localstorage
    cartToShow = c;
  }
  cartToShow.filter((e)=>parseInt(e.UserId) == parseInt(userid))
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
          precio: newCantidad * price,
          userId : userid
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
          precio: newCantidad * price,
          userId : userid
        };
  
        return [...prevSelectedCantidad, newProduct];
      }
    });
  };

  const handlersCantidadPrecio=()=>{
  const selectedCantidadJSON = JSON.stringify(selectedCantidad);
  localStorage.setItem('Compra', selectedCantidadJSON);
  }
    let total = 0;                        
    selectedCantidad.forEach(element => {
      total += element.precio
    });



    //Handler para eliminar tanto ala bd como asi tambien al localStorage




    const  handleDelete= async(productId)=>{
      if (parseInt(userid)) {
       await dispatch(removeFromCart(productId, parseInt(userid)));
      }
  
      const deleteCarrito = carritoParse.filter((e) => e.id !== productId);
      localStorage.setItem('carrito', JSON.stringify(deleteCarrito));
      await dispatch(getCarrito());
    }
  


  return (
    <div className="min-h-80 max-w-2xl my-4 sm:my-2 mx-auto">
        <thead>
          <tr className="uppercase  sm:text-sm  border-b border-palette-light">
            <th className="font-normal px-5">Producto</th>
            <th className="font-primary font-normal px-4 py-2">cantidad</th>
            <th className="font-primary font-normal px-4 py-4 hidden sm:table-cell">Precio</th>
            <th className="font-primary font-normal px-2 py-4">eliminar</th>
          </tr>
        </thead>
        <hr></hr> 
        {cartToShow.length >0 ? (
  cartToShow.map((item) => (
    <div key={item.Products.id}>
      <hr />
      {item.Products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          cartId={product.id}
          cantidad={product.quantityAvailable}
          handleCantidadChange={handleCantidadChange}
          selectedCantidad={selectedCantidad}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  ))
) : (
  <div>No hay productos agregados</div>
)}
      <hr />
      <p className="font-normal px-3"> Precio Total: ${total}</p>
      <MPButton titul={"ecoWise"} precio={total} cantidad={1} handlersCantidadPrecio={handlersCantidadPrecio}/>
      </div>
  );
};
export default Cart;

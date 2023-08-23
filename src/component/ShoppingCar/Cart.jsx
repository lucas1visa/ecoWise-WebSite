import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../../redux/actions/index';
import CartItem from './CartItem';
import MPButton from '../MPButton/MPButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Cart = () => {

  const dispatch = useDispatch()

  const [cartItems,setCartItems] = useState([])// info que me llega de carrito 
  
  const UserId = localStorage.getItem("userid");//id

  const carrito = localStorage.getItem("carrito");//carrito 

  const [selectedCantidad, setSelectedCantidad] = useState([])

  const carritoParse = JSON.parse(carrito) //parcear a json

  const fetchData = async () => {
    try {
      if (UserId) {
        const { data } = await axios.get(`/cart/?UserId=${UserId}`);
        if (data) {
          setCartItems(data);
        }
      }
    } catch (error) {
      console.error("Error al obtener datos del carrito:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(cartItems)

let cartToShow = cartItems // let para sobrescribir

  if (!parseInt(UserId)) {//caso no logueado

    const carritoLocalStorage = [{ UserId: null, Products: carritoParse  }];//carrito localstorage

    cartToShow = carritoLocalStorage;
  }

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
          userId : UserId
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
          userId : UserId
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

      if (parseInt(UserId)) {

        await dispatch(removeFromCart(productId, parseInt(UserId)))

       await fetchData();

      }
      const deleteCarrito = carritoParse.filter((e) => e.id !== productId);

      localStorage.setItem('carrito', JSON.stringify(deleteCarrito));

     await fetchData();
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
        {cartToShow.length > 0 ? (
  cartToShow.map((item) => (
    <div key={item.Products[0].id}>
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

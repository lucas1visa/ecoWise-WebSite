//import React from 'react';
import CategorySelect from "../Filters/Filter";
import Cart from "../ShoppingCar/Cart";

import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav, Button, Spinner } from "react-bootstrap";
import final from "../../Img/final.jpeg";
import "../Navbar/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import {
  orderProductsAlpha,
  orderProductsAlphant,
  orderProductsPricent,
  orderProductsPrice,
  getProducts,
} from "../../redux/actions";
import Search from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
// importamos todos los componentes de para el formulario de login
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Login from "../Login/Login";
// import AdminOrUser from "../../services/isAdmin";

const NavbarComponent = () => {
  const [selectedOrder, setSelectedOrder] = useState(""); // Estado para el select de ordenamiento
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para el select de categoría
  const location = useLocation();
  const productListRedux = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const favoriteCount = useSelector((state) => state.favoriteCount);
  const cartCount = useSelector((state) => state.cartCount);
  
  // // ============================================= MOSTRAR BOTON DE ADMIN ==================================================
  // // estado local que permite mostrar boton admin
  // const [showAdmin,setShowAdmin] = useState(false);

  // const [userData,setUserData] = useState(null);
  // // obtenemos desde la localstorage en caso de estar logueado el token, en caso de no estarlo nos dara 'null'
  // let tokenUser = localStorage.getItem('tokenDB');
  // // preguntamos si tenemos token, en caso de tener, pedimos al back la payload del token
  // useEffect(()=>{
  //     AdminOrUser(tokenUser).then((res)=>setUserData(res))
  // },[tokenUser])

  // console.log(userData);



  // ========================================================================================================================

     // ====================================== VENTANA EMERGENTE PARA CARRITO ============================================
  // estado del carrito para el modal.
  const [showCartForm, setShowCartForm] = useState({
    open: false
  });
  // estado para cerrar
  const [showCartClose,setShowCartClose]= useState(false);
  const [showCart, setShowCart]= useState(true);

  // manejador para abrir
    const HandleCartOpen = ()=>{
      setShowCartForm({
        open: !showCartForm.open
      })
    };

  // funcion de cerrado del carrito
  const handleCartClose = () =>{
    // mostramos el boton de login
    setShowCart(true);
    // dejamos de mostrar el boton de logout
    setShowCartClose(false);
  };

  const isHomePage = location.pathname === "/";


  const handleOrderChange = (e) => {
    const selectedOrder = e.target.value;
    setSelectedOrder(selectedOrder);

    switch (selectedOrder) {
      case "clean":
        dispatch(getProducts(productListRedux));
        setSelectedOrder(""); // Reinicia el valor del select de ordenamiento
        resetCategory(); // Reinicia el valor del select de categoría
        break;
      case "upward":
        dispatch(orderProductsAlpha(productListRedux));
        break;
      case "falling":
        dispatch(orderProductsAlphant(productListRedux));
        break;
      case "price":
        dispatch(orderProductsPrice(productListRedux));
        break;
      case "pricent":
        dispatch(orderProductsPricent(productListRedux));
        break;

      default:
        break;
    }
  };

  const resetCategory = () => {
    setSelectedCategory("");
  };

  return (
    <Navbar bg="violet" variant="dark" expand="lg" id="Navbar">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={final} alt="final" className="final" />
        </Link>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ml-auto">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/about" className="nav-link">
              Acerca
            </Link>
            <Link to="/contact" className="nav-link">
              Contacto
            </Link>
            <div>
              <Link to="/favorites" className="nav-linkk">
                {favoriteCount > 0 ? <button className="button-icon-cora">❤️</button> : <button className="button-icon-cora">🤍</button> }
              </Link>
                {favoriteCount > 0 && <span className="favorite-count">{favoriteCount}</span>}
                {cartCount > 0 && <span className="favorite-count">{cartCount}</span>}
            </div>
          </Nav>
{/* ///////////////////////////// MODAL CARRITO//////////////////////////////////////////////     */}      
        {showCartClose && <Button onClick={handleCartClose}>Salir</Button>}
        {showCart && <button className="button-icon-car" onClick={HandleCartOpen}>
        {cartCount > 0 && <h1 className="cart-count">{cartCount}</h1>}
        <ion-icon name="cart-outline"></ion-icon>
        </button>}
            <Modal isOpen={showCartForm.open}>
              <ModalHeader>
              </ModalHeader>
              <ModalBody>
               <Cart/>
              </ModalBody>
              <ModalFooter>
              <Button onClick={HandleCartOpen}>Cerrar</Button>
              
              </ModalFooter>
              </Modal>
{/* ///////////////////////////// TERMINA MODAL CARRITO//////////////////////////////////////////////     */} 
          {isHomePage && <Search />}

          {isHomePage && (
            <button
              className="prolijo-button"
              onClick={handleOrderChange}
              value="clean"
            >
            {<ion-icon onClick={handleOrderChange}  value="clean" name="reload-outline" ></ion-icon>}
            </button>
          )}

          <div className="ml-auto m-2">
            {isHomePage && <CategorySelect selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory} />}
          </div>

          {isHomePage && (
            <div className="">
              <select id="form-control" onChange={handleOrderChange} value={selectedOrder}>
                <option value="">Ordenar por</option>
                <option value="upward">Ordenar A-Z</option>
                <option value="falling">Ordenar Z-A</option>
                <option value="price">Mas Caros</option>
                <option value="pricent">Mas Baratos</option>
              </select>
            </div>
          )}
          {/* MOSTRAMOS EL BOTON DE ADMIN EN CASO DE QUE EL USUARIO LOGUEADO TENGA LA PROPIEDAD ADMIN EN TRUE */}
          {/* {showAdmin && <button className="btn-admin"><Link className="link-admin" to="/admin">Admin</Link></button>} */}
          <button className="btn-admin"><Link className="link-admin" to="/admin">Admin</Link></button>
      <Login/>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
};

export default NavbarComponent;

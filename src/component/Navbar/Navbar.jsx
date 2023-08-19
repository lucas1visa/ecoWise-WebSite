//import React from 'react';
import CategorySelect from "../Filters/Filter";
import Cart from "../ShoppingCar/Cart";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav, Button, Spinner } from "react-bootstrap";
import plantita from "../../Img/plantita.png";
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

const NavbarComponent = () => {
  const [selectedOrder, setSelectedOrder] = useState(""); // Estado para el select de ordenamiento
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para el select de categoría
  const location = useLocation();
  const productListRedux = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const CartCount = useSelector((state) => state.cartCount);
  const admin = localStorage.getItem("admin")
  console.log(admin)
 
  const [favoriteCount, setFavoriteCount] = useState(0); // contador favoritos
  const userId = localStorage.getItem('userid');
  const favoritesStorage = localStorage.getItem('favorito');
  const favParse = JSON.parse(favoritesStorage) || [];

  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    if (parseInt(userId)) {
      setFavoriteCount(favorites.length);
    } else {
      setFavoriteCount(favParse.length);
    }
  }, [favorites, favParse, userId]);

  // ====================================== VENTANA EMERGENTE PARA CARRITO ============================================
  // estado del carrito para el modal.
  const [showCartForm, setShowCartForm] = useState({
    open: false
  });
  // estado para cerrar
  const [showCartClose, setShowCartClose] = useState(false);
  const [showCart, setShowCart] = useState(true);

  // manejador para abrir
  const HandleCartOpen = () => {
    setShowCartForm({
      open: !showCartForm.open
    })
  };

  // funcion de cerrado del carrito
  const handleCartClose = () => {
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
          <img src={plantita} alt="final" className="final ml-10" />

        </Link>
        <h3 className=" font-bold pr-12 pt-3 text-primary-900 mx-auto">ecoWise</h3>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ml-auto ">
            <Link to="/" className="nav-link text-black">
              Inicio
            </Link>
            <Link to="/about" className="nav-link text-black">
              Acerca
            </Link>
            <Link to="/contact" className="nav-link text-black">
              Contacto
            </Link>
            <div>{/* DEJEN ESTO ASÍ 🙄 */}
              <Link to="/favorites" className="nav-linkk">
              <button className="button-icon-cora">🤍</button>
              </Link>
              {/* esto va afuera para que no agarre los estilos predeterminados de la etiqueta Link, no afecta en nada su funcionamientos */}
              {favoriteCount > 0 && <span className="favorite-count">{favoriteCount}</span>}
            </div>
          </Nav>
{/* ///////////////////////////// MODAL CARRITO//////////////////////////////////////////////     */}      
        {showCartClose && <Button onClick={handleCartClose}>Salir</Button>}
        {showCart && <button className="button-icon-car" onClick={HandleCartOpen}>
        <ion-icon name="cart-outline"></ion-icon>
        {CartCount > 0 && <span className="favorite-count">{CartCount}</span>}
        </button>}
            <Modal isOpen={showCartForm.open}>
              <ModalHeader>
              <Button onClick={HandleCartOpen}>Cerrar</Button>
              </ModalHeader>
              <ModalBody>
               <Cart/>
              </ModalBody>
              <ModalFooter>
              
              </ModalFooter>
              </Modal>
{/* ///////////////////////////// TERMINA MODAL CARRITO//////////////////////////////////////////////     */} 
          {isHomePage && <Search/>}

          {isHomePage && (
            <button
              className="prolijo-button"
              onClick={handleOrderChange}
              value="clean"
            >
            <ion-icon name="refresh-outline">↻</ion-icon>   
           </button> //NO PONERLE ICONOS AL BOTON XD <<<<--------------------------------------------------------------------
            //LISTO NI PARA VOS NI PARA MI 
          )}

          <div className="ml-auto m-2">
            {isHomePage && <CategorySelect selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory} />}
          </div>

          {isHomePage && (
            <div className="">
              <select className="form-control" onChange={handleOrderChange} value={selectedOrder}>
                <option value="">Orden</option>
                <option value="upward">Orden A-Z</option>
                <option value="falling">Orden Z-A</option>
                <option value="price">Mas Caros</option>
                <option value="pricent">Mas Baratos</option>
              </select>
            </div>
          )}
          {admin == 'true' && (
            <button className="btn-admin">
              <Link className="link-admin" to="/admin">Admin</Link>
            </button>
          )}
          <Login />
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default NavbarComponent;

//import React from 'react';
import CategorySelect from "../Filters/Filter";

import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav, Button, Spinner } from "react-bootstrap";
import eco from "../../Img/eco.png";
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
// importamos la funcion de validacion para los inputs
import validate from "./validate";
// importamos la funcion para despachar los datos y nos devuelva el token
import { LoginUser } from "../../services/tokenlogin";

const NavbarComponent = () => {
  const [selectedOrder, setSelectedOrder] = useState(""); // Estado para el select de ordenamiento
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para el select de categoría
  const location = useLocation();
  const productListRedux = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const favoriteCount = useSelector((state) => state.favoriteCount);
  const CartCount = useSelector((state) => state.cartCount);

  // ====================================== VENTANA EMERGENTE PARA LOOGIN ============================================
  // estado para controlar la apertura o cierre de la ventana emergente
  const [showFormLogin, setShowFormLogin] = useState({
    open: false
  });
  // estado local para controlar la informacion en los inputs 
  const [valuesInputs, setValuesInputs] = useState({
    email: "",
    password: ""
  });
  // estado para mostrar el boton de logout
  const [showLogout,setShowLogout]= useState(false);
  // estado para mostrar el boton de login
  const [showLogin, setShowLogin]= useState(true);
  // estado para almacenar los errores de los inputs
  const [err, setErr] = useState({});
  // funcion para captura la informacion y almacenarla en el estado local
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValuesInputs({ ...valuesInputs, [name]: value })
  };
  // funcion para cerrar el login
  const handleLogin = () => {
    setShowFormLogin({
      open: !showFormLogin.open
    })
  }
  // funcion para despachar la informacion de los inputs y almacenarlo en la DB
  const handleSubmitLogin = async(e) => {
    e.preventDefault();
    // controlamos y validamos los inputs
    let errorinput = validate(valuesInputs);
    // en caso de que exista algun error los almacenamos en el estado local
    setErr(errorinput);
    //si no existe ningun error despachamos la info
    if (Object.keys(errorinput).length === 0) {
      // despachamos la informacion y obtenemos el valor del token
      let infotoken = await LoginUser(valuesInputs);
      console.log(infotoken.newToken);
      // comprobamos el resultado del token, si el usuario y password fueron validados debera devolver
      // un token, en caso contrario devolvera un objeto vacio
      if (Object.getOwnPropertyNames(infotoken.newToken).length){
        // almacenamos la informacion en localstorage del navegador
        localStorage.setItem("tokenUser",infotoken.newToken);
        //dejamos de mostrar el componente login
        setShowFormLogin({
          open: false
        });
        // limpiamos los inputs
        setValuesInputs({
          email: "",
          password: ""
        })
        // dejamos de mostrar el boton de login
        setShowLogin(false);
        // mostramos el boton de logout
        setShowLogout(true);
        console.log('se envio che');
      } else {
        console.log('Hubo error en encontrar el usuario o validar su password');
      }
    } else {
      console.log('hay errores man');
    }
  };
  // funcion para elimanar el token y mostar el boton de login
  const handleLogout = () =>{
    // quitamos la informacion almacenada en la localstorage
    localStorage.removeItem('tokenUser');
    // mostramos el boton de login
    setShowLogin(true);
    // dejamos de mostrar el boton de logout
    setShowLogout(false);
  }
  // =========================================================================================================================

  const isHomePage = location.pathname === "/" || location.pathname === "/favorites";


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
          <img src={eco} alt="ecoWise" className="ecoWise" />
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
            <div className="container-car">
              <Link to="/Cart" className="nav-linkk">
                <button className="button-icon-car">
                  <ion-icon name="cart-outline"></ion-icon>
                  {CartCount > 0 && <span className="favorite-count">{CartCount}</span>}
                </button>
              </Link>
            </div>
            <div>
              <Link to="/favorites" className="nav-linkk">
                <button className="button-icon-cora">🤍</button>
                {favoriteCount > 0 && <span className="favorite-count">{favoriteCount}</span>}
              </Link>
            </div>
          </Nav>

          {isHomePage && <Search />}

          {isHomePage && (
            <Button
              className="prolijo-button"
              onClick={handleOrderChange}
              value="clean"
            >
              ↻
              {/* <ion-icon onClick={handleOrderChange}  value="clean" name="reload-outline" ></ion-icon> */}
            </Button>
          )}

          <div className="ml-auto m-2">
            {isHomePage && <CategorySelect selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory} />}
          </div>

          {isHomePage && (
            <div className="">
              <select className="form-control" onChange={handleOrderChange} value={selectedOrder}>
                <option value="">Order By</option>
                <option value="upward">Order A-Z</option>
                <option value="falling">Order Z-A</option>
                <option value="price">Mas Caros</option>
                <option value="pricent">Mas Baratos</option>
              </select>
            </div>
          )}

      {/*=============================================== REGISTRO DE LOGIN ================================================= */}
      {showLogout && <Button onClick={handleLogout}>Salir</Button>}
      {showLogin && <Button onClick={handleLogin}>Iniciar</Button>}
      <Modal isOpen={showFormLogin.open}>
        <ModalHeader>
          Iniciar Sesion
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitLogin}>
            <FormGroup>
              <Label>email</Label>
              <Input type="text" name="email" value={valuesInputs.email} onChange={handleChangeInput} />
              <p>{err.email}</p>
            </FormGroup>
            <FormGroup>
              <Label>password</Label>
              <Input type="password" name="password" value={valuesInputs.password} onChange={handleChangeInput} />
              <p>{err.password}</p>
            </FormGroup>
            <Button color="primary" type="submit">Iniciar Sesion</Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleLogin}>Cerrar</Button>
          <Link to="/account/register/">Registrate</Link>
          <Link>Recuperar Password</Link>
        </ModalFooter>
      </Modal>
      {/* ============================================= TERMINACION DE LOGIN ====================================================== */}
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
};

export default NavbarComponent;

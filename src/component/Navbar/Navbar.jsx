//import React from 'react';
import CategorySelect from "../Filters/Filter";
import Cart from "../ShoppingCar/Cart";
import { useSelector, useDispatch } from "react-redux";
// import { Navbar, Container, Nav, Button, Spinner } from "react-bootstrap";
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
import { Modal, ModalHeader } from "reactstrap";
import Login from "../Login/Login";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";

const NavbarComponent = () => {
  const [selectedOrder, setSelectedOrder] = useState(""); // Estado para el select de ordenamiento
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para el select de categoría
  const location = useLocation();
  const productListRedux = useSelector((state) => state.products);
  const dispatch = useDispatch();
  //const CartCount = useSelector((state) => state.cartCount);
  //console.log(CartCount)
  const admin = localStorage.getItem("admin");
  console.log(admin);
  const userId = localStorage.getItem("userid");
  const [cartCount, setCartCount] = useState(0);
  const cartStorage = localStorage.getItem("carrito");
  const cartParse = JSON.parse(cartStorage) || [];

  useEffect(() => {
    if (parseInt(userId)) {
      setCartCount(
        cartParse.reduce((total, product) => total + product.cantidad, 0)
      );
    } else {
      setCartCount(cartParse.length);
    }
  }, [cartParse, userId]);

  const [favoriteCount, setFavoriteCount] = useState(0); // contador favoritos

  const favoritesStorage = localStorage.getItem("favorito");
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
    open: false,
  });
  // estado para cerrar
  const [showCartClose, setShowCartClose] = useState(false);
  const [showCart, setShowCart] = useState(true);

  // manejador para abrir
  const HandleCartOpen = () => {
    setShowCartForm({
      open: !showCartForm.open,
    });
  };

  // funcion de cerrado del carrito
  const handleCartClose = () => {
    // mostramos el boton de login
    setShowCart(true);
    // dejamos de mostrar el boton de logout
    setShowCartClose(false);
  };

  const isHomePage = location.pathname === "/";

  const handleHomeLinkClick = () => {
    // Comprueba si ya estás en la página de inicio antes de hacer algo
    if (location.pathname === "/") {
      // Ejecuta la acción para obtener todos los productos nuevamente
      dispatch(getProducts(productListRedux));
    }
  };

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
    <Navbar className="mx-auto max-w-screen-xl px-4 py-3 bg-primary-202">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        <Typography className="mr-4 ml-2 cursor-pointer py-1.5 text-green-500  flex">
        <Link to="/" className="navbar-brand" onClick={handleHomeLinkClick}>
          <img src={plantita} pathname="/" alt="final" className="final ml-10"  />
          </Link>
          <p className="mt-2 ml-2 font-bold pr-12  text-primary-900">ecoWise</p>
        </Typography>
        <div className="ml-auto flex gap-1 md:mr-4">
          <IconButton variant="text" color="blue-gray" className=" mr-5">
            <Link to="/favorites">
              <button className="button-icon-cora">
                <ion-icon name="heart-outline"></ion-icon>{" "}
                {favoriteCount > 0 && (
                  <span className="favorite-count">{favoriteCount}</span>
                )}{" "}
              </button>
            </Link>
          </IconButton>
          <IconButton variant="text" color="blue-gray" className=" ">
            {showCartClose && <Button onClick={handleCartClose}>Salir</Button>}

            <div className="ml-auto flex gap-1 md:mr-4">
              {showCart && (
                <button className="button-icon-cora" onClick={HandleCartOpen}>
                  <ion-icon name="cart-outline"></ion-icon>
                  {cartCount > 0 && (
                    <span className="favorite-count">{cartCount}</span>
                  )}
                </button>
              )}
            </div>
            <Modal isOpen={showCartForm.open} className="mx-auto">
              <ModalHeader>
                <Button onClick={HandleCartOpen}>Cerrar</Button>
              </ModalHeader>

              <Cart />
            </Modal>
          </IconButton>

          {admin == "true" && (
            <button className="btn-admin">
              <Link className="link-admin" to="/admin">
                Admin
              </Link>
            </button>
          )}
          <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <a
                href="/"
                className="flex items-center  text-black no-underline hover:bg-red font-bold text-xl"
              >
                Inicio
              </a>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium "
            >
              <a
                href="/contact"
                className="flex items-center  text-black no-underline hover:bg-red font-bold text-xl"
              >
                Contacto
              </a>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="red"
              className="flex items-center  text-black no-underline hover:bg-red font-bold text-xl"
            >
              <a
                href="/about"
                className="flex items-center  text-black no-underline hover:bg-red font-bold"
              >
                Acerca
              </a>
            </Typography>
          </ul>
          <div className="ml-auto m-2">
            {isHomePage && (
              <CategorySelect
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            )}
          </div>
          {isHomePage && (
            <div className="ml-auto m-2">
              <select
                className="form-control"
                onChange={handleOrderChange}
                value={selectedOrder}
              >
                <option value="">Orden</option>
                <option value="upward">Orden A-Z</option>
                <option value="falling">Orden Z-A</option>
                <option value="price">Mas Caros</option>
                <option value="pricent">Mas Baratos</option>
              </select>
            </div>
          )}
        </div>
        <Login />
      </div>

      <Search></Search>
    </Navbar>
  );
};

export default NavbarComponent;

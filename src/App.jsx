import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001"
// axios.defaults.baseURL = "https://ecowise-server01.onrender.com"

import Home from './component/Home/Home';
import { getProducts } from './redux/actions';
import NavbarComponent from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import UserProfile from './component/UserProfile/UserProfile';
import Cart from './component/ShoppingCar/Cart';
import ProductDetail from "./component/ProductDetail/ProductDetail"
import Favorites from "./component/Favorites/Favorites"
import About from './component/About/About';
import LoadingScreen from './component/Loading/Loading';
import Contacto from './component/Contacto/Contacto';
import DashboardAdmin from './component/DashboardAdmin/DashboardAdmin';
import RoutesProtected from './component/RoutesProtected/RoutesProtected';
import FormularioPRO from './component/FormUser/FormUser';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isDashboardAdmin = location.pathname.includes("/admin");
  const tokenadmin = localStorage.getItem('admin');
  
  useEffect(() => {
    dispatch(getProducts())
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
      
      <div>
        {!isDashboardAdmin && <NavbarComponent />}
      {isLoading && <LoadingScreen />}{/* Mostrar LoadingScreen siempre que isLoading sea true */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<RoutesProtected tokenadmin={tokenadmin}/>}>
            <Route path="/admin" element={<DashboardAdmin/>} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/account/register/" element={<FormularioPRO/>} />
          <Route path="/Cart" element={<Cart />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contacto/>} />
        </Routes>
        {!isDashboardAdmin && <Footer />}
      </div>
  );
}

export default App;

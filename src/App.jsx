import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import './App.css'
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
import Home from './component/Home/Home';
import { getProducts } from './redux/actions';
import NavbarComponent from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import UserProfile from './component/UserProfile/UserProfile';
import NewProduct from './component/NewProduct/NewProduct';
import Cart from './component/ShoppingCar/Cart';
import ProductDetail from "./component/ProductDetail/ProductDetail"
import Favorites from "./component/Favorites/Favorites"
import About from './component/About/About';
import LoadingScreen from './component/Loading/Loading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="App-container">
      <div className="container">
        <div><NavbarComponent /></div>
        {isLoading && <LoadingScreen />} {/* Mostrar LoadingScreen siempre que isLoading sea true */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/account/register/" element={<UserProfile />} />
          <Route path="/product/register/" element={<NewProduct />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <div><Footer /></div>
      </div>
    </div>
  );
}

export default App;

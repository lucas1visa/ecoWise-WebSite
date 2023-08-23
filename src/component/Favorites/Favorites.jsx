import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Favorites.css"
import {removeFav} from "../../redux/actions";
import axios from "axios";

const Favorites = () => {
  const dispatch = useDispatch()

  const [favoritoItems,setFavoritoItems] = useState([])// info que me llega de carrito 
  
  const UserId = localStorage.getItem("userid");//id

  const favorito = localStorage.getItem("favorito");//carrito 

  const FavoritoParse = JSON.parse(favorito) //parcear a json

  const fetchData = async () => {
    try {
      if (UserId) {
        const { data } = await axios.get(`/favorits/?UserId=${UserId}`);
        if (data) {
          setFavoritoItems(data);
        }
      }
    } catch (error) {
      console.error("Error al obtener datos del carrito:", error);
    }
  }


  useEffect(() => {

    fetchData();

  }, []);

let favoritoToShow = favoritoItems // let para sobrescribir

  if (!parseInt(UserId)) {//caso no logueado

    const favoritoLocalStorage = [{ UserId: null, Products: FavoritoParse  }];//carrito localstorage

    favoritoToShow = favoritoLocalStorage;
  }

    //Handler para eliminar tanto ala bd como asi tambien al localStorage

    const  handleDelete= async(productId)=>{

      if (parseInt(UserId)) {

        await dispatch(removeFav(productId, parseInt(UserId)))

       await fetchData();

      }
      const deleteFavorito = FavoritoParse.filter((e) => e.id !== productId);

      localStorage.setItem('favorito', JSON.stringify(deleteFavorito));

     await fetchData();
    }
  


  return (
<div >
  <h2 className="h2-favo">Tus Favoritos</h2>
  {favoritoToShow.length  === 0  ? (
    <p>No Tienes Favoritos 🥹</p>
  ) : (
    <ul className="favoritos-lista">
      {favoritoToShow.map((product, index) => (
        <li key={index}>
          {product.Products.map((Carla, index) => (
            <div className="favorito-item" key={index} >
              <Link to={`/product/${Carla.id}`} className="product-link">
                <img className="image-favo" src={Carla.image} alt={Carla.name} />
                <h3 className="h2-favo">{Carla.name}</h3>
                <p className="h2-description">{Carla.description}</p>
                <p className="h2-price">Precio: ${Carla.price}</p>
              </Link>
              <div className="button-delete-fav">
              <button onClick={() => handleDelete(Carla.id)} >
                ❎
              </button></div>
            </div>
          ))}
        </li>
      ))}
    </ul>
  )}
  <Link to="/" className="home-link">
    Volver a la Página de Inicio
  </Link>
</div>
);
};

export default Favorites;
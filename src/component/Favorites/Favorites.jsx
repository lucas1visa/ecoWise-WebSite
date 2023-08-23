import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Favorites.css"
import {getFav ,removeFav} from "../../redux/actions";

const Favorites = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userid');
  const favoritesStorage = localStorage.getItem('favorito')
  const favorites = useSelector((state) => state.favorites);
  const favParse = JSON.parse(favoritesStorage) || [];//parcear a json

  
  useEffect(() => {
    dispatch(getFav());
  }, [dispatch]);

  let cartToShow = favorites;

  if (!parseInt(userId)) {
    let c = [{ UserId: null, Products: favParse || [] }];
    cartToShow = c;
  }

  const handleRemoveFav = async (idProduct) => {
    if (parseInt(userId)) {
      console.log(idProduct, userId);
      dispatch(removeFav(idProduct, parseInt(userId)));
    }

    const deleteFav = favParse.filter((e) => e.id !== idProduct);
    localStorage.setItem('favorito', JSON.stringify(deleteFav));
    dispatch(getFav());
  }
  return (
<div >
  <h2 className="h2-favo">Tus Favoritos</h2>
  {cartToShow.length === 0 ? (
    <p>No Tienes Favoritos 🥹</p>
  ) : (
    <ul className="favoritos-lista">
      {cartToShow.map((product, index) => (
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
              <button onClick={() => handleRemoveFav(Carla.id)} >
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
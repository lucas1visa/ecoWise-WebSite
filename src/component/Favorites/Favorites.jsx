import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Favorites.css"
import { constants } from "buffer";
import {getFav } from "../../redux/actions";


const Favorites = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userid');
  const favoritesStorage = localStorage.getItem('favorito')
  const favorites = useSelector((state) => state.favorites);
  console.log('este es favoritos numero2: ' + JSON.stringify(favorites, null, 2))

  const favParse = JSON.parse(favoritesStorage) || [];//parcear a json

  useEffect(() => {
    dispatch(getFav());
  }, [dispatch]);

/*   let favToShow = favorites; // let para sobrescribir

  if (!parseInt(UserId)) {//caso no logueado
    const c = [{ UserId: null, Products: carritoParse || [] }];//carrito localstorage
    cartToShow = c; */

return (
  <div>
    <h2 className="h2-favo">Tus Favoritos</h2>
    {favorites.length === 0 ? (
      <p>No Tienes Favoritos 🥹</p>
    ) : (
      <ul className="favoritos-lista">
        {favorites.map((product) => (
          product.Products.map((Carla )=>{
            return (
              <div key={Carla.id}>
            <Link to={`/product/${Carla.id}`} className="product-link"> 
                <img className="image-favo" src={Carla.image} alt={Carla.name} />
                <h3 className="h2-favo">{Carla.name}</h3>
                <p className=" h2-description">{Carla.description}</p>
                <p className=" h2-price" >Precio: ${Carla.price}</p>
            <button onClick={() => handleRemoveFav(Carla.id)} className="button-delete-fav">
            ❎
            </button>
           </Link> 
              </div>
            )
/*           <li key={Carla.id } className="favorito-item">
          </li> */
          })
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
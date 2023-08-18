import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Favorites.css"
import { constants } from "buffer";


const Favorites = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userid');
  const favoritesStorage = localStorage.getItem('favorito')
  const favorites = useSelector((state) => state.favorites);
  console.log('este es favoritos numero2: ' + JSON.stringify(favorites, null, 2))


return (
  <div>
    <h2 className="h2-favo">Tus Favoritos</h2>
    {favorites.length == 0 ? (
      <p>No Tienes Favoritos 🥹</p>
    ) : (
      <ul className="favoritos-lista">
        {favorites.map((product, index) => (
          <li key={product.name + index} className="favorito-item">
            <Link to={`/product/${product.id}`} className="product-link">
          
              <img className="image-favo" src={product.image} alt={product.name} />
              <h3 className="h2-favo">{product.name}</h3>
              <p className=" h2-description">{product.description}</p>
              <p className=" h2-price" >Precio: ${product.price}</p>
            
            </Link>
            <button onClick={() => handleRemoveFav(product.id)} className="button-delete-fav">
            ❎
            </button>
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
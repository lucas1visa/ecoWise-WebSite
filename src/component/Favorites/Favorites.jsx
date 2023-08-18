import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeFav, setFavorites } from "../../redux/actions";
import { Link } from 'react-router-dom';
import "./Favorites.css"


const Favorites = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userid');
  const fav = useSelector((state) => state.favorites);

  



return (
  <div>
    <h2 className="h2-favo">Tus Favoritos</h2>
    {fav.length === 0 ? (
      <p>No Tienes Favoritos 🥹</p>
    ) : (
      <ul className="favoritos-lista">
        {fav.map((product) => (
          <li key={product.id} className="favorito-item">
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
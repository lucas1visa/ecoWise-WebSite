import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getId, addFav } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import MPButton from "../MPButton/MPButton";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();

  

  const product = useSelector((state) => state.detail[0]);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const favorites = useSelector((state) => state.favorites);
  console.log(quantity);
  const [state, setState] = useState({
    loading: true,
  });

  useEffect(() => {
    dispatch(getId(id));
    setTimeout(() => {
      setState({ ...state, loading: false });
    }, 500);
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product.id, quantity));
  };

  const handleAddFavorite = () => {
    if (!favorites.find((favProduct) => favProduct.id === product.id)) {
      dispatch(addFav(product));
    }
  };

  const handleGoBack = () => {
    window.history.back(); 
  };

  return (
    <div className="custom-container">
      <div className="container-fluid">
        <main className="row">
          <div className="col-md-6">
            {state.loading ? (
               <div className="loading-container">
               <div className="loading-spinner"> </div>
             </div>
             
            ) : (
              product && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid"
                />
              )
            )}
          </div>
          <div className="col-md-6 d-flex align-items-center">
            {state.loading ? (
              <p></p>
            ) : (
              product ? (
                <>
                  <div className="product-info">
                    <h2 className="h2-name">{product.name}</h2>
                  <p>{product.description}</p>
                  <p>Precio: ${product.price}</p>
                  <p>Cantidad disponible: {product.quantityAvailable}</p>
                  <p>Categoría: {product.category}</p>
                  {favorites.find(
                    (favProduct) => favProduct.id === product.id
                  ) ? (
                    <p className="corazon-red-fav">❤️</p>  
                  ) : (
                    <button
                      className="btn btn-button"
                      onClick={handleAddFavorite}
                    >
                      🤍
                    </button>
                  )}
                  <div className="quantity-select d-flex align-items-center ms-sm-5">
                    <label htmlFor="quantity-select" className="texto">Cantidad</label>
                    <select
                      id="quantity-select"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="form-select custom-select"
                    >
                      {Array.from(
                        { length: product.quantityAvailable },
                        (_, index) => index + 1
                      ).map((count) => (
                        <option
                          key={count}
                          value={count}
                          disabled={count > product.quantityAvailable}
                        >
                          {count}
                        </option>
                      ))}
                    </select>
                    <div className="btn-container">
                      <Link to="/cart" className="btn-link">
                        <button 
                          className="btn-button"
                          onClick={handleAddToCart}
                        >
                          Agregar al carrito
                        </button>
                      </Link>
                      <MPButton
                        titul={product.name}
                        precio={product.price}
                        cantidad={quantity}
                      />
                       <button className="btn-button" onClick={handleGoBack}>
          Volver 
        </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>No se encontró el producto</p>
            )
            )} 
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetail;

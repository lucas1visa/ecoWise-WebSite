import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getId, addFav } from "../../redux/actions/index";
import { useParams } from "react-router-dom";


import MPButton from "../MPButton/MPButton";
import "./ProductDetail.css";

const ProductDetail = ({productId, setShowModal}) => {
  const { id } = useParams();
  const product = useSelector((state) => state.detail[0]);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const favorites = useSelector((state) => state.favorites);
  console.log(quantity);
  const [state, setState] = useState({
    loading: true,
  });
  const [addToCartText, setAddToCartText] = useState("Agregar al carrito");

  useEffect(() => {
    dispatch(getId(productId || id)); 
    setTimeout(() => {
      setState({ ...state, loading: false });
    }, 1000);
  }, [dispatch, id, productId]);

 


  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
    setAddToCartText("Agregado al carrito");
  };

  const handleAddFavorite = () => {
    if (!favorites.find((favProduct) => favProduct.id === product.id)) {
      dispatch(addFav(product));
    }
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

                    <div className="btn-container">  
                    <button className="btn-button" onClick={handleAddToCart}>
                  {addToCartText}
                </button>
                      <MPButton
                        titul={product.name}
                        precio={product.price}
                        cantidad={quantity}
                      />
                  
        
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
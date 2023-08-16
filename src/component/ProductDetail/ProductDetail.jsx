import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getId, addFav } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import MPButton from "../MPButton/MPButton";
import "./ProductDetail.css";

const ProductDetail = ({ productId, setShowModal }) => {
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
  const handlerClicks = ()=>{
   const userId = localStorage.getItem("userid")
   console.log(userId)
    const info = {
      userId:userId,
      idProduct: product.id,
      quantity: 3
    }
    localStorage.setItem("cart", JSON.stringify(info));

  }

  return (
    <div className="custom-container">
      <div className="container-fluid">
        <main className="row">
          <div className="col-md-6">
            {state.loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
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
            ) : product ? (
              <div className="product-info">
                <h2 className="h2-name">{product.name}</h2>
                <p className="p-description">{product.description}</p>
                <p className="p-price">Precio: ${product.price}</p>
                <p className="p-description">
                  Cantidad disponible: {product.quantityAvailable}
                </p>
                <p className="p-description">Categoría: {product.category}</p>
                <div className="corazon-red-fav">
                  {favorites.find(
                    (favProduct) => favProduct.id === product.id
                  ) ? (
                    <p>❤️</p>
                  ) : (
                    <button onClick={handleAddFavorite}>🤍</button>
                  )}
                </div>
                <div className="quantity-select d-flex align-items-center ms-sm-5">
                  <div className="btn-container">
                    <button
                      className="btn btn-button"
                      onClick={handleAddToCart}
                    >
                      {addToCartText}
                    </button>
                    <button onClick={handlerClicks()}>
                    <MPButton
                    
                      titul={product.name}
                      precio={product.price}
                      cantidad={quantity}
                        productId={ product.id}
                        userId= {1} 
                        quantity= {quantity}
                    /></button>
                  </div>
                </div>
              </div>
            ) : (
              <p>No se encontró el producto</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetail;

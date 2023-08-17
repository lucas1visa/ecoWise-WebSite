import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getId, addFav } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = ({ productId}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { id } = useParams();
  const product = useSelector((state) => state.detail[0]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const userid = localStorage.getItem("userid");
  const [addToCartText, setAddToCartText] = useState("Agregar al carrito");
  const handleAddToCart = () => {
    const userIdAsNumber = parseInt(userid)
    if (userIdAsNumber) {
      dispatch(addToCart(product.id,userid));

      setAddToCartText("Agregado al carrito");
    } else {
      const existingCart = localStorage.getItem("carrito");
      let cart = [];
      if (existingCart) {
        cart = JSON.parse(existingCart);
      }
      cart.push(product);
      localStorage.setItem("carrito", JSON.stringify(cart));
      setAddToCartText("Agregado al carrito");
    }
  };

  const handleAddFavorite = () => {
    if (!favorites.find((favProduct) => favProduct.id === product.id)) {
      dispatch(addFav(product));
    }
  };

  const handlerClicks = () => {
    const info = {
      userId: userid,
      idProduct: product.id,
      quantity: 3,
    };
    localStorage.setItem("cart", JSON.stringify(info));
  };

  const [state, setState] = useState({
    loading: true,
  });

  useEffect(() => {
    dispatch(getId(productId || id));
    setTimeout(() => {
      setState({ ...state, loading: false });
    }, 1000);
  }, []);
  
  return (
    <div className="container-fluid">
      <main className="row">
        <div className="col-md-6">
          {state.loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            product && (
              <div className="d-flex flex-column align-items-center">
                <h1 className="h2-name ml-7">{product.name}</h1>
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid ml-6"
                />
                <div className="quantity-select d-flex align-items-center">
                  <div className="btn-container">
                    <button
                      className="btn-button-green mx-auto"
                      onClick={() => {
                        handleAddToCart();
                        setIsButtonDisabled(true);
                      }}
                      disabled={isButtonDisabled}
                    >
                      {isButtonDisabled ? 'Agregado al carrito' : addToCartText}
                    </button>
                    {/* <button onClick={handlerClicks()}>
                      <MPButton
                        titul={product.name}
                        precio={product.price}
                        cantidad={quantity}
                      />
                    </button> */}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="col-md-6 d-flex flex-column">
          {state.loading ? (
            <p></p>
          ) : product ? (
            <div className="">
              <h1 className="p-description">{product.description}</h1>
              <p className="p-price">Precio: ${product.price}</p>
              <p className="p-description">
                Stock: {product.quantityAvailable}
              </p>
              <p className="p-description"> {product.category}</p>
              <div className="corazon-red-fav">
                {favorites.find(
                  (favProduct) => favProduct.id === product.id
                ) ? (
                  <p>❤️</p>
                ) : (
                  <button  onClick={handleAddFavorite}>🤍</button>
                )}
              </div>
            </div>
          ) : (
            <p>No se encontró el producto</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;

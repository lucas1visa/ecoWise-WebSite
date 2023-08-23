import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getId, addFav } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import Review from "../Review/Review";




const ProductDetail = ({ productId }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { id } = useParams();
  const product = useSelector((state) => state.detail[0]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const userid = localStorage.getItem("userid"); //traemos el usuario
  const [addToCartText, setAddToCartText] = useState("Agregar al carrito");
  const [isFavorited, setIsFavorited] = useState(false); //para favoritos agregados

  const existingFav1 = localStorage.getItem("favorito");
  const existingFav2 = JSON.parse(existingFav1);

  const handleAddToCart = () => {
    const userIdAsNumber = parseInt(userid); //tipo numero
    if (userIdAsNumber) {
      if (product.stock >= 1) {
        // Cambiado a mayor o igual que 1
        const quantityToAdd = Math.min(1, product.stock); // Asegura que no se agreguen más unidades que el stock disponible
        dispatch(addToCart(product.id, userid, quantityToAdd)); // Pasa la cantidad a agregar
        setAddToCartText("Agregado al carrito");
        product.stock -= quantityToAdd; // Resta la cantidad agregada al stock
      } else {
        alert("Este producto se encuentra fuera de stock");
      }
    } else {
      const existingCart = localStorage.getItem("carrito"); // me traigo carrito
      let cart = [];
      if (existingCart) {
        //si tengo carrito
        cart = JSON.parse(existingCart);
      }

      if (product.stock >= 1) {
        // Cambiado a mayor o igual que 1
        const quantityToAdd = Math.min(1, product.stock); // Asegura que no se agreguen más unidades que el stock disponible
        cart.push(product); //agregar
        localStorage.setItem("carrito", JSON.stringify(cart)); //agrega nueva info al carrito localstorage
        setAddToCartText("Agregado al carrito");
        product.stock -= quantityToAdd; // Resta la cantidad agregada al stock
      } else {
        alert("Este producto se encuentra fuera de stock");
      }
    }
  };

  const handleAddFavorite = () => {
    console.log("handleAddFavorite called: " + userid);
    const userIdNumber = parseInt(userid); // aca lo parseo a numero porque llega en texto plano.
    if (userIdNumber) {
      dispatch(addFav(product.id, userid)); // aca despacho a la funcion addfav la informacion parseada de userid y la informacion del producto.
    } else {
      const existingFav = localStorage.getItem("favorito");
      let fav = [];
      if (existingFav) {
        fav = JSON.parse(existingFav);
      }
      if (!fav.some((favProduct) => favProduct.id === product.id)) {
        fav.push(product);
        localStorage.setItem("favorito", JSON.stringify(fav)); // se vuelve a parsear a texto plano para que se setee en el localstorage.
        setIsFavorited(true);
        console.log("isFavorited set to true: " + setIsFavorited);
      }
    }
  };

  const [state, setState] = useState({
    loading: true,
  });
  const favoritoAgregado = () => {
    if (existingFav2 && existingFav2.length) {
      if (existingFav2.find((e) => e.id == productId)) setIsFavorited(true);
    }
  };

  useEffect(() => {
    dispatch(getId(productId || id));
    favoritoAgregado();
    setTimeout(() => {
      setState({ ...state, loading: false });
    }, 1000);
  }, [dispatch]);

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
                      {isButtonDisabled ? "Agregado al carrito" : addToCartText}
                    </button>
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
                <button
                  onClick={() => {
                    console.log("Button clicked: " + isFavorited);
                    handleAddFavorite();
                  }}
                  disabled={isFavorited}
                >
                  {isFavorited ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          ) : (
            <p>No se encontró el producto</p>
          )}
          <Review idreview= {productId}/>
          
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getId,addFav} from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import StarRating from "./StarRating";

const ProductDetail = ({ productId}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { id } = useParams();
  const product = useSelector((state) => state.detail[0]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const userid = localStorage.getItem("userid");//traemos el usuario
  const [addToCartText, setAddToCartText] = useState("Agregar al carrito");

  const handleAddToCart = () => {
    const userIdAsNumber = parseInt(userid)//tipo numero
    if (userIdAsNumber) {
      dispatch(addToCart(product.id,userid));//con la info producto y el usuario
      setAddToCartText("Agregado al carrito");
    } else {
      const existingCart = localStorage.getItem("carrito");// me traigo carrito 
      let cart = [];
      if (existingCart) {//si tengo carrito
        cart = JSON.parse(existingCart);
      }
      cart.push(product);//agregar
      localStorage.setItem("carrito", JSON.stringify(cart));//agrega nueva info al carrito localstorage
      setAddToCartText("Agregado al carrito");
    }
  };

  const handleAddFavorite = () => {
   const userIdNumber = parseInt(userid) // aca lo parseo a numero porque llega en texto plano.
   if(userIdNumber){
    dispatch(addFav(product.id, userid)) // aca despacho a la funcion addfav la informacion parseada de userid y la informacion del producto.
   } else{
    const existingFav = localStorage.getItem("favorito")
    let fav = [];
    if(existingFav){
      fav = JSON.parse(existingFav)
    }
    fav.push(product.id);
    localStorage.setItem("favorito", JSON.stringify(fav));// se vuelve a parsear a texto plano para que se setee en el localstorage.
   }
  }

  const [state, setState] = useState({
    loading: true,
  });

  useEffect(() => {
    dispatch(getId(productId || id));
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
                      {isButtonDisabled ? 'Agregado al carrito' : addToCartText}
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="col-md-6 d-flex flex-column">
          <div>
          <StarRating/>
          </div>
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
                {/* {favorites.Products.find(
                  (favProduct) => favProduct.id === product.id
                ) ? (
                  <p>❤️</p>
                ) : ( */}
                  <button  onClick={handleAddFavorite}>🤍</button>
                {/* )} */}
              </div>
            </div>
          ) : (
            <p>No se encontró el producto</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductDetail

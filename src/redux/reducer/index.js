import {
  GETPRODUCTS,
  GET_ID,
  ADD_FAV,
  REMOVE_FAV,
  GET_TO_CART,
  REMOVE_FROM_CART,
  GET_CATEGORY,
  SEARCH_PRODUCTS,
  RESET_QUANTITY,
  GETUSERS,
  ACTUALIZAR_PRODUCTO
} from "../actions/Types";

const inicialState = {
  products: [],
  detail: {},
  favorites: [],
  cartItems: [],
  filtered: [],
  favoriteCount: 0,
  cartCount: 0,
  users:[],
  productoActualizado: []
};

const reducer = (state = inicialState, actions) => {
  actions.payload;
  console.log(actions.payload);
  /* let existingCartItem; */
  switch (actions.type) {
    case GETPRODUCTS:
      return {
        ...state,
        products: actions.payload,
      };

    case GET_ID:
      return {
        ...state,
        detail: actions.payload,
      };

    case ADD_FAV:
      console.log("Adding to favorites:", actions.payload);
      return {
        ...state,
       favorites: [...state.favorites, actions.payload],
        favoriteCount: state.favoriteCount + 1,
      };
     

    case REMOVE_FAV:
      return {
        ...state,
        favorites: state.favorites.filter(
          (product) => product.id !== actions.payload
        ),
        favoriteCount: state.favoriteCount - 1,
      };
    

      case GET_TO_CART:
        return{
          ...state,
          cartItems: actions.payload,
          cartCount: [...state.cartItems + 1]
        }


    case RESET_QUANTITY: {
      const itemToReset = state.cartItems.find(
        (item) => item.product.id === actions.payload
      );

      if (!itemToReset) {
        return state;
      }

      const updatedCartItems = state.cartItems.filter(
        (item) => item.product.id !== actions.payload
      );

      return {
        ...state,
        cartItems: updatedCartItems - itemToReset.quantity
      };
    }

    case REMOVE_FROM_CART: {
      return{
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.id !== actions.payload
        ),
        cartCount: state.cartCount - 1,
      }
    }

    case GET_CATEGORY:
      return {
        ...state,
        products: actions.payload,
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: actions.payload,
      };
      case GETUSERS:
        return {
          ...state,
          users: actions.payload
        };
        case ACTUALIZAR_PRODUCTO:
          return{
            ...state,
            productoActualizado: actions.payload
          }

    default:
      return {
        ...state,
      };
  }
};




export default reducer;

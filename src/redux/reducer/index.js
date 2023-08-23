import {
  GETPRODUCTS,
  GET_ID,
  GET_TO_CART,
  REMOVE_FROM_CART,
  GET_CATEGORY,
  SEARCH_PRODUCTS,
  GET_FAV,
  ADD_REVIEW,
  RESET_QUANTITY,
  GET_REVIEW,
  GETUSERS,
} from "../actions/Types";

const inicialState = {
  products: [],
  detail: {},
  favorites: [],
  reviews: [],
  cartItems: [],
  filtered: [],
  cartCount: 0,
  users:[],
  productoActualizado: []
};

const reducer = (state = inicialState, actions) => {
  actions.payload;
  console.log(actions.payload);
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

      case GET_REVIEW:
        return {
          ...state,
         reviews: actions.payload,
        }; 

        case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, actions.payload]
      };
      
    case GET_FAV:
      return {
        ...state,
       favorites: actions.payload,
      }; 

      case GET_TO_CART:
        return{
          ...state,
          cartItems: actions.payload,
          cartCount: actions.payload.length,
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
    default:
      return {
        ...state,
      };
  }
};




export default reducer;

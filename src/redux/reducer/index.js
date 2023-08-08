import {
  GETPRODUCTS,
  GET_ID,
  ADD_FAV,
  REMOVE_FAV,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_CATEGORY,
  SEARCH_PRODUCTS,
  RESET_QUANTITY,
} from "../actions/Types";

const inicialState = {
  products: [],
  detail: {},
  favorites: [],
  cartItems: [],
  filtered: [],
  favoriteCount: 0,
  cartCount: 0,
};

const reducer = (state = inicialState, actions) => {
  actions.payload;
  console.log(actions.payload);
  let existingCartItem;
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
    

    case ADD_TO_CART:
      existingCartItem = state.cartItems.find(
        (item) => item.product.id === actions.payload.product.id
      );

      if (existingCartItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product.id === actions.payload.product.id
              ? { ...item, quantity: item.quantity + actions.payload.quantity }
              : item
          ),
          cartCount: state.cartCount + actions.payload.quantity, 
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              product: actions.payload.product,
              quantity: actions.payload.quantity,
            },
          ],
          cartCount: state.cartCount + actions.payload.quantity, 
        };
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
        cartItems: updatedCartItems,
        cartCount: state.cartCount - itemToReset.quantity,
      };
    }

    case REMOVE_FROM_CART: {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.product.id !== actions.payload
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
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

    default:
      return {
        ...state,
      };
  }
};
export default reducer;

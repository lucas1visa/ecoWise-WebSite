import axios from "axios";

import {
  GETUSERS,
  GETPRODUCTS,
  POSTPRODUCTS,
  POSTUSER,
  GET_ID,
  ADD_FAV,
  REMOVE_FAV,
  ADD_TO_CART,
  GET_TO_CART,
  REMOVE_FROM_CART,
  GET_CATEGORY,
  SEARCH_PRODUCTS,
  DELETELOGICAL,
  ACTUALIZAR_PRODUCTO,
  POSTPURCHARSE
 /*  RESET_QUANTITY */
} from "./Types";
import { async } from "@firebase/util";

export const getUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/users");
    dispatch({ type: GETUSERS, payload: data });
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/products");
    dispatch({ type: GETPRODUCTS, payload: data });
  };
};
export const deletLogical = (id)=>{
  console.log(id)
  return async (dispatch)=> {
    const res = await axios.put(`/users/deletelogical/${id}`)
    dispatch({ type: DELETELOGICAL, payload: res });

  }
}

export const postProduct = (product) => {
  return async (dispatch) => {
    const res = await axios.post("/products", product);
    dispatch({ type: POSTPRODUCTS, payload: res });
  };
};

export const postUser = (user) => {
  return async (dispatch) => {
    const res = await axios.post("/users", user);
    dispatch({ type: POSTUSER, payload: res });
  };
};

export function getId(id) {
  return async (dispatch) => {
    const { data } = await axios.get(`/products/search/${id}`);
    dispatch({ type: GET_ID, payload: data });
    console.log(data)
  };
}

export function addFav(product) {
  console.log(product)
  return async function (dispatch) {
    try {
      await axios.post(
        `/favorits`,
        product
      );
      console.log('hola ' + product )
      return dispatch({
        type: ADD_FAV,
        payload: product,
      });
    } catch (error) {
      console.log("addFav not found", error);
    }
  };
   }

   export function removeFav(id) {
    return async function (dispatch) {
      try {
        await axios.delete(
          `/favorits`
        );
        return dispatch({
          type: REMOVE_FAV,
          payload: id, 
        });
      } catch (error) {
        console.log("removeFav not found", error);
      }
    };
  }
  
  export const addToCart = (id, UserId ) => {
    return async function(dispatch){
      try {
        const resAddCart = await axios.post(`/cart`, id, UserId );
        console.log(resAddCart);
        return dispatch({
        type: ADD_TO_CART,
         payload: 
         resAddCart
        })
      } catch (error) {
        console.log('error al crear el producto en el carrito:'+ error)
      }
    }
  }

  export const getCarrito = () => {
    return async function(dispatch){
      try {
       const {data} =  await axios.get(`/cart`);
       console.log('este es mi restcart:', JSON.stringify(data, null, 2))
        return dispatch({
          type: GET_TO_CART,
          payload: data
        })
      } catch (error) {
        console.log('error al crear el producto en el carrito:'+ error)
      }
    }
  }

/* export const resetQuantity = (productId) => {
  console.log('id del producto ' + productId)
  return {
    type: RESET_QUANTITY,
    payload: productId,
  };
};
 */
export const removeFromCart = (id) => {
  console.log('este es el id del removeFromCard ' + id);
  return async function (dispatch) {
    try {
      await axios.delete(
        `/cart/delete/${id}`
      );
      return dispatch({
        type: REMOVE_FROM_CART,
        payload: id, 
      });
    } catch (error) {
      console.log("removeCart not found", error);
    }
  };
};

export const orderProductsAlpha = (list) => {

  return async function (dispatch) {

    const products = list.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    dispatch({ type: GETPRODUCTS, payload: [...products] })
  }
}

export const orderProductsAlphant = (list) => {

  return async function (dispatch) {

    const products = list.sort(function (a, b) {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    })
    dispatch({ type: GETPRODUCTS, payload: [...products] })
  }
}

export const orderProductsPrice = (list) => {

  return async function (dispatch) {

    const products = list.sort(function (a, b) {
      return     b.price - a.price
    })
    dispatch({ type: GETPRODUCTS, payload: [...products] })
  }
}

export const orderProductsPricent = (list) => {

  return async function (dispatch) {

    const products = list.sort(function (a, b) {
      return       a.price - b.price
    })
    dispatch({ type: GETPRODUCTS, payload: [...products] })
  }
}

export const filterByCategory = (category) => {
  return{
    type:"FILTER_BY_CATEGORY", payload: category
  
  }
}

export function getCategory(category) {
  return async (dispatch) => {
    const { data } = await axios.get(`/products/sea?category=${category}`);
    dispatch({ type: GET_CATEGORY, payload: data });
    console.log(data)
  };
}


export const searchPrducts = (name)=>{
  return async (dispatch) => {
  const res = await axios.get(`products/?name=${name}`);
  dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
};
};


export function actualizarProducto(id, quantityAvailable, price) {
  return async function (dispatch) {
    try {
      await axios.put(
        `/update`,
        id, quantityAvailable, price
      );
      console.log('Este es el producto Actualizado: ' + id, quantityAvailable, price )
      return dispatch({
        type: ACTUALIZAR_PRODUCTO,
        payload: id, quantityAvailable, price
      });
    } catch (error) {
      console.log("No se pudo agregar la nueva Informacion: ", error);
    }
  };
}
export const postPurcharse =  (payment_id,payment_type,status,userId,idProduct,quantity)=>{
  const data = {
    payment_id: payment_id,
    payment_type: payment_type,
    status: status,
    userId: userId,
    quantity: quantity,
    idProduct: idProduct
  };
  return async (dispatch)=>{
    try {
      const res = await axios.post("/pay",data)
      dispatch({type: POSTPURCHARSE , payload:res})
    } catch (error) {
      console.log("Error en cargar datos")
    }
  }
}
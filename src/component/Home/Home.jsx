
import CardProducts from "../CardProducts/CardProducts";
import "./Home.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"; 
import queryString from "query-string"; 
import { postPurcharse } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch()
  const location = useLocation()
    const queryParams = queryString.parse(location.search); 
    const { payment_id, payment_type, status} = queryParams;
    console.log(payment_id)
    if(!payment_id === null){
    const x = localStorage.getItem("cart");
    const {userId,idProduct,quantity} = JSON.parse(x);
    dispatch(postPurcharse(payment_id, payment_type, status, userId, idProduct, quantity));
    }
  
  return (
    <div className="container">
      <div className="text-center m-4 title-container">
      <img
            src="https://cdn-icons-png.flaticon.com/512/743/743007.png"
            alt=""
            className="title-icon"
          />
        <h6 className="font-weight-bold"></h6>
      </div>
      <CardProducts />
    </div>
  );
};

export default Home;

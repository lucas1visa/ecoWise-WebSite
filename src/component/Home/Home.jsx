import CardProducts from "../CardProducts/CardProducts";
import "./Home.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"; 
import queryString from "query-string"; 
import { postPurcharse } from "../../redux/actions";
import Swal from "sweetalert2";
import { FcApproval } from "react-icons/fc";
import Presentation from "./presentation/Presentation";



const Home = () => { 
  const dispatch = useDispatch()
  const location = useLocation()
  const queryParams = queryString.parse(location.search); 
  const { payment_id, payment_type, status , token} = queryParams;
  console.log(token);
if(payment_id){
  useEffect(() => {
    if (payment_id !== null) {
      Swal.fire({
        icon: 'success',
        title: 'Gracias por su compra',
        text: 'Espero que lo disfrute',
        footer: 'Cualquier inconveniente envíe un correo con su consulta',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
      }).then(() => {
        window.location.href = "https://ecowise-web-site.vercel.app"; // Redirige a la página especificada
      });
      
      const x = localStorage.getItem("cart");
      const { userId, idProduct, quantity } = JSON.parse(x);
      dispatch(postPurcharse(payment_id, payment_type, status, userId, idProduct, quantity));
    }
    
  }, [dispatch, payment_id, payment_type, status]);
}
if(token){
  Swal.fire({
    icon: 'info',
    title: 'Solicito Cambio de Password',
    text: 'Oprima el boton OK',
    footer: 'Cualquier inconveniente envíe un correo con su consulta',
    showConfirmButton: true,
    confirmButtonText: 'OK'  
  }).then(() => {
    localStorage.setItem('idpass',token);
    window.location.href = "https://ecowise-web-site.vercel.app/changepassword"; // Redirige a la página especificada
  });
  // localStorage.setItem('idpass',token);
  // window.location.href = "https://ecowise-web-site.vercel.app/changepassword"
}
  return (
    <div>
      {/* <Presentation/> */}
      <div className="text-center m-4 title-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/743/743007.png"
          alt=""
          className="title-icon"
        />
      </div>
      <CardProducts />
      </div>
  );
};

export default Home;

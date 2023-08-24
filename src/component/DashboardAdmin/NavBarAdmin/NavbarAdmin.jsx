import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../../../App.css'
import './NavbarAdmin.css'
import { useDarkMode } from "../../DarkModeContext/DarkMode";

import { FcAddDatabase,FcBarChart,FcApprove,FcHome,FcPrevious,FcNext,FcBadDecision} from "react-icons/fc";
const NavbarAdmin = ({handleComponentChange}) => {

  const { isDarkMode } = useDarkMode();

  const [menu, SetMenu] = useState(false);
  return (
    <div className={isDarkMode ? 'modo-oscuro' : 'cart-modo-normal'}>
      <div
       className={`bg-primary-100 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 navbar-admin ${
        menu ? "left-0" : "-left-full"
      }`}
      >
        {/* Perfil */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src="https://res.cloudinary.com/dms4i7mjo/image/upload/v1692817148/mnqc9trzggl8oey6jizf.jpg"
            className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
          />
          <h1 className="text-xl text-white font-bold h1-admin">Administrador</h1>
          <p className="bg-primary-900 py-2 px-4 rounded-full text-white p-admin">
            Administrador
          </p>
        </div>
        {/* Nav */}
        <div className="bg-primary-900 p-8 rounded-tr-[100px] h-[70vh] overflow-y-scroll flex flex-col justify-between gap-8 menu-izq">
          <nav className="flex flex-col gap-8">
             <Link to="/"className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-100/50 transition-colors text-decoration-none" ><FcHome /> Inicio</Link> 
             <button className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-100/50 transition-colors text-decoration-none" onClick={() => handleComponentChange("newProduct")}><FcAddDatabase />Productos </button> 
             <button className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-100/50 transition-colors text-decoration-none" onClick={() => handleComponentChange("default")}><FcBarChart />Data</button> 
             <button  className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-100/50 transition-colors text-decoration-none"  onClick={() => handleComponentChange("userControl")}><FcBadDecision /> Usuarios</button> 
          </nav>
          <div className="bg-primary-900/50 text-white p-4 rounded-xl problema-admin">
            <p className="text-gray-400">¿Tienes problemas?</p>
            <Link to="/contact" className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-100/50 transition-colors text-decoration-none" >Contactanos</Link> 

          </div>
        </div>
      </div>
      {/* Boton para celular */}
      <button
        onClick={() => SetMenu(!menu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50 button-mobile"
      >
        {menu ? <FcPrevious /> : <FcNext />}
      </button>
    </div>
  );
};

export default NavbarAdmin;

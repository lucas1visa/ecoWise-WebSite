import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
RiHome3Line,
RiFileCopyLine,
RiWalletLine,
RiPieChartLine,
RiMore2Fill,
RiCloseFill,
} from "react-icons/ri";
const NavbarAdmin = () => {
const [menu, SetMenu] = useState(false);
return (
<>
<div
className={`bg-primary-900 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
menu ? "left-0" : "-left-full"
}`}
>
{/* Perfil */}
<div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
<img
src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
/>
<h1 className="text-xl text-white font-bold">Lucas Julian Visa</h1>
<p className="bg-primary-100 py-2 px-4 rounded-full text-white">
Administrador
</p>
</div>
{/* Nav */}
<div className="bg-primary-300 p-8 rounded-tr-[100px] h-[70vh] overflow-y-scroll flex flex-col justify-between gap-8">
<nav className="flex flex-col gap-8">
<a
href="#"
className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors "
>
<RiHome3Line /> <Link to="/">Inicio</Link>
</a>
<a
href="#"
className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
>
<RiFileCopyLine /> <Link to="/product/register/">Agregar Productos</Link>
</a>
<a
href="#"
className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
>
<RiWalletLine /> Compras de usuarios
</a>
<a
href="#"
className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
>
<RiPieChartLine /> Analisis
</a>
<a
href="#"
className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
>
<RiHome3Line /> Gestion de usuarios
</a>
</nav>
<div className="bg-primary-100/50 text-white p-4 rounded-xl" >
<p className="text-gray-400">¿Tienes problemas?</p>
<a href="#">Contactanos</a>
</div>
</div>
</div>
{/* Boton para celular */}
<button
onClick={() => SetMenu(!menu)}
className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
>
{menu ? <RiCloseFill /> : <RiMore2Fill />}
</button>
</>)
};

export default NavbarAdmin
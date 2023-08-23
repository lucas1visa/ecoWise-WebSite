import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import '../../../App.css'
import './Header.css'
import { useDarkMode } from "../../DarkModeContext/DarkMode";

const HeaderAdmin =()=>{
    const { isDarkMode } = useDarkMode();
return(
<div className={isDarkMode ? 'modo-oscuro' : 'cart-modo-normal'}>
<div className='header-container'>
<header className="flex flex-col md:flex-row items-center justify-between gap-4 header">
<h1 className="text-2xl md:text-3xl font-bold h1-text">
Hola, Admin
</h1>
<form className="w-full md:w-auto form-header">
<div className="relative">
<RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-2 lupa-header"  />
<input
type="text"
className="bg-gray-200 outline-none py-2 pl-8 pr-4 rounded-xl w-full md:w-auto input-header"
placeholder="Buscar Compra"
/>
</div>
</form>
</header>
</div>
</div>
)
}
export default HeaderAdmin
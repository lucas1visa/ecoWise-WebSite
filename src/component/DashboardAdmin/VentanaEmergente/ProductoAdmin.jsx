import React from 'react'
import { useSelector } from 'react-redux';


const ProductoAdmin = () => {
    const products = useSelector((state) => state.products)
  
    return (
<div>
    <h1>Productos Administrador</h1>
    {products.map((pro, index)=>(
        <div key={pro.id + index}>
            <h1>Nombre: {pro.name}</h1>
            <h2>Precio Actual: ${pro.price}  Precio A Modificar: <input placeholder='$'></input></h2>
            <h2>Cantidad Actual: {pro.quantityAvailable}  Nueva Cantidad: <input></input></h2> 
            <img className="image-Admin" src={pro.image} alt={pro.name} />
            <p>Producto: {pro.id}</p>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-black-500 hover:border-transparent rounded" >Actualizar</button>
        </div>
    ))}
</div>
  )
}

export default ProductoAdmin

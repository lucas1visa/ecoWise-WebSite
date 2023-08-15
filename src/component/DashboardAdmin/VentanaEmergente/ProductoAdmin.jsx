import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ProductoAdmin = () => {
    const products = useSelector((state) => state.products)
    const dispatch = useDispatch
  
  
  
  
    return (
    <div>
        <h1>Productos Administrador</h1>
        {products.map(product =>{
            <div>
                <h1>Nombre: {product.name}</h1>
                <h2>Precio Actual: {product.price}  Precio A Modificar: <input></input></h2>
                <h2>Cantidad Actual: {product.quantityAvaible}  Nueva Cantidad: <input></input></h2> 
                <image>Imagen Actual: {product.image}</image>
                <p>Producto: {product.id}</p> 
            </div>
        })}
    </div>
  )
}

export default ProductoAdmin

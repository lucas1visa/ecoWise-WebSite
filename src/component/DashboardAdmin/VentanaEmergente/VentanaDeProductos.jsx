import React from 'react'
import ProductoAdmin from './ProductoAdmin'
import {useDarkMode} from '../../DarkModeContext/DarkMode'
import './ventanaDeProductos.css'

const VentanaDeProductos = () => {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? 'modo-oscuro' : 'cart-modo-normal'}>
      <div className='list-product'>
        <h1 className='mx-auto h1-productos-list'>Lista de Productos</h1>
        <ProductoAdmin/>
      </div>
    </div>

  )
}

export default VentanaDeProductos
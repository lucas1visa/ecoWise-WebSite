import React from 'react';
import { useSelector } from 'react-redux';

const ProductoAdmin = () => {
    const products = useSelector((state) => state.products);

    return (
        <div>
        <h1 className="col-span-2 text-2xl font-bold mx-auto">Administracion de precios y cantidad</h1>
        <div className=" grid grid-cols-3 gap-4">
            
            {products.map((pro, index) => (
                <div key={pro.id + index} className="w-full max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className='px-5 pb-5'>
                    <h1 className="col-span-2 text-2xl font-bold mb-0 mt-3 ml-2 mr-2"> {pro.name}</h1>
                    </div>
                    <div className="flex mb-2">
                        <h2 className="text-xl mb-2 ml-4">
                            
                            Precio Actual: ${pro.price}
                        </h2>
                        </div>
                        <div className="flex mb-2">
                            <h2 className="text-xl mb-2 ml-4">Cantidad Actual: {pro.quantityAvailable}</h2>
                        </div>

                    
                    <div className="flex mb-2">
                        <h2 className="text-xl mb-2 ml-4">
                            Modificar Precio: <input className="w-36 border p-1" placeholder="$" />
                        </h2>

                    </div>


                    <div className="flex mb-2">
                        <h2 className="text-xl mb-2 ml-4">Agregar Cantidad: <input className="w-32 border p-1" /></h2>
                    </div>
                    <img className="mx-auto w-32 h-32 object-cover mb-2 " src={pro.image} alt={pro.name} />
                    <p className="text-gray-500">ID del Producto: {pro.id}</p>
                    <div>
                    <button className="text-white bg-blue-700 mb-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Actualizar
                    </button>
                    </div>
                    
                </div>
               
            ))}
        </div>
    </div>);
}

export default ProductoAdmin;
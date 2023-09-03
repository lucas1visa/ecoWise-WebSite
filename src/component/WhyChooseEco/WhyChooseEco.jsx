import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTruck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from "../DarkModeContext/DarkMode";

const WhyChooseEco = () => {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? 'modo-oscuro' : 'cart-modo-normal'}>
    <div className="bg-gray-100 bg-green-200 p-10 text-center mode-dark">
      <h2 className="text-3xl font-semibold mb-4 text-product product-name-price">¿Por qué elegir Eco?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Productos Ecológicos */}
        <div className="flex flex-col items-center ">
          <FontAwesomeIcon icon={faLeaf} className="text-green-500 text-4xl mb-2" />
          <p className="text-lg font-semibold text-product product-name-price">Productos 100% Ecológicos</p>
          <p className="text-sm font-semibold text-product product-name-price">Productos cuidadosamente seleccionados para preservar el cuidado del medio ambiente.</p>
        </div>

        {/* Envíos Sin Cargo */}
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faTruck} className="text-blue-500 text-4xl mb-2" />
          <p className="text-lg font-semibold text-product product-name-price">Envíos Sin Cargo</p>
          <p className="text-sm font-semibold text-product product-name-price">A todo el país a partir de $6.500. En Bariloche compras superiores a $1.500.</p>
        </div>

        {/* Todos los Medios de Pago */}
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faCreditCard} className="text-purple-500 text-4xl mb-2" />
          <p className="text-lg font-semibold text-product product-name-price">Todos los Medios de Pago</p>
          <p className="text-sm font-semibold text-product product-name-price">Podés pagar con todas las tarjetas de crédito y débito.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WhyChooseEco;

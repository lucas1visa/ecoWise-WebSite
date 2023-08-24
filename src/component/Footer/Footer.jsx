import { useState } from "react";
import plantaa from "../../Img/plantaa.png";
import { Modal } from "react-bootstrap";
import "./Footer.css";
import { useDarkMode } from "../DarkModeContext/DarkMode";
import '../../App.css'

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [ShowPagosModal, setShowPagosModal] = useState(false);

  const handleFAQClose = () => setShowFAQModal(false);
  const handleFAQShow = () => setShowFAQModal(true);
  const handleTermsClose = () => setShowTermsModal(false);
  const handleTermsShow = () => setShowTermsModal(true);
  const handlePagosClose = () => setShowPagosModal(false);
  const handlePagosShow = () => setShowPagosModal(true);

  function preventDefault(event) {
    event.preventDefault();
  }

  return (
  <div className={isDarkMode ? 'modo-oscuro' : 'cart-modo-normal'}>
    <footer className={"text-white py-4 color-footer-dark color-footer-light"}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
           <div className="planta-footer">
            <img src={plantaa} alt="ecoWise" className="w-20 h-30 ml-5" />
           </div>
            <h2>ecoWise</h2>
          </div>
          

          <div className="mb-6 md:mb-0 text-center md:text-left text-white ">
            <p className="text-white font-bold mb-2">Contactos</p>
            <div>
              <a
                className='footerEtiquetasA'
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
      
              >
                Facebook
              </a>
            </div>
            <div>
              <a
                className='footerEtiquetasA'
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
            <div>
              <a
                className='footerEtiquetasA'
                href="mailto:info@tudireccion.com"
              >
                Gmail
              </a>
            </div>
          </div>
          <div className="mb-5 md:mb-0 text-center md:text-left text-white">
            <p className="text-white font-bold mb-2">Tienda Online</p>
            <div>
              <a
                className='footerEtiquetasA'
                href="#"
                onClick={handleFAQShow}
              >
                FAQ
              </a>
            </div>
          </div>

          <div className="mb-4 md:mb-0 text-center md:text-left text-white">
            <div>
              <p className="text-white font-bold mb-2"
                
              >
                Métodos de Pago
              </p>
            </div>
            <p className="text-white font-bold mb-2"></p>
            <div>
              <a
                className='footerEtiquetasA'
                href="#"
                onClick={handlePagosShow}
              >
                Mercado Pago
              </a>
            </div>
            <div>
              <p
               
              >
                Tarjetas debito/credito
              </p>
            </div>
          </div>
          <a
            className='footerEtiquetasA'
            href="#"
            onClick={handleTermsShow}
          >
            Términos y Condiciones / Devoluciones
          </a>
          <div></div>

          <Modal show={showFAQModal} onHide={handleFAQClose}>
            <Modal.Header closeButton>
              <Modal.Title>Preguntas y Respuestas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>¿Cómo puedo realizar una compra?</h3>
              <p>
                Realizar una compra en nuestro sitio web es fácil. Simplemente
                navega por nuestras categorías de productos, elige los artículos
                que deseas comprar y agrégalos al carrito de compras. Luego,
                procede al pago, ingresa tu información de envío y elige el
                método de pago. Una vez que se confirme el pedido, recibirás un
                correo de confirmación.
              </p>
              <h3>¿Cuánto tiempo demora el envío?</h3>
              <p>
                El tiempo de envío puede variar según tu ubicación y el método
                de envío seleccionado. Por lo general, los pedidos son
                procesados y enviados en 5 días hábiles. Te proporcionaremos un
                número de seguimiento para que puedas rastrear el estado de tu
                pedido en tiempo real.
              </p>
              <h3>¿Qué métodos de pago aceptan?</h3>
              <p>
                Aceptamos una variedad de métodos de pago, incluyendo tarjetas
                de crédito, débito y Mercado Pago. Durante el proceso de pago,
                podrás seleccionar la opción que mejor se adapte a tus
                preferencias. Todos los métodos de pago son seguros y
                protegidos.
              </p>
              <h3>¿Qué significa que sus productos son sustentables?</h3>
              <p>
                Nuestros productos sustentables están diseñados y fabricados
                teniendo en cuenta el impacto ambiental. Utilizamos materiales
                renovables, reciclados y procesos de producción eco-amigables
                para reducir la huella ecológica y promover la sostenibilidad.
              </p>
              <h3>¿Cuál es su política de envío?</h3>
              <p>
                Realizamos envíos rápidos y utilizamos materiales de embalaje
                reciclados siempre que sea posible.
              </p>
              <h3>¿Ofrecen devoluciones?</h3>
              <p>
                Sí, aceptamos devoluciones en un plazo de 30 días. Consulta
                nuestra página de Términos y Condiciones para más detalles.
              </p>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>

          <Modal show={showTermsModal} onHide={handleTermsClose}>
            <Modal.Header closeButton>
              <Modal.Title>Términos y Condiciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <p>
                  Al utilizar y realizar compras en nuestro sitio web de
                  productos sustentables, aceptas los siguientes términos y
                  condiciones:
                </p>

                <h3>1. Productos Sustentables</h3>
                <p>
                  Nuestros productos sustentables están diseñados para promover
                  la sostenibilidad y reducir el impacto ambiental. Nos
                  esforzamos por ofrecer productos de alta calidad que sean
                  funcionales y respetuosos con el medio ambiente.
                </p>

                <h3>2. Información del Producto</h3>
                <p>
                  Hacemos todo lo posible por proporcionar descripciones
                  detalladas y precisas de nuestros productos. Sin embargo, la
                  representación de colores y características puede variar según
                  la configuración de tu pantalla. Si tienes preguntas, no dudes
                  en contactarnos.
                </p>

                <h3>3. Envíos y Entregas</h3>
                <p>
                  Realizamos envíos a direcciones dentro de la región
                  especificada durante el proceso de compra. Los plazos de
                  entrega pueden variar y dependen de factores externos.
                  Utilizamos materiales de embalaje sostenibles siempre que sea
                  posible para reducir la huella de carbono.
                </p>

                <h3>4. Devoluciones y Reembolsos</h3>
                <p>
                  Aceptamos devoluciones de productos en su estado original y
                  sin usar dentro de los 30 días posteriores a la fecha de
                  compra. Por favor, consulta nuestra página de Devoluciones
                  para obtener instrucciones detalladas sobre el proceso. Los
                  reembolsos se emitirán de acuerdo con nuestra política de
                  reembolso.
                </p>

                <h3>5. Privacidad y Seguridad</h3>
                <p>
                  Respetamos tu privacidad y protegemos tus datos personales de
                  acuerdo con nuestras políticas de privacidad. Utilizamos
                  medidas de seguridad para proteger la información de pago y
                  cumplimos con los estándares de seguridad de la industria.
                </p>

                <h3>6. Cambios en los Términos</h3>
                <p>
                  Nos reservamos el derecho de modificar estos términos y
                  condiciones en cualquier momento. Los cambios entrarán en
                  vigencia una vez publicados en esta página. Te recomendamos
                  revisar esta sección periódicamente para estar al tanto de
                  cualquier actualización.
                </p>

                <h3>7. Contacto</h3>
                <p>
                  Si tienes alguna pregunta o inquietud acerca de estos términos
                  y condiciones, por favor contáctanos a través de la
                  información proporcionada en nuestra página de Contacto.
                </p>

                <p>Última actualización: 08/08/2023</p>
              </p>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>

          <Modal show={ShowPagosModal} onHide={handlePagosClose}>
            <Modal.Header closeButton>
              <Modal.Title>Métodos de Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3 className='metodopago'>
                Compra con Confianza: Métodos de Pago Seguros con Mercado Pago
              </h3>
              <p className='parrafos'>
                En la actualidad, realizar compras en línea se ha convertido en
                una parte fundamental de nuestras vidas, permitiéndonos acceder
                a una amplia gama de productos y servicios desde la comodidad de
                nuestro hogar. Sin embargo, una de las preocupaciones más
                comunes al comprar en línea es la seguridad de los métodos de
                pago. Es aquí donde Mercado Pago entra en escena, ofreciendo una
                solución integral que brinda tranquilidad y confianza a los
                compradores en línea.
              </p>
              <h3 className='metodopago'>Variedad de Métodos de Pago</h3>
              <p className='parrafos'>
                Mercado Pago se destaca por ofrecer una amplia variedad de
                métodos de pago, desde tarjetas de crédito y débito hasta
                transferencias bancarias y pagos en efectivo en puntos de pago
                autorizados. Esto permite a los compradores elegir el método que
                les resulte más conveniente y familiar, adaptándose a sus
                preferencias individuales.
              </p>
              <h3 className='metodopago'>Pasarela de Pago Segura</h3>
              <p className='parrafos'>
                La pasarela de pago de Mercado Pago es una de las más seguras
                del mercado. Utiliza tecnología de encriptación de última
                generación para proteger los datos sensibles de los usuarios,
                como los números de tarjeta y la información financiera. Esto
                garantiza que la información personal y financiera del cliente
                esté resguardada contra posibles amenazas cibernéticas.
              </p>
              <h3 className='metodopago'>Proceso de Compra Sencillo y Transparente</h3>
              <p className='parrafos'>
                Uno de los aspectos que más tranquilidad brinda a los clientes
                es el proceso de compra sencillo y transparente que ofrece
                Mercado Pago. Desde la selección de productos hasta el pago
                final, cada paso está diseñado para ser intuitivo y fácil de
                entender. Además, durante todo el proceso, el cliente tiene
                acceso a información clara sobre los montos a pagar y los
                detalles de la transacción.
              </p>
              <h3 className='metodopago'>Protección al Comprador</h3>
              <p className='parrafos'>
                Mercado Pago va más allá al ofrecer una protección al comprador.
                Si surge algún problema con la compra, como la no recepción del
                producto o servicios no conformes, los usuarios tienen la
                posibilidad de abrir una disputa y recibir asistencia para
                resolver el problema de manera justa y equitativa.
              </p>
              <h3 className='metodopago'>Respaldo de una Marca Confiable</h3>
              <p className='parrafos'>
                La reputación de Mercado Pago como una plataforma confiable y
                reconocida en el ámbito del comercio electrónico agrega un nivel
                adicional de tranquilidad. Al elegir realizar una transacción a
                través de Mercado Pago, los compradores pueden confiar en que
                están tratando con una entidad que valora la seguridad y la
                satisfacción del cliente.
              </p>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
         </div>
        </div>
    </footer>
      </div>
  );
};

export default Footer;

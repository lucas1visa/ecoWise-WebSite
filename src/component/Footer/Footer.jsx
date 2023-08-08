import { useState } from "react";
import ecoWise from "../Footer/EcoWise.jpg";
import { Modal } from "react-bootstrap";

const Footer = () => {
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleFAQClose = () => setShowFAQModal(false);
  const handleFAQShow = () => setShowFAQModal(true);
  const handleTermsClose = () => setShowTermsModal(false);
  const handleTermsShow = () => setShowTermsModal(true);

  function preventDefault(event) {
    event.preventDefault();
  }
  

  return (
    <footer className="bg-dark text-white ">
  <div className="container-fluid">
    <div className="row p-1 bg-dark text-white">
          <div className="col-xs-12 col-md-6 col-lg-3">
            <p></p>
            <p></p>
            <p></p>

            <img src={ecoWise} alt="ecoWise" className="w-50 h-30 rounded" />
          </div>

          <div className="col-xs-12 col-md-6 col-lg-3">
            <p className="h5 mb-3">Contactos</p>
            <div>
              <a className="text-secondary text-decoration-none" href="https://www.facebook.com/">
                Facebook
              </a>
            </div>
            <div>
              <a className="text-secondary text-decoration-none" href="https://www.instagram.com/">
                Instagram
              </a>
            </div>
            <div>
              <a className="text-secondary text-decoration-none" href="mailto:info@tudireccion.com">
                Gmail
              </a>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <p className="h5 mb-3">Tienda Online</p>
            <div>
              <a className="text-secondary text-decoration-none" href="" onClick={preventDefault}>
                Quiero comprar
              </a>
            </div>
            <div>
              <a
                className="text-secondary text-decoration-none"
                href="#"
                onClick={handleFAQShow}
              >
                FAQ
              </a>
            </div>
          </div>

          <div className="col-xs-12 col-md-6 col-lg-3">
            <p className="h5 mb-3">Metodos de Pago</p>
            <div>
              <a className="text-secondary text-decoration-none" href="" onClick={preventDefault}>
                Mercado Pago
              </a>
            </div>
            <div>
              <a className="text-secondary text-decoration-none" href="" onClick={preventDefault}>
                Tarjetas debito/credito
              </a>
            </div>
          </div>
          <a
            className="text-secondary text-decoration-none"
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
        <p>Realizar una compra en nuestro sitio web es fácil. Simplemente navega por nuestras categorías de productos, elige los artículos que deseas comprar y agrégalos al carrito de compras. Luego, procede al pago, ingresa tu información de envío y elige el método de pago. Una vez que se confirme el pedido, recibirás un correo de confirmación.</p>
          <h3>¿Cuánto tiempo demora el envío?</h3>
        <p>El tiempo de envío puede variar según tu ubicación y el método de envío seleccionado. Por lo general, los pedidos son procesados y enviados en 5 días hábiles. Te proporcionaremos un número de seguimiento para que puedas rastrear el estado de tu pedido en tiempo real.</p>
           <h3>¿Qué métodos de pago aceptan?</h3>
        <p>Aceptamos una variedad de métodos de pago, incluyendo tarjetas de crédito, débito y Mercado Pago. Durante el proceso de pago, podrás seleccionar la opción que mejor se adapte a tus preferencias. Todos los métodos de pago son seguros y protegidos.</p>
          <h3>¿Qué significa que sus productos son sustentables?</h3>
          <p>
            Nuestros productos sustentables están diseñados y fabricados
            teniendo en cuenta el impacto ambiental. Utilizamos materiales
            renovables, reciclados y procesos de producción eco-amigables para
            reducir la huella ecológica y promover la sostenibilidad.
          </p>
          <h3>¿Cuál es su política de envío?</h3>
          <p>
            Realizamos envíos rápidos y utilizamos materiales de embalaje
            reciclados siempre que sea posible.
          </p>
          <h3>¿Ofrecen devoluciones?</h3>
          <p>
            Sí, aceptamos devoluciones en un plazo de 30 días. Consulta nuestra
            página de Términos y Condiciones para más detalles.
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
              Al utilizar y realizar compras en nuestro sitio web de productos
              sustentables, aceptas los siguientes términos y condiciones:
            </p>

            <h3>1. Productos Sustentables</h3>
            <p>
              Nuestros productos sustentables están diseñados para promover la
              sostenibilidad y reducir el impacto ambiental. Nos esforzamos por
              ofrecer productos de alta calidad que sean funcionales y
              respetuosos con el medio ambiente.
            </p>

            <h3>2. Información del Producto</h3>
            <p>
              Hacemos todo lo posible por proporcionar descripciones detalladas
              y precisas de nuestros productos. Sin embargo, la representación
              de colores y características puede variar según la configuración
              de tu pantalla. Si tienes preguntas, no dudes en contactarnos.
            </p>

            <h3>3. Envíos y Entregas</h3>
            <p>
              Realizamos envíos a direcciones dentro de la región especificada
              durante el proceso de compra. Los plazos de entrega pueden variar
              y dependen de factores externos. Utilizamos materiales de embalaje
              sostenibles siempre que sea posible para reducir la huella de
              carbono.
            </p>

            <h3>4. Devoluciones y Reembolsos</h3>
            <p>
              Aceptamos devoluciones de productos en su estado original y sin
              usar dentro de los 30 días posteriores a la fecha de compra. Por
              favor, consulta nuestra página de Devoluciones para obtener
              instrucciones detalladas sobre el proceso. Los reembolsos se
              emitirán de acuerdo con nuestra política de reembolso.
            </p>

            <h3>5. Privacidad y Seguridad</h3>
            <p>
              Respetamos tu privacidad y protegemos tus datos personales de
              acuerdo con nuestras políticas de privacidad. Utilizamos medidas
              de seguridad para proteger la información de pago y cumplimos con
              los estándares de seguridad de la industria.
            </p>

            <h3>6. Cambios en los Términos</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos y
              condiciones en cualquier momento. Los cambios entrarán en vigencia
              una vez publicados en esta página. Te recomendamos revisar esta
              sección periódicamente para estar al tanto de cualquier
              actualización.
            </p>

            <h3>7. Contacto</h3>
            <p>
              Si tienes alguna pregunta o inquietud acerca de estos términos y
              condiciones, por favor contáctanos a través de la información
              proporcionada en nuestra página de Contacto.
            </p>

            <p>Última actualización: 08/08/2023</p>
          </p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      </div></div>
    </footer>
  );
};

export default Footer;

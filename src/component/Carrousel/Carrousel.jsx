import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import sustentabilidad1 from "../../Img/Sustentabilidad1.jpg"
import sustentabilidad2 from "../../Img/Sustentabilidad2.jpg"
import sustentabilidad3 from "../../Img/Sustentabilidad3.jpg"

const CarouselComponent = () => {
  const carouselItems = [
    {
      imageSrc: sustentabilidad1,
      title: 'ecoWise',
      paragraph: 'Elegir qué compramos, es decidir qué futuro queremos',
    },
    {
      imageSrc: sustentabilidad2,
      title: 'Productos sustentables',
    },
    {
      imageSrc: sustentabilidad3,
      title: 'Comercio Justo',
      paragraph: 'Ponemos primero el cuidado del ambiente y la salud',
    },
  ];

  return (
    <div>
      
    <Carousel
      showThumbs={false}
      showArrows={true}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      
    >
      {carouselItems.map((item, index) => (
        <div key={index} className="relative">
          <img
          src={item.imageSrc}
          alt={`Imagen ${index}`}
          style={{ width: "100%", height: "700px" }} 
          className="object-cover -mt-20 shadow-2xl rounded-full"
        />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
          <h2 className="text-3xl font-semibold">{item.title}</h2>
<p className="text-lg">{item.paragraph}</p>
          </div>
        </div>
      ))}
    </Carousel></div>
  );
  
};

export default CarouselComponent;
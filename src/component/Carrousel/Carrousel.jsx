import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const CarouselComponent = () => {
  const carouselItems = [
    {
      imageSrc: "https://humanidades.com/wp-content/uploads/2018/09/sustentabilidad-e1579401561930-800x400.jpg",
      title: 'ecoWise',
      paragraph: 'Elegir qué compramos, es decidir qué futuro queremos',
    },
    {
      imageSrc: "https://thelogisticsworld.com/wp-content/uploads/2023/03/concepto-de-tecnologia-de-recursos-renovables-para-reducir-la-contaminacion-828x548.jpg",
      title: 'Productos sustentables',
    },
    {
      imageSrc: "https://thefoodtech.com/wp-content/uploads/2021/06/sustentabilidad-en-la-indsutria.jpg",
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
    </Carousel>
    </div>
  );
  
};

export default CarouselComponent;
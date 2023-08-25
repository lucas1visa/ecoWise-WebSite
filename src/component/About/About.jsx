import React from "react";
import { FaGithub } from 'react-icons/fa';


const About = () => {
  return (
    <div className="flex bg-gray-100">
    <section className="bg-white dark:bg-gray-900 mx-auto">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-primary-201 dark:text-primary-201">Acerca de nosotros</h2>
          <p className="mb-4">
          ¡Hola a todos! Somos un equipo de 8 integrantes que ha creado un ecommerce de productos sustentables como proyecto en el bootcamp de Henry. Estamos emocionados de presentarles nuestra plataforma, donde la tecnología y la sostenibilidad se unen. Descubre cómo nuestras pequeñas acciones en línea pueden tener un gran impacto en el mundo real. ¡Bienvenidos a ecoWise!
          </p>
          <h3>Integrantes:</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/Alex-Br1s/Alex-Br1s" target="_blank" rel="noopener noreferrer" className="text-primary-201 dark:text-primary-201 hover:text-primary-300">
              <FaGithub className="w-6 h-6 inline" />
              Alexander Bris
            </a>
            <a href="https://github.com/carcolom" target="_blank" rel="noopener noreferrer" className="text-primary-201 dark:text-primary-201 hover:text-primary-300">
              <FaGithub className="w-6 h-6 inline" />
              Carla Yamila Colom
            </a>
            <a href="https://github.com/dacmec" target="_blank" rel="noopener noreferrer" className="text-primary-201 dark:text-primary-201 hover:text-primary-300">
              <FaGithub className="w-6 h-6 inline" />
              Daniel Ardila
            </a>
              <a href="https://github.com/javierpenacca" target="_blank" rel="noopener noreferrer" className="text-primary-201 dark:text-primary-201 hover:text-primary-300">
              <FaGithub className="w-6 h-6 inline" />
              Javier Penacca
            </a>
            <a href="https://github.com/sebasimon9" target="_blank" rel="noopener noreferrer" className="text-primary-201 dark:text-primary-201 hover:text-primary-300">
              <FaGithub className="w-6 h-6 inline" />
              Javier Sebastian Simón
            </a>
            <a href="https://github.com/jonathanjara01" target="_blank" rel="noopener noreferrer" className="text-primary-201 dark:text-primary-201 hover:text-primary-300">
              <FaGithub className="w-6 h-6 inline" />
              Jonathan Jaramillo
            </a>
            <a href="https://github.com/joseantso" target="_blank" rel="noopener noreferrer" className="text-primary-201 dark:text-primary-201 hover:text-primary-300">
              <FaGithub className="w-6 h-6 inline" />
              Jose Antonio Soria
            </a>
            <a href="https://github.com/lucas1visa" target="_blank" rel="noopener noreferrer" className="text-primary-201 dark:text-primary-201 hover:text-primary-300">
              <FaGithub className="w-6 h-6 inline" />
              Lucas Julian Visa
            </a>
          </div>
        </div>
        
      </div>
    </section>
  </div>
  );
};

export default About;
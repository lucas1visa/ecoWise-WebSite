import React from "react";


const About = () => {
  return (
    <div className="flex bg-gray-100">
      <section class="bg-white dark:bg-gray-900 mx-auto">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary-201 dark:text-primary-201">Acerca de nosotros</h2>
            <p class="mb-4"> Nuestra misión es ayudar y concientizar a las personas para que utilicen productos de origen sustentable. Te damos la bienvenida a nuestra causa transformadora: inspirar y educar a todos sobre la importancia crucial de optar por productos con origen sostenible. En este mundo dinámico, cada elección que hacemos tiene un impacto, y nuestra pasión radica en fomentar la toma de decisiones conscientes y amigables con el medio ambiente. Nuestro propósito es guiarte en un viaje hacia una vida más responsable y respetuosa con el planeta, donde tus elecciones diarias reflejen un compromiso genuino con la conservación de los recursos y el bienestar global.</p>
            <p></p>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"/>
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"/>
        </div>
    </div>
</section>
    </div>
  );
};

export default About;
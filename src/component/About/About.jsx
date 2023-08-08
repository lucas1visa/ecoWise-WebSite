import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div>
      <section className={styles.section}>
        <h1>ecoWise</h1>
      </section>
      <section className={styles.section}>
        <div className={styles.aboutMe}>
          <h2 className={styles.title}>Objetivos de la App</h2>
          <p className={styles.text}>
            Los objetivos de la aplicación son ayudar y concientizar a las
            personas para que utilicen productos de origen sustentable. En la
            aplicación, los usuarios pueden comprar los productos que aparecen y
            crear una cuenta de usuario. Otras funcionalidades incluyen la
            posibilidad de buscar por preferencias, como filtrar productos y
            ordenarlos alfabéticamente o por precios.
          </p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.aboutMe}>
          <h2 className={styles.title}>Integrantes</h2>
          <p className={styles.text}>
          Daniel Ardila, Alex Bris, Carla Colom, Jonathan Jaramillo, Javier Penacca, Jose Soria, Sebastian Simón, Lucas Visa.
          </p>
        </div>
      </section>
    </div>
  );
};
export default About;

import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="container">
      <section className="row my-5">
        <div className="col-md-6">
          <div className="mb-4">
            <h1 className="display-4">ecoWise</h1>
            <h2>ecoWise</h2>
          </div>
          <div>
            <p>
              Esta app nace con el propósito de fomentar el cuidado del medio
              ambiente. Nuestro objetivo es  crear un espacio para comercializar productos realizados con materiales
              alternativos sustentables. Desde ecoWise consideramos que cambiar
              hábitos cotidianos, es generar cambios para un futuro sostenible,
              logrando “contagiar” a otras personas para impulsar un movimiento
              mayor.
            </p>
            <Link to="/home" className="btn btn-primary mr-3">
              Log in
            </Link>
            <Link to="/account/register/" className="btn btn-secondary">
              Sign in
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <img
            className="img-fluid"
            src="https://economiasustentable.com/wp-content/uploads/2021/06/sustentabilidad-1000x562.jpg"
            alt=""
          />
        </div>
      </section>
    </main>
  );
};

export default Landing;

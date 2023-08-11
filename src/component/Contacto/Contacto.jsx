import React from 'react'
import { Form } from 'react-bootstrap'
import styles from "./Contacto.module.css"

const Contacto = () => {
  return (
    <div className={styles.container}>
        <form className={styles.form} action="https://formsubmit.co/eco.wise.ecommerce@gmail.com" method="POST" >
            <h1 className={styles.h1}>Contacta Con Nosotros</h1>
            <input className={styles.input1} type="text" id='First Name' name='name' placeholder='Nombre' required/>
            <input className={styles.input2} type="text" id='Last Name'name='Apellido' placeholder='Apellido' required/>
            <input className={styles.input3} type="email" id='email' name='Email' placeholder='Email' required/>
            <input className={styles.input4} type="text" id='mobile'name='Mobile' placeholder='Mobile' required/>
            <h4 className={styles.h4}>Escribe tu mensaje aquí . . .</h4>
            <textarea className={styles.text} required ></textarea>
            <input  className={styles.button} type="submit" value="send" id='buttom'/>
        </form>
    </div>
  );
}


export default Contacto
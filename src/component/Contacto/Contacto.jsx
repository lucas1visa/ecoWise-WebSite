import React from 'react'
import { Form } from 'react-bootstrap'
import styles from "./Contacto.module.css"

const Contacto = () => {
  return (
    <div className={styles.container}>
        <form className={styles.form} action="https://formsubmit.co/eco.wise.commerce@gmail.com" method="POST" >
            <h1 className={styles.h1}>Contacta Con Nosotros</h1>
<div className='mr-3'>
            <input className={styles.input1} type="text" id='First Name' name='name' placeholder='Nombre' required/>
</div>
            <input className={styles.input2} type="text" id='Last Name'name='Apellido' placeholder='Apellido' required/>
<div className='mr-3'>
            <input className={styles.input3} type="email" id='email' name='Email' placeholder='Email' required/>
</div>
            <input className={styles.input4} type="text" id='mobile'name='Mobile' placeholder='Teléfono' required/>

            
            <textarea placeholder="Escribe tu mensaje aquí . . ." className={styles.text} required ></textarea>
            <input  className={styles.button} type="submit"  value="Enviar" id='buttom'/>
        </form>
    </div>
  );
}


export default Contacto
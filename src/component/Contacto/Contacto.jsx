import React from 'react'
import { Form } from 'react-bootstrap'

const Contacto = () => {
  return (
    <section className='contact'>
        <div className='content'>
            <h2>Contact Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, sed non. Cupiditate aut accusamus ab. Ipsum quis hic odio at corrupti sed nihil? Magni nesciunt doloribus cum laboriosam voluptatem blanditiis!</p>
        </div>
        <div className='container'>
            <div className='contactInfo'>
                <div className='box'>
                    <div className='icon'></div>
                    <div className='text'>
                        <h3>Address</h3>
                        </div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim voluptates neque adipisci ipsam, et quasi sapiente velit asperiores eos, nihil deserunt corrupti dolores consectetur cum blanditiis perferendis veniam placeat quod.</p>
                </div>
            </div>
            <div className='box'>
                    <div className='icon'></div>
                    <div className='text'>
                        <h3>Phone</h3>
                    </div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim voluptates neque adipisci ipsam, et quasi sapiente velit asperiores eos, nihil deserunt corrupti dolores consectetur cum blanditiis perferendis veniam placeat quod.</p>
                </div>
        </div>
        <div className='box'>
                    <div className='icon'></div>
                    <div className='text'>
                        <h3>Email</h3>
                    </div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim voluptates neque adipisci ipsam, et quasi sapiente velit asperiores eos, nihil deserunt corrupti dolores consectetur cum blanditiis perferendis veniam placeat quod.</p>
                </div>
                <div className='contactForm'>
                    <Form>
                        <h2>Send Message</h2>
                        <div className='inputBox'>
                        <input type="text" name="" required="required" />
                        <span>Full Name</span>
                        </div>

                        <div className='inputBox'>
                        <input type="text" name="" required="required" />
                        <span>Email</span>
                        </div>
                        
                        <div className='inputBox'>
                        <textarea required="required"></textarea>
                        <span>Type Your Message . . .</span>
                        </div>

                        <div className='inputBox'>
                        <input type="submit" name="" value="Send" />
                        </div>
                    </Form>

                </div>
    </section>
  )
}

export default Contacto
import axios from "axios";
import { useState } from "react";

const NewProduct = () => {

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        category: "",
        image: "",


    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        category: "",
        image: "",
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({ ...form, [property]: value });

        setForm({ ...form, [property]: value });
    };

    const validate = (form) => {

        const newErrors = { ...errors };

        if (/^[A-Za-z]+$/.test(form.name)) {
            newErrors.name = "";
        } else {
            newErrors.name = "No se permiten números en el name";
        }
        if (form.name === "") {
            newErrors.name = "";
        }
        if (/^\d+$/.test(form.price)) {
            newErrors.price = "";
        } else {
            newErrors.price = "No se permiten letras en el precio";
        }

        if (form.price === "") {
            newErrors.price = "";
        }
        if (/^\d+$/.test(form.quantityAvailable)) {
            newErrors.quantityAvailable = "";
        } else {
            newErrors.quantityAvailable = "No se permiten letras en el precio";
        }

        if (form.quantityAvailable === "") {
            newErrors.quantityAvailable = "";
        }

        
        setErrors(newErrors);


    }

    const submitHandler = (event) => {
        event.preventDefault();

        const requiredFields = ["name", "description", "price", "quantityAvailable", "category", "image"];
        const hasMissingFields = requiredFields.some((field) => form[field] === "" && field !== "image");
        if (hasMissingFields) {
            alert("Por favor, complete todos los campos obligatorios");
            return;
        }

        // Envía un arreglo con un solo objeto que contiene los datos del formulario
        const dataToSend = [form];

        axios
            .post("http://localhost:3001/products", dataToSend)
            .then((res) => alert('Creado con exito'))
            .catch((err) => alert('ERROR'));
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name : </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={changeHandler}
                        name="name"


                    />
                    
                </div>
                <span>{errors.name}</span>
                <h1></h1>

                <div>
                    <label>DESCRIPCION : </label>
                    <input
                        type="text"
                        value={form.description}
                        onChange={changeHandler}
                        name="description"
                    />
                </div>

                <h1></h1>

                <div>
                    <label>PRECIO : </label>
                    <input
                        type="text"
                        value={form.price}
                        onChange={changeHandler}
                        name="price"
                    />
                </div>

                <span>{errors.price}</span>
                <h1></h1>

                <div>
                    <label>CANTIDAD : </label>
                    <input
                        type="text"
                        value={form.quantityAvailable}
                        onChange={changeHandler}
                        name="quantityAvailable"
                    />
                </div>
                <span>{errors.quantityAvailable}</span>
                <h1></h1>

                <div>
                    <label>CATEGORIA : </label>
                    <input
                        type="text"
                        value={form.category}
                        onChange={changeHandler}
                        name="category"
                    />
                </div>
                <h1></h1>

                <div>
                    <label>IMAGEN : </label>
                    <input
                        type="text"
                        value={form.image}
                        onChange={changeHandler}
                        name="image"
                    />
                </div>
                <h1></h1>

                <button type="submit">SUBMIT</button>

            </form>
        </div>
    )

}

export default NewProduct



























import axios from "axios";
import React, { useState } from "react";
import '../../App.css'
import './NewProduct.css'
import { useDarkMode } from "../../component/DarkModeContext/DarkMode";

const NewProduct = () => {

    const { isDarkMode } = useDarkMode();

    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const [imagePreview, setImagePreview] = useState(null); // To show a preview of the selected image


    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        category: "",
        image: ""



    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        category: "",


    });



    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "up66lohb"); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dms4i7mjo/image/upload", formData);
            const imageUrl = response.data.secure_url;
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };
    const handleImagePreview = (event) => {

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
    const [imageSaved, setImageSaved] = useState({ botonValidar: true, boton: false }); // Estado para controlar si la imagen se ha guardado



    const saveImageUrl = async () => {
        if (imagePreview) {
            try {
                setImageSaved({ botonValidar: false }) // Cambiar el estado a verdadero cuando se guarda la imagen

                const imageUrl = await handleImageUpload(imagePreview);
                setUploadedImageUrl(imageUrl);
                setImageSaved({ boton: true }) // Cambiar el estado a verdadero cuando se guarda la imagen
            } catch (error) {
                console.error("Error al subir la imagen:", error);
            }
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        // Upload the image to Cloudinary only if an image is selected


        // Then, proceed with submitting the rest of the form data to your server
        const requiredFields = ["name", "description", "price", "quantityAvailable", "category", "image"];
        const hasMissingFields = requiredFields.some((field) => form[field] === "");
        if (hasMissingFields) {
            alert("Por favor, complete todos los campos obligatorios");
            return;
        }

        const dataToSend = {
            name: form.name,
            description: form.description,
            price: form.price,
            quantityAvailable: form.quantityAvailable,
            category: form.category,
            image: uploadedImageUrl || form.image,
        };

        try {
            const response = await axios.post("https://ecowise-server01.onrender.com/products/admin/create", dataToSend);
            alert('Creado con éxito');
        } catch (error) {
            alert('ERROR');
        }
    };
    return (
    <div className={isDarkMode ? 'modo-oscuro' : 'cart-modo-normal'}>
        <div className=" w-2/5 mx-auto add-product-container">
            <h1 className="h1-product">Agregar Producto</h1>
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 form-admin " onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 label-form" >NOMBRE : </label>
                    <input
                        placeholder="Nombre Del Producto"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={form.name}
                        onChange={changeHandler}
                        name="name"


                    />

                </div >
                <span>{errors.name}</span>
                <h1></h1>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 label-form">DESCRIPCION : </label>
                    <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Descripcion Del Producto"
                        type="text"
                        value={form.description}
                        onChange={changeHandler}
                        name="description"
                    />
                </div>

                <h1></h1>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 label-form">PRECIO : </label>
                    <input
                        placeholder="Precio Del Producto"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={form.price}
                        onChange={changeHandler}
                        name="price"
                    />
                </div>

                <span>{errors.price}</span>
                <h1></h1>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 label-form">CANTIDAD : </label>
                    <input
                        placeholder="Cantidad del Producto"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={form.quantityAvailable}
                        onChange={changeHandler}
                        name="quantityAvailable"
                    />
                </div>
                <span>{errors.quantityAvailable}</span>
                <h1></h1>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 label-form">CATEGORIA : </label>
                    <input
                        placeholder="Hogar, Cocina, Cuidado Personal"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={form.category}
                        onChange={changeHandler}
                        name="category"
                    >
                        {["SELECCIONAR CATEGORIA","Hogar", "Cocina", "Cuidado Personal", "Promociones"].map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <h1></h1>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white label-form" for="file_input">IMAGEN : </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                        type="file"
                        accept="image/*"

                        onChange={(event) => {
                            handleImagePreview(event);
                            setForm({ ...form, image: event.target.files[0] }); // Store the selected image file in the form state
                        }}
                        name="image"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-black-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" style={{ maxWidth: "100px" }} />
                    )}
                </div>
                <h1></h1>
                <div class="flex items-center justify-between">
                    {!imageSaved.boton ?
                        <button class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto" type="button" onClick={saveImageUrl}>
                            {!imageSaved.botonValidar ? <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-900 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg> : ""}VALIDAR</button> : <button className={` mx-auto py-2.5 px-5 mr-2 text-sm font-medium text-gray-100 bg-white-900 rounded-lg border bg-blue-900 hover:bg-primary-200 hover:text-blue-900 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-900 inline-flex items-center ${!imageSaved.boton ? 'bg-primary-200' : ''}`} type="submit">
                            {!imageSaved.boton ? <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-900 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg> : ""}
                            ENVIAR
                        </button>}


                </div>
            </form>
        </div>
    </div>
    )

}

export default NewProduct
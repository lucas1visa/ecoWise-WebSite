import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import validateinput from "./validate";

const FormularioPRO = () => {
  // objeto de referencia para setear los inputs y para el caso de limpiarlos
  const initialstate = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword:""
  }
  // estado para capturar la informacion de los inputs
  const [form, setForm] = useState({initialstate});
  // estado para almacenar los errores
  const [errors, setErrors] = useState({
    name: "Debe tener mas de 3 letras",
    surname: "Debe tener mas de 3 letras",
    email: "",
    phone: "",
    password: "Debe tener entre (6-16) caracteres, contener una Mayuscula y un numero",
  });
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    let err = validateinput(form);
    setErrors({...errors,})
  };
  console.log('email',form.email,'password',form.password);
  const submitHandler = async (event) => {
    event.preventDefault();

    const requiredFields = ["name", "surname", "email", "phone", "password"];
    const hasMissingFields = requiredFields.some((field) => form[field] === "");
    if (hasMissingFields) {
        alert("Por favor, complete todos los campos obligatorios");
        return;
    }

    try {
        const response = await axios.post("https://ecowise-server01.onrender.com/users", form);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Creado con éxito',
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error en la solicitud',
                showConfirmButton: false,
                timer: 2000,
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Revise los datos ingresados',
            showConfirmButton: false,
            timer: 2000,
        });
    }
};





  return (
    <Card className="mx-auto" color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        ¡CREAR TU CUENTA!
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Ingresa tus datos en los campos del formulario
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto" onSubmit={submitHandler}>
        <div className="mb-4 flex flex-col gap-6">
          <Input type="text"size="lg" label="Name" value={form.name} onChange={changeHandler} name="name" />
          <Input type="text"size="lg" label="Surname" value={form.surname} onChange={changeHandler} name="surname" />
          <Input type="text"size="lg" label="Phone" value={form.phone} onChange={changeHandler}  name="phone"/>
          <Input type="text"size="lg" label="Email" value={form.email} onChange={changeHandler} name="email"/>
          <Input type="text" size="lg" label="Password" value={form.password} onChange={changeHandler}  name="password"/>
        </div>
       
        <Button className="mt-6 bg-primary-202 text-black" fullWidth type="submit">
          REGISTRATE
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
         <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
      </form>
    </Card>
  );
}

export default FormularioPRO;
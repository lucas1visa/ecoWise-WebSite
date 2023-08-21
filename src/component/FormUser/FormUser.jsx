import axios from "axios";
import Login from "../Login/Login";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const FormularioPRO = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",

  });
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value });

    setForm({ ...form, [property]: value });
  };

  const validate = (form) => {
    const newErrors = { ...errors };

    setErrors(newErrors);
  }
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
      <Typography variant="h4" color="blue-gray" className="mt-5">
        ¡CREA TU CUENTA!
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Ingresa tus datos en los campos del formulario
      </Typography>
      <form className=" w-80 max-w-screen-lg sm:w-96 mx-auto" onSubmit={submitHandler}>
        <div className="mb-4 flex flex-col gap-6">
  <div> 
    <p className="mr-2">Nombre</p> 
    <Input type="text" size="lg" value={form.name} onChange={changeHandler} name="name" className=" border-black"/>
  </div>
  <div className=""> 
    <p className="mr-2">Apellido</p>
    <Input type="text" size="lg" value={form.surname} onChange={changeHandler} name="surname" className=" border-black" />
  </div>
  <div className="">
    <p className="mr-2">Telefono</p>
    <Input type="text" size="lg" value={form.phone} onChange={changeHandler} name="phone" className=" border-black"/>
  </div>
  <div className="">
    <p className="mr-2">E-mail</p>
    <Input type="text" size="lg" value={form.email} onChange={changeHandler} name="email" className=" border-black"/>
  </div>
  <div className="">
    <p className="mr-2">Contraseña</p>
    <Input type="text" size="lg" value={form.password} onChange={changeHandler} name="password" className=" border-black"/>
  </div>
</div>
       
        <Button className="mt-6 bg-primary-202 text-black" fullWidth type="submit">
          REGISTRATE
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Ya tienes una cuenta ?{" "}
          <a href="#" className="font-medium text-gray-900">
            <Login></Login>
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
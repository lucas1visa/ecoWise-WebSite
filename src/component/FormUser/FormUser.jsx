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
import validateinput from "./validate";
import { BsFillEyeFill,BsFillEyeSlashFill } from "react-icons/bs";

const FormularioPRO = () => {
  // objeto de referencia para setear los inputs y para el caso de limpiarlos
  const initialstate = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: ""
  }
  // estado para capturar la informacion de los inputs
  const [form, setForm] = useState({ initialstate });
  // estado para almacenar los errores
  const [errors, setErrors] = useState({
    name: "Debe tener mas de 3 letras",
    surname: "Debe tener mas de 3 letras",
    email: "Debe contener @ y un dominio Ej: .com , .es",
    phone: "",
    password: "Debe tener entre (6-16) caracteres, contener una Mayuscula y un numero",
  });
  // estado para poder mostrar la contraseña
  const [showPass,setShowPass] = useState(true)
// estado para poder mostrar la confirmacion de la contraseña
  const [showConfPass,setShowConfPass] = useState(true)
  // funcion para capturar los cambios de los inputs
  const changeHandler = (event) => {
    let amanashe = event.target.name;
    let nashe = event.target.value;
    setForm({ ...form, [amanashe]: nashe });
    console.log('email', form.email, 'password', form.password,'confpass',form.confirmpassword);
  };
  // funcion para mostrar constraseña
  const handleShowPass = (props) => {
    if(props === "btpass"){
      setShowPass(!showPass);
    }
    if(props === "btconfpass"){
      setShowConfPass(!showConfPass);
    }
  }
// funcion que valida los inputs y los despacha al back en caso de no tener errores
  const submitHandler = async (event) => {
    event.preventDefault();

    const requiredFields = ["name", "surname", "email", "phone", "password"];
    const hasMissingFields = requiredFields.some((field) => form[field] === "");
    if (hasMissingFields) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }
    let err = await validateinput(form);
    console.log(err);
    setErrors(err);
    if (Object.keys(errors).length === 0) {
      console.log('se envio nashe');
    } else {
      console.log('hay errores chamo');
    }
    //     try {
    //         const response = await axios.post("https://ecowise-server01.onrender.com/users", form);
    //         if (response.status === 200) {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Creado con éxito',
    //                 showConfirmButton: false,
    //                 timer: 2000,
    //             });
    //         } else {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Hubo un error en la solicitud',
    //                 showConfirmButton: false,
    //                 timer: 2000,
    //             });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Revise los datos ingresados',
    //             showConfirmButton: false,
    //             timer: 2000,
    //         });
    // }
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
          <div className="">
            <p className="mr-2">Nombre</p>
            <Input Color="red" type="text" size="lg" value={form.name} onChange={changeHandler} name="name" className="bg-white border-black" maxLength="40" />
            <p>{errors.name}</p>
          </div>
          <div className="">
            <p className="mr-2">Apellido</p>
            <Input type="text" size="lg" value={form.surname} onChange={changeHandler} name="surname" className=" border-black" maxLength="40" />
            <p>{errors.surname}</p>
          </div>
          <div className="">
            <p className="mr-2">Telefono</p>
            <Input type="text" size="lg" value={form.phone} onChange={changeHandler} name="phone" className=" border-black" placeholder="387mañerito" />
          </div>
          <div className="">
            <p className="mr-2">E-mail</p>
            <Input type="email" size="lg" value={form.email} onChange={changeHandler} name="email" className=" border-black" placeholder="abc123@hotmail.com" required />
            <p>{errors.email}</p>
          </div>
          <div className="">
            <p className="mr-2"> Contraseña</p>
            <div className="relative flex">
              <Input type={showPass? "password" : "text"} size="lg" value={form.password} onChange={changeHandler} name="password" className="border-black pr-10" minLength="3" maxLength="16" required/>
              <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={()=>handleShowPass("btpass")} >
                {showPass? <BsFillEyeSlashFill className="text-xl" /> : <BsFillEyeFill className="text-xl"/>}
              </button>
            </div>
            <p>{errors.password}</p>
          </div>
          <div className="">
            <p className="mr-2"> Confirmar Contraseña</p>
            <div className="relative flex">
              <Input type={showConfPass? "password" : "text"} size="lg" value={form.confirmpassword} onChange={changeHandler} name="confirmpassword" className="border-black pr-10" minLength="3" maxLength="16" required/>
              <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={()=>handleShowPass("btconfpass")} >
                {showConfPass? <BsFillEyeSlashFill className="text-xl" /> : <BsFillEyeFill className="text-xl"/>}
              </button>
            </div>
            <p>{errors.confirm}</p>
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
            <Typography  variant="small" color="gray" className="flex items-center font-normal">
              I agree the
              <a href="#" className="font-medium transition-colors hover:text-gray-900">
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
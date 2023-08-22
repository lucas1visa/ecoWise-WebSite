import axios from "axios";
import Login from "../Login/Login";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  
  validateEmail,
  validatePhoneNumber,
  validateSingleSpace,
  validatePassword,
  validateName,
  validateMaxNameLength,
  validateConfirmPassword
  
} from "./Validaciones";
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

    let errorMessage = "";

    // Apply specific validation for each field
    switch (property) {
      case "name":
      case "surname":
        
        errorMessage += validateSingleSpace(value, property); 
        errorMessage += validateName(value); 
        errorMessage += validateMaxNameLength(value);
        
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "phone":
        errorMessage = validatePhoneNumber(value);
        break;
        case "password":
        errorMessage = validatePassword(value);
        break;
        case "confirmPassword":
      errorMessage = validateConfirmPassword(value, form.password);
      break;
        
      default:
        break;
    }

    setErrors({ ...errors, [property]: errorMessage });
    setForm({ ...form, [property]: value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
  
    const requiredFields = ["name", "surname", "email", "phone", "password", "confirmPassword"];
    const hasMissingFields = requiredFields.some((field) => form[field] === "");
    
    if (hasMissingFields) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }
  
    try {
      // Check if email is already registered
      const response = await axios.get(`https://ecowise-server01.onrender.com/users?email=${form.email}`);
      
      if (response.data.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Este correo electronico ya fue registrado anteriormente',
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
  
      // Continue with registration if email is not registered
      const registerResponse = await axios.post("https://ecowise-server01.onrender.com/users", form);
      
      if (registerResponse.status === 200) {
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
      <Typography color="gray" className=" font-normal">
        ¡TODOS LOS CAMPOS SON OBLIGATORIOS!
      </Typography>
      <form className=" w-80 max-w-screen-lg sm:w-96 mx-auto" onSubmit={submitHandler}>
        <div className="mb-4 flex flex-col gap-6">
   <div>
            <p className="mr-2">Nombre</p>
            <Input type="text" size="lg" value={form.name} onChange={changeHandler} name="name" className="border-black bg-slate-600" />
            <span className="text-red-500 text-xs">{errors.name}</span> 
          </div>
          <div className="">
            <p className="mr-2">Apellido</p>
            <Input type="text" size="lg" value={form.surname} onChange={changeHandler} name="surname" className="border-black" />
            <span className="text-red-500 text-xs">{errors.surname}</span> 
          </div>
          <div>
            <p className="mr-2">Telefono</p>
            <Input type="text" size="lg" value={form.phone} onChange={changeHandler} name="phone" className="border-black bg-slate-600" />
            <span className="text-red-500 text-xs">{errors.phone}</span> 
          </div>
          <div className="">
            <p className="mr-2">Correo Electronico</p>
            <Input type="text" size="lg" value={form.email} onChange={changeHandler} name="email" className="border-black" />
            <span className="text-red-500 text-xs">{errors.email}</span>
          </div>
          <div className="">
            <p className="mr-2">Contraseña</p>
            <Input type="password" size="lg" value={form.password} onChange={changeHandler} name="password" className="border-black" />
            <span className="text-red-500 text-xs">{errors.password}</span>
          </div>
          <div className="">
            <p className="mr-2">Confirmar Contraseña</p>
            <Input type="password" size="lg" value={form.confirmPassword} onChange={changeHandler} name="confirmPassword" className="border-black" />
            {errors.confirmPassword && <span className="text-red-500 ml-2 text-xs">{errors.confirmPassword}</span>} 
          </div>
</div>
       
        <Button className={`mt-6 text-black ${Object.values(errors).some((error) => error !== "") ? "bg-gray-400 cursor-not-allowed" : "bg-primary-202"}`} fullWidth type="submit" disabled={Object.values(errors).some(error => error !== "")}>
          REGISTRATE
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Ya tienes una cuenta ?{" "}
          <a href="#" className="font-medium text-gray-900">
            <Login></Login>
          </a>
        </Typography>
         
      </form>
    </Card>
  );
}

export default FormularioPRO;
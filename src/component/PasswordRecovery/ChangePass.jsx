import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";


const ChangePass = () => {
    // estado para mostrar contraseña
    let [showConfPass, setShowConfPass] = useState(true);
    // estado para mostrar contraseña
    let [showPass, setShowPass] = useState(true);
    let handleShow = (props)=>{
        if(props==="btpass"){
            setShowPass(!showPass)
        }
        if(props==="btconfpass"){
            setShowConfPass(!showConfPass)
        }
    };
    let submitHandlerCP = () =>{
        console.log('se envio man');
        try {
           
        } catch (error) {
            
        }
    }


    return (
        <Card className="mx-auto" color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray" className="mt-5">
                CAMBIO DE CONTRASEÑA
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Ingresa tus datos en los campos del formulario
            </Typography>
            <form className=" w-80 max-w-screen-lg sm:w-96 mx-auto" onSubmit={submitHandlerCP}>
                <div className="mb-4 flex flex-col gap-6">
                    <div className="">
                        <p className="mr-2"> Contraseña</p>
                        <div className="relative flex">
                            <Input type={showPass ? "password" : "text"} size="lg"  name="password" className="border-black pr-10" minLength="3" maxLength="16" />
                            <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={() => handleShow("btpass")} >
                                {showPass ? <BsFillEyeSlashFill className="text-xl" /> : <BsFillEyeFill className="text-xl" />}
                            </button>
                        </div>
                        {/* <span className="text-red-500 text-xs">{errors.password}</span> */}
                    </div>
                    <div className="">
                        <p className="mr-2"> Confirmar Contraseña</p>
                        <div className="relative flex">
                            <Input type={showConfPass ? "password" : "text"} size="lg" name="confirmPassword" className="border-black pr-10" minLength="3" maxLength="16" />
                            <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={() => handleShow("btconfpass")} >
                                {showConfPass ? <BsFillEyeSlashFill className="text-xl" /> : <BsFillEyeFill className="text-xl" />}
                            </button>
                        </div>
                        {/* {errors.confirmPassword && <span className="text-red-500 ml-2 text-xs">{errors.confirmPassword}</span>} */}
                    </div>
                </div>
                <Button className="" type="submit">
                    CAMBIAR PASSWORD
                </Button>
            </form>
        </Card>
    )
}

export default ChangePass;
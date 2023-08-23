import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";


const RecoverPass = () => {
    // estado para almacenar el correo
    let [emailInput,setEmailInput] = useState({
        email:""
    })
    // funcion que captura el tipado del input
    let handleMail = (event) =>{
        let property = event.target.name;
        let valor = event.target.value;
        console.log(property,valor)
        setEmailInput({...emailInput,[property]:valor});
    }
    // funcion que despacha la informacion al back para que envie el correo
    let handleSubmitMail = ()=>{
        console.log('se envio chamo');
    }
    return (
        <>
            <Card className="mx-auto" color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray" className="mt-5">
                    RECUPERAR PASSWORD
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Ingresa tus datos en los campos del formulario
                </Typography>
                <form className=" w-80 max-w-screen-lg sm:w-96 mx-auto" onSubmit={handleSubmitMail}>
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="">
                            <p className="mr-2">E-mail</p>
                            <Input type="email" size="lg"  name="email" value={emailInput.email} className=" border-black" onChange={handleMail} />
                        </div>
                    </div>
                    <Button className="" type="submit">
                        ENVIAR
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Verifica tu casilla de correo
                    </Typography>
                </form>
            </Card>
        </>
    )
}

export default RecoverPass;
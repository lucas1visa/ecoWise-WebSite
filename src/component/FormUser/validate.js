import axios from "axios";


const validateinput = async(inputs) =>{
    let errors= {};
    // EXPRESIONES REGULARES PARA CONTROLAR PASSWORD
    const isNonWhiteSpace = /^\S*$/;
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    // EXPRESION REGULAR PARA EL EMAIL
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // preguntamos si ese mail se encuentra disponible para crearse
    const OneMail = await axios.post("/users/oneMail",{email:inputs.email})
    .then((response)=>{console.log('email',response.data)})
    .catch((error)=>{console.error(error);
    errors.email = 'email se encuentra en uso'})
    // controlamos los inputs en caso de tener algun error mostramos cual es
    if(inputs.password){
        if(inputs.password.length<17){
            if(!isNonWhiteSpace.test(inputs.password)){
                errors.password = 'No debe contener espacios en blanco';
            }
            if(!isContainsUppercase.test(inputs.password)){
                errors.password = "Debe contener al menos una letra mayúscula.";
            }
            if(!isContainsNumber.test(inputs.password)){
                errors.password = 'Debe contener al menos un numero'
            }
        } else {
            errors.password = "Debe ser menor o igual a 16 carateres"
        }
    }else{
        errors.password += 'Tiene que tener mas de 5 caracteres';
    }
    if (!inputs.name){
        errors.name = 'Por favor ingrese un nombre'
    }
    if(isContainsNumber.test(inputs.name)){
        errors.name = 'No debe contener numeros'
    }
    if(inputs.password !== inputs.confirmpassword){
        errors.confirm = 'Las contraseñas no coinciden';
    }

    return errors;
}

export default validateinput;
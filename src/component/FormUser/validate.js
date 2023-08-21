


const validateinput = (inputs) =>{
    let errors= {
        password:""
    };
    // EXPRESIONES REGULARES PARA CONTROLAR PASSWORD
    const isNonWhiteSpace = /^\S*$/;
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    // EXPRESION REGULAR PARA EL EMAIL
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(inputs.password.length>5){
        if(inputs.password.length<17){
            if(!isNonWhiteSpace.test(inputs.password)){
                errors.password += 'La contraseña no debe contener espacios en blanco';
            }
            if(!isContainsUppercase.test(inputs.password)){
                errors.password += "La contraseña debe contener al menos una letra mayúscula.";
            }
            if(!isContainsNumber.test(inputs.password)){
                errors.password += 'La contraseña debe contener al menos un numero'
            }
        } else {
            errors.password += "La contraseña debe ser menor o igual a 16 carateres"
        }
    }
    if(!emailRegex.test(inputs.email)){
        errors.email = 'Tiene formato erroneo,Sugerencias: 1)conste de escribir bien el dominio. Ej:(.com),(.es) 2)conste de que tenga el @'
    }

    return errors;
}

export default validateinput;


const validate = (inputs) => {
    let errors = {};
    // expresion regular para validar el email
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    // expresiones regulares para controlar el formato de las passwords
    const isNonWhiteSpace = /^\S*$/;
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    const isValidLength = /^.{10,16}$/;
    // testeo del email
    if (!emailRegex.test(inputs.email)) {
        errors.email = "Email tiene un formato erroneo";
    }
    // testeo del password
    if (!isNonWhiteSpace.test(inputs.password)) {
        errors.password = "La contraseña no debe contener espacios en blanco. ";
    };
    if (!isContainsUppercase.test(inputs.password)) {
        errors.password = "La contraseña debe contener al menos una letra mayúscula. ";
    }
    if (!isContainsLowercase.test(inputs.password)) {
        errors.password = "La contraseña debe contener al menos una letra minúscula. ";
    }
    if (!isContainsNumber.test(inputs.password)) {
        errors.password = "La contraseña debe contener al menos un número. ";
    }
    if (!isContainsSymbol.test(inputs.password)) {
        errors.password = "La contraseña debe contener al menos un símbolo especial. ";
    }
    if (!isValidLength.test(inputs.password)) {
        errors.password = "La contraseña debe tener entre 10 y 16 caracteres. ";
    }
    // retorno los errores en caso de haber
    return errors;
}
export default validate;
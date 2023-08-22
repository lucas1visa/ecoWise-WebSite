
  
  export const validateEmail = (email) => {
    if (!email) {
      return ""; // No error message for empty field
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Por favor ingrese un correo electrónico válido.";
    }
    return "";
  };
  
  export const validatePhoneNumber = (phone) => {
    if (!phone) {
      return ""; // No error message for empty field
    }
  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return "Ingrese un número válido (10 dígitos).";
    }
    return "";
  };

  export const validateSingleSpace = (value, fieldName) => {
    const spaceCount = value.split(" ").length - 1;
    if (spaceCount > 1) {
      return `No debe tener mas de 1 espacio.`;
    }
    return "";
  };

  export const validatePassword = (password) => {
    if (!password) {
      return ""; 
    }
  
    
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const minLength = 6;
  
    if (!uppercaseRegex.test(password) || !digitRegex.test(password) || password.length < minLength) {
      return "Debe contener al menos una letra mayúscula, un número y tener al menos 6 caracteres.";
    }
  
    return "";
  };

  export const validateName = (name) => {
    if (!name) {
      return ""; // No error message for empty field
    }
    if(name[0]===' '){
      return "No puede tener un espacio en blanco al inicio"
    }
    const numberRegex = /\d/;
    if (numberRegex.test(name)) {
      return "No debe contener números.";
    }
  
    return "";
  };
  
  export const validateMaxNameLength = (name) => {
    if (!name) {
      return ""; // No error message for empty field
    }
  
    const maxLength = 18;
    if (name.length > maxLength) {
      return "Excediste el limite de caracteres";
    }
  
    return "";
  };


  export const validateConfirmPassword = (confirmPassword, originalPassword) => {
    if (!confirmPassword) {
      return ""; // No error message for empty field
    }
  
    if (confirmPassword !== originalPassword) {
      return "Las contraseñas no coinciden.";
    }
  
    return "";
  };
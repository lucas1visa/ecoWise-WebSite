import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FiestaMessage from "./FiestaMessage";
import { postUser } from "../../redux/actions/index";
import styles from "../UserProfile/UserProfile.module.css";
import { FormGroup } from "reactstrap";

const UserProfile = () => {
  // Dispatch para enviar acciones de Redux
  const dispatch = useDispatch();

  // Estado local para almacenar los datos del formulario
  const [state, setState] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Estado local para almacenar los mensajes de error de validación
  const [errors, setErrors] = useState({
    name: "Nombre requerido",
    surname: "Apellido requerido",
    email: "Email requerido",
    phone: "",
    password: "Contraseña requerida",
    confirmPassword: "Debe confirmar la contraseña",
  });

  // Nuevo estado para rastrear si el usuario se ha creado correctamente
  const [userCreated, setUserCreated] = useState(false);

  // Función para deshabilitar el botón de envío si hay errores en el formulario
  const disable = () => {
    for (let error in errors) {
      if (errors[error] !== "") return true;
    }
    return false;
  };

  // Función para validar el campo de teléfono
  const validatePhone = (input) => {
    const phoneRegex = /^\d{10}$/;
    return input.phone
      ? phoneRegex.test(input.phone)
        ? ""
        : "Teléfono debe tener 10 dígitos numéricos"
      : "";
  };

  // Función para restablecer el formulario a su estado inicial
  const resetForm = () => {
    setState({
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    setUserCreated(true);

    // Llamamos a la función para redirigir a la página de inicio después de unos segundos
    redirectToHome();
  };

  // Función para redirigir a la página de inicio después de unos segundos
  const redirectToHome = () => {
    setTimeout(() => {
      window.location.href = "/"; // Redirigimos a la página de inicio ("/")
    }, 5000); // Esperamos 5000ms (5 segundos) antes de redirigir
  };

  // Función para validar el campo de contraseña
  const validatePassword = (input) => {
    const isNonWhiteSpace = /^\S*$/;
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    const isValidLength = /^.{10,16}$/;

    let errorMessage = "";

    if (!isNonWhiteSpace.test(input.password)) {
      errorMessage += "La contraseña no debe contener espacios en blanco. ";
    }

    if (!isContainsUppercase.test(input.password)) {
      errorMessage +=
        "La contraseña debe contener al menos una letra mayúscula. ";
    }

    if (!isContainsLowercase.test(input.password)) {
      errorMessage +=
        "La contraseña debe contener al menos una letra minúscula. ";
    }

    if (!isContainsNumber.test(input.password)) {
      errorMessage += "La contraseña debe contener al menos un número. ";
    }

    if (!isContainsSymbol.test(input.password)) {
      errorMessage +=
        "La contraseña debe contener al menos un símbolo especial. ";
    }

    if (!isValidLength.test(input.password)) {
      errorMessage += "La contraseña debe tener entre 10 y 16 caracteres. ";
    }

    return errorMessage ? errorMessage : "";
  };

  // Función para validar el campo de confirmación de contraseña
  const validateConfirmPassword = (input) => {
    return input.confirmPassword === state.password
      ? ""
      : "Las contraseñas no coinciden";
  };

  // Función para validar un campo específico del formulario
  const validateField = (input, name) => {
    const updatedErrors = { ...errors };

    switch (name) {
      case "name":
        updatedErrors.name = input.name ? "" : "Nombre requerido";
        break;
      case "surname":
        updatedErrors.surname = input.surname ? "" : "Apellido requerido";
        break;
      case "email":
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        updatedErrors.email = input.email
          ? emailRegex.test(input.email)
            ? ""
            : "Email tiene un formato erroneo"
          : "Email requerido";
        break;
      case "phone":
        updatedErrors.phone = validatePhone(input);
        break;
      case "password":
        updatedErrors.password = validatePassword(input);
        break;
      case "confirmPassword":
        updatedErrors.confirmPassword = validateConfirmPassword(input);
        break;
      default:
        break;
    }

    setErrors(updatedErrors);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Comprobamos si hay errores antes de enviar el formulario
    if (!disable()) {
      const { name, surname, email, phone, password } = state;
      dispatch(postUser({ name, surname, email, phone, password }));
      // Restablecer el formulario después de enviar con éxito el usuario
      resetForm();
    }
  };

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Eliminar espacios en blanco iniciales del valor
    const trimmedValue = value.trim();
    setState((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));

    validateField({ ...state, [name]: trimmedValue }, name);
  };

  // Estado local para rastrear si se muestra la contraseña en el campo de contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estado local para rastrear si se muestra la contraseña en el campo de confirmación de contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña en el campo de contraseña
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Función para alternar la visibilidad de la contraseña en el campo de confirmación de contraseña
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div>
      <FormGroup>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
            {errors.name}
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              name="surname"
              value={state.surname}
              onChange={handleChange}
            />
            {errors.surname}
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            {errors.email}
          </div>
          <div>
            <label>Telefono</label>
            <input
              type="text"
              name="phone"
              value={state.phone}
              onChange={handleChange}
            />
            {errors.phone}
          </div>
          <div>
            <label>Contraseña</label>
            <div style={{ position: "relative" }}>
              <input
                // type="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={state.password}
                onChange={handleChange}
              />
              {/* Botón para alternar la visibilidad de la contraseña */}
              <button
                type="button"
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password}
          </div>
          {/* Campo de confirmación de contraseña */}
          <div>
            <label>Confirmar Contraseña</label>
            <div style={{ position: "relative" }}>
              <input
                // type="password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={state.confirmPassword}
                onChange={handleChange}
              />
              {/* Botón para alternar la visibilidad de la contraseña de confirmación */}
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.confirmPassword}
          </div>
          {/* Mostrar FiestaMessage cuando userCreated sea verdadero */}
          {userCreated && <FiestaMessage />}
          {/* Botón de envío */}
          <button disabled={disable()} type="submit">
            Submit
          </button>
        </form>
      </FormGroup>
    </div>
  );
};

export default UserProfile;

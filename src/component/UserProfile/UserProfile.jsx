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
    address1: "",
    address2: "",
    number: "",
    door: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  });

  // Estado local para almacenar los mensajes de error de validación
  const [errors, setErrors] = useState({
    name: "Nombre requerido",
    surname: "Apellido requerido",
    email: "Email requerido",
    phone: "",
    password: "Contraseña requerida",
    confirmPassword: "Debe confirmar la contraseña",
    address1: "Dirección requerida",
    address2: "Cualquier otro dato que ayude a localizar el lugar",
    number: "Número requerido",
    door: "Piso/Puerta requerido",
    city: "Ciudad requerida",
    province: "Provincia requerida",
    country: "País requerido",
    postalCode: "Código postal requerido",
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
    const phoneRegex = /^\d{9,15}$/;
    return input.phone
      ? phoneRegex.test(input.phone)
        ? ""
        : "Teléfono debe contener solo dígitos y tener entre 9 y 15 dígitos numéricos"
      : "";
  };

  // Función para comprobar si el email existe en la base de datos
  // const isEmailRegistered = async (email) => {
  //   // Simular una llamada a la API o servicio externo
  //   const response = await fetch(`${DATABASE_REMOTE}/email/${email}`);
  //   const data = await response.json();
  //   return data.isRegistered; // Supongamos que el servidor devuelve si el email está registrado
  // };

  // Función para restablecer el formulario a su estado inicial
  const resetForm = () => {
    setState({
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address1: "",
      address2: "",
      number: "",
      door: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
    });

    setUserCreated(true);

    // Llamamos a la función para redirigir a la página de inicio después de unos segundos
    redirectToHome();
  };

  // Función para redirigir a la página de inicio después de unos segundos
  const redirectToHome = () => {
    setTimeout(() => {
      window.location.href = "/"; // Redirigimos a la página de inicio ("/")
    }, 4000); // Esperamos 4000ms (4 segundos) antes de redirigir
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
      case "address1":
        updatedErrors.address1 = input.address1 ? "" : "Dirección requerida";
        break;
      case "address2":
        updatedErrors.address2 = input.address2
          ? ""
          : "Cualquier otro dato que ayude a localizar el lugar";
        break;
      case "number":
        updatedErrors.number = input.number ? "" : "Número requerido";
        break;
      case "door":
        updatedErrors.door = input.door ? "" : "Piso/Puerta requerido";
        break;
      case "city":
        updatedErrors.city = input.city ? "" : "Ciudad requerida";
        break;
      case "province":
        updatedErrors.province = input.province ? "" : "Provincia requerida";
        break;
      case "country":
        updatedErrors.country = input.country ? "" : "País requerido";
        break;
      case "postalCode":
        updatedErrors.postalCode = input.postalCode
          ? ""
          : "Código postal requerido";
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
      const {
        name,
        surname,
        email,
        phone,
        password,
        address1,
        address2,
        number,
        door,
        city,
        province,
        country,
        postalCode,
      } = state;
      dispatch(
        postUser({
          name,
          surname,
          email,
          phone,
          password,
          address1,
          address2,
          number,
          door,
          city,
          province,
          country,
          postalCode,
        })
      );
      // Restablecer el formulario después de enviar con éxito el usuario
      resetForm();
    }
  };

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Eliminar espacios en blanco iniciales del valor
    const trimmedValue = value.trim();

    //   // Validación síncrona y asíncrona del email
    //   if (name === "email") {
    //     const newErrors = { ...errors };
    //     newErrors[name] = validateEmail(trimmedValue);
    //     setErrors(newErrors);

    //     // Llamada a la función auxiliar para la validación asíncrona
    //     validateEmailAsync(trimmedValue);
    //   }

    // // Función auxiliar para la validación asíncrona del email
    // const validateEmailAsync = async (email) => {
    //   try {
    //     const isRegistered = await isEmailRegistered(email);
    //     if (isRegistered) {
    //       setErrors((prevErrors) => ({
    //         ...prevErrors,
    //         email: "El Usuario ya existe",
    //       }));
    //     } else {
    //       setErrors((prevErrors) => ({
    //         ...prevErrors,
    //         email: "",
    //       }));
    //     }
    //   } catch (error) {
    //     console.error("Error al verificar el email:", error);
    //   }
    // };

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
    <div className="container">
      <FormGroup>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <fieldset>
            <div class="pure-g">
              <div class="row mb-2 align-items-center">
                <label class="col-2 col-form-label text-end" for="nameInput">
                  Nombre
                </label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    class="form-control"
                    id="nameInput"
                  />
                </div>
                <div class="col-sm-8 text-end text-danger">{errors.name}</div>
              </div>

              <div class="row mb-2 align-items-center">
                <label class="col-2 form-label text-end" for="apellidoInput">
                  Apellido
                </label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    name="surname"
                    value={state.surname}
                    onChange={handleChange}
                    class="form-control"
                    id="apellidoInput"
                  />
                </div>
                <div class="col-sm-8 text-end text-danger">
                  {errors.surname}
                </div>
              </div>

              <div class="row mb-2">
                <label class="col-2 form-label text-end" for="emailInput">
                  Email
                </label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    class="form-control"
                    id="emailInput"
                  />
                </div>
                <div class="col-sm-8 text-end text-danger">{errors.email}</div>
              </div>

              <div class="row mb-2 align-items-center">
                <label class="col-sm-2 form-label text-end" for="phoneInput">
                  Teléfono
                </label>

                <div class="col-sm-6">
                  <input
                    type="text"
                    name="phone"
                    value={state.phone}
                    onChange={handleChange}
                    maxLength={15} //nuevo
                    minLength={9} //nuevo
                    class="form-control"
                    id="phoneInput"
                  />
                </div>
                <div class="col-sm-8 text-end text-danger">{errors.phone}</div>
              </div>

              <div class="row mb-2">
                <label class="col-2 form-label text-end" for="passInput">
                  Contraseña
                </label>
                <div class="col-sm-6 relative">
                  {/* <div style={{ position: "relative" }}> */}
                  <input
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    class="form-control pr-10"
                    id="passInput"
                  />
                  {/* <div class="col-12"> */}
                  {/* Botón para alternar la visibilidad de la contraseña */}
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    id="basic-addon1"
                    class="input-group-text"
                    style={{
                      position: "relative",
                      top: "-55%",
                      right: "-93%",
                      // transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                  {/* </div> */}
                </div>
                <div class="col-sm-8 text-end text-danger">
                  {errors.password}
                </div>
              </div>

              {/* Campo de confirmación de contraseña */}
              <div class="row mb-2">
                <label class="col-2 form-label text-end" for="pass2Input">
                  Confirmar Contraseña
                </label>
                <div class="col-sm-6">
                  {/* <div style={{ position: "relative" }}> */}
                  <input
                    // type="password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    class="form-control"
                    id="pass2Input"
                  />
                  {/* Botón para alternar la visibilidad de la contraseña de confirmación */}
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    style={{
                      position: "relative",
                      top: "-55%",
                      right: "-47%",
                      // transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                <div class="col-sm-8 text-end text-danger">
                  {errors.confirmPassword}
                </div>
                <div class="row mb-2">
                  <label class="col-2 form-label text-end">Dirección</label>
                  <div class="col-sm-6">
                  <input
                    type="text"
                    name="address1"
                    value={state.address1}
                    onChange={handleChange}
                    class="form-control"
                  />
                  </div>
                  <div class="col-sm-8 text-end text-danger">
                  {errors.address1}
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-2 form-label text-end">Complemento a la dirección</label>
                  <div class="col-sm-6">
                  <input
                    type="text"
                    name="address2"
                    value={state.address2}
                    onChange={handleChange}
                    class="form-control"
                  />
                  </div>
                  <div class="col-sm-8 text-end text-danger">
                  {errors.address2}
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-2 form-label text-end">Número</label>
                  <div class="col-sm-6">
                  <input
                    type="text"
                    name="number"
                    value={state.number}
                    onChange={handleChange}
                    class="form-control"
                  />
                  </div>
                  <div class="col-sm-8 text-end text-danger">
                  {errors.number}
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-2 form-label text-end">Piso/Puerta</label>
                  <div class="col-sm-6">
                  <input
                    type="text"
                    name="door"
                    value={state.door}
                    onChange={handleChange}
                    class="form-control"
                  />
                  </div>
                  <div class="col-sm-8 text-end text-danger">
                  {errors.door}
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-2 form-label text-end">Ciudad</label>
                  <div class="col-sm-6">
                  <input
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={handleChange}
                    class="form-control"
                  />
                  </div>
                  <div class="col-sm-8 text-end text-danger">
                  {errors.city}
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-2 form-label text-end">Provincia</label>
                  <div class="col-sm-6">
                  <input
                    type="text"
                    name="province"
                    value={state.province}
                    onChange={handleChange}
                    class="form-control"
                  />
                  </div>
                  <div class="col-sm-8 text-end text-danger">
                  {errors.province}
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-2 form-label text-end">País</label>
                  <div class="col-sm-6">
                  <input
                    type="text"
                    name="country"
                    value={state.country}
                    onChange={handleChange}
                    class="form-control"
                  />
                  </div>
                  <div class="col-sm-8 text-end text-danger">
                  {errors.country}
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-2 form-label text-end">Código Postal</label>
                  <div class="col-sm-6">
                  <input
                    type="text"
                    name="postalCode"
                    value={state.postalCode}
                    onChange={handleChange}
                    class="form-control"
                  />
                  </div>
                  <div class="col-sm-8 text-end text-danger">
                  {errors.postalCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Mostrar FiestaMessage cuando userCreated sea verdadero */}
            {userCreated && <FiestaMessage />}
            {/* Botón de envío */}
            <button disabled={disable()} type="submit" class="btn btn-primary">
              Crear Usuario
            </button>
          </fieldset>
        </form>
      </FormGroup>
    </div>
  );
};

export default UserProfile;

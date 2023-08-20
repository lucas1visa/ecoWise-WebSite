import React, { useState } from "react";

const FormComponent = ({ onSubmit }) => {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrors = {
    name: "obligatorio*",
    surname: "obligatorio*",
    email: "obligatorio*",
    phone: "obligatorio*",
    password: "obligatorio*",
    confirmPassword: "confirmar la contraseña",
  };

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  // Validation functions...

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    // Validate the field here
  };

  const disable = () => {
    // Determine if the submit button should be disabled
    // based on validation errors or other conditions
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission...
    if (!disable()) {
      onSubmit(state);
      setState(initialState); // Reset form state
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        {/* Repeat for other fields */}
        
        {/* Fieldsets */}
        {/* You can group related form fields in fieldsets */}
        
        {/* FiestaMessage */}
        {/* Show FiestaMessage based on certain conditions */}
        
        {/* Submit button */}
        <button type="submit" disabled={disable()}>Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
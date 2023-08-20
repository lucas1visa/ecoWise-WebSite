import React from "react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/actions/index";
import FiestaMessage from "./FiestaMessage";
import FormComponent from "./FormComponent";

const UserProfile = () => {
  const dispatch = useDispatch();

  const handleSubmit = (userData) => {
    dispatch(postUser(userData));
  };

  return (
    <div>
      <h1>CREA TU CUENTA</h1>
      <FormComponent onSubmit={handleSubmit} />
    </div>
  );
};

export default UserProfile;
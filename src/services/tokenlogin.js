import axios from "axios";

// funcion que realiza la peticion al DB devolviendo el token con informacion encryptada
export const LoginUser = async(login) =>{
    const {data} = await axios.post('/login',login);
    // console.log(token);
    return data;
  }
  // LoginUser({email:"jose@gmail.com",password:"joseantoS1!"})
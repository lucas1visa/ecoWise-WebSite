
import axios from "axios";

// funcion que realiza la peticion al DB devolviendo el token con informacion encryptada
export const LoginUser = async(login) =>{
  try {
    const {data} = await axios.post('/login',login);
    if(data){
      return data;
    }else{
      throw new Error('Fallo autenticacion');
    }
  } catch (error) {
    return error;
  }
}
  // LoginUser({email:"jose@gmail.com",password:"joseantoS1!"})
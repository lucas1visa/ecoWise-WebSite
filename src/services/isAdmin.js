import axios from "axios";

// funcion para determinar el rol del usuario logueado
export const AdminOrUser = async (payload) => {
    // configuracion especial para almacenar el token y mandarlo a desencryptar en el back
    // const config = {
    //     headers: { Authorization: `Bearer ${payload}`}
    // }
    let infotoken = {token:payload}
    try {
        // realizamos la peticion al back
        const resp = await axios.post('/isAdmin',infotoken);
        console.log(resp.data);
        if (resp.data.id) {
            return {
                isAuthenticated: true,
                isAdmin: resp.data.isAdmin // Retrieve the isAdmin property from the response
            };
        } else {
            return {
                isAuthenticated: false,
                isAdmin: false
            };
        }
    } catch(err) {
        return {
            isAuthenticated: false,
            isAdmin: false
        };
    }
}

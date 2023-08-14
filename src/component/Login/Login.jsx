// importamos todos los componentes de para el formulario de login
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
// importamos la funcion de validacion para los inputs
import validate from "./validate";
// importamos la funcion para despachar los datos y nos devuelva el token
import { LoginUser } from "../../services/tokenlogin";
// importamos el metodo de la ventana emergente para la autenticacion de google 
import { signInWithPopup } from "firebase/auth";
// a su vez debemos importar el metodo de autenticacion
import { auth, providerGoogle, providerFace, providerGitHub } from "../../services/firebase";
// importamos para manejar la apertura y cierre de la ventana emergente
import { useState } from "react";
import { Link } from "react-router-dom";
import {FcGoogle} from "react-icons/fc"
import { AiOutlineGithub } from "react-icons/ai";
import { BsFacebook, BsEye } from "react-icons/bs";
import { postUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Login = () => {

    const dispatch = useDispatch();
    // ====================================== VENTANA EMERGENTE PARA LOOGIN ============================================
    // BsEyeSlash,BsEye
    // estado para controlar la apertura o cierre de la ventana emergente
    const [showFormLogin, setShowFormLogin] = useState({
        open: false
    });
    // estado local para controlar la informacion en los inputs 
    const [valuesInputs, setValuesInputs] = useState({
        email: "",
        password: ""
    });
    // estado para mostrar el boton de logout
    const [showLogout, setShowLogout] = useState(false);
    // estado para mostrar el boton de login
    const [showLogin, setShowLogin] = useState(true);
    // estado para almacenar los errores de los inputs
    const [err, setErr] = useState({});
    // funcion para captura la informacion y almacenarla en el estado local
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setValuesInputs({ ...valuesInputs, [name]: value })
    };
    // funcion para cerrar el login
    const handleLogin = () => {
        setShowFormLogin({
            open: !showFormLogin.open
        })
    }
    // funcion para despachar la informacion de los inputs y almacenarlo en la DB
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        // controlamos y validamos los inputs
        let errorinput = validate(valuesInputs);
        // en caso de que exista algun error los almacenamos en el estado local
        setErr(errorinput);
        //si no existe ningun error despachamos la info
        if (Object.keys(errorinput).length === 0) {
            // despachamos la informacion y obtenemos el valor del token
            let infotoken = await LoginUser(valuesInputs);
            // console.log(infotoken.newToken);
            // console.log(typeof infotoken.newToken);
            // comprobamos el resultado del token, si el usuario y password fueron validados debera devolver
            // un token, en caso contrario devolvera un objeto vacio
            if (Object.getOwnPropertyNames(infotoken.newToken).length) {
                // almacenamos la informacion en localstorage del navegador
                localStorage.setItem("tokenDB", infotoken.newToken);
                //dejamos de mostrar el componente login
                setShowFormLogin({
                    open: false
                });
                // limpiamos los inputs
                setValuesInputs({
                    email: "",
                    password: ""
                })
                // dejamos de mostrar el boton de login
                setShowLogin(false);
                // mostramos el boton de logout
                setShowLogout(true);
                console.log('se envio che');
            } else {
                console.log('Hubo error en encontrar el usuario o validar su password');
            }
        } else {
            console.log('hay errores man');
        }
    };
    // funcion para elimanar el token y mostar el boton de login
    const handleLogout = () => {
        // quitamos la informacion almacenada en la localstorage
        localStorage.removeItem('tokenDB');
        localStorage.removeItem('tokenGoogle');
        localStorage.removeItem('tokenFace');
        localStorage.removeItem('tokenGitHub');
        // mostramos el boton de login
        setShowLogin(true);
        // dejamos de mostrar el boton de logout
        setShowLogout(false);
    }
    const handleGoogleLogin = async (event) => {
        try {
            // let name=event.target.name;
            // realizamos una peticion a la api de google y esperamos su respuesta
            const credentialsUser = await signInWithPopup(auth, providerGoogle);
            console.log(credentialsUser);
            let name = credentialsUser._tokenResponse.firstName;
            let surname = credentialsUser._tokenResponse.lastName;
            let email = credentialsUser._tokenResponse.email;
            let register = credentialsUser._tokenResponse.providerId;
            localStorage.setItem('tokenGoogle',credentialsUser.user.accessToken);
            // let name = credentialsUser.tokenResponse.firstName;
            dispatch(postUser({ name, surname, email,register}));

            setShowLogout(true);
            setShowLogin(false);
            setShowFormLogin(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handleFaceLogin = async (event) => {
        try {
            // let name=event.target.name;
            // console.log(name);
            // realizamos una peticion a la api de google y esperamos su respuesta
            const credentialsUser = await signInWithPopup(auth, providerFace);
            console.log(credentialsUser);
            let name = credentialsUser._tokenResponse.firstName;
            let surname = credentialsUser._tokenResponse.lastName;
            let email = credentialsUser._tokenResponse.email;
            let register = credentialsUser._tokenResponse.providerId;
            dispatch(postUser({ name, surname,email,register}));
            setShowLogout(true);
            setShowLogin(false);
            setShowFormLogin(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handleGitHub = async(event)=>{
        try {
            // let name=event.target.name;
            // console.log(name);
            // realizamos una peticion a la api de google y esperamos su respuesta
            const credentialsUser = await signInWithPopup(auth, providerGitHub);
            console.log(credentialsUser);
            let name = credentialsUser._tokenResponse.firstName;
            let surname = credentialsUser._tokenResponse.lastName;
            // let email = credentialsUser._tokenResponse.email;
            localStorage.setItem('tokenGitHub',credentialsUser.user.accessToken);
            let register = credentialsUser._tokenResponse.providerId;
            dispatch(postUser({ name, surname,register}));
            setShowLogout(true);
            setShowLogin(false);
            setShowFormLogin(false);
        } catch (error) {
            console.log(error);
        }
    }

    // =========================================================================================================================

    return (
        <>
            {/*=============================================== REGISTRO DE LOGIN ================================================= */}
            {showLogout && <Button onClick={handleLogout}>Salir</Button>}
            {showLogin && <Button onClick={handleLogin}>Iniciar</Button>}
            <Modal isOpen={showFormLogin.open}>
                <ModalHeader>
                    Iniciar Sesion
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmitLogin}>
                        <FormGroup>
                            <Label>email</Label>
                            <Input type="text" name="email" value={valuesInputs.email} onChange={handleChangeInput} />
                            <p>{err.email}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>password</Label>
                            <Input type="password" name="password" value={valuesInputs.password} onChange={handleChangeInput} />
                            <p>{err.password}</p>
                        </FormGroup>
                        <Button color="primary" type="submit">Iniciar Sesion</Button>
                    </form>
                    <Button onClick={handleGoogleLogin}><FcGoogle/></Button>
                    <Button onClick={handleFaceLogin}><BsFacebook/></Button>
                    <Button onClick={handleGitHub}><AiOutlineGithub/></Button>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleLogin}>Cerrar</Button>
                    <Link to="/account/register/">Registrate</Link>
                    <Link>Recuperar Password</Link>
                </ModalFooter>
            </Modal>
            {/* ============================================= TERMINACION DE LOGIN ====================================================== */}
        </>
    )
}

export default Login;
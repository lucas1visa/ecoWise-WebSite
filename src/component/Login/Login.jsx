// importamos todos los componentes de para el formulario de login
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
// importamos la funcion de validacion para los inputs
import validate from "./validate";
// importamos la funcion para despachar los datos y nos devuelva el token
import { LoginUser } from "../../services/tokenlogin";
// importamos el metodo de la ventana emergente para la autenticacion de google 
import { signInWithPopup } from "firebase/auth";
// a su vez debemos importar el metodo de autenticacion
import { auth, providerGoogle, providerGitHub } from "../../services/firebase";
// importamos para manejar la apertura y cierre de la ventana emergente
import { useState } from "react";
import { Link } from "react-router-dom";
import {FcGoogle} from "react-icons/fc"
import { AiOutlineGithub } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { getUsers, postUser, addToCart2 } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "./Login.css"



const Login = () => {

    const dispatch = useDispatch();
    const users = useSelector((state)=>state.users);
    const carritoSinUsuario1 = localStorage.getItem("carrito")
    const favoritosSinUsuario1 = localStorage.getItem("favorito")

    const carritoSinUsuario = JSON.parse(carritoSinUsuario1)
    const favoritosSinUsuario = JSON.parse(favoritosSinUsuario1)

    // ====================================== VENTANA EMERGENTE PARA LOOGIN ============================================
    // estado para controlar la sesion
    const [session,setSession] = useState(true);
    // estado local para controlar la informacion en los inputs 
    const [valuesInputs, setValuesInputs] = useState({
        email: "",
        password: ""
    });
    // funcion para captura la informacion y almacenarla en el estado local
    const [err, setErr] = useState({});

    // estado para mostrar el boton de (logout/ login) y ademas permitir abrir el la ventana emergente de logueo
    const [show, setShow] = useState({
        formlogin:false
    });
    // funcion para almacenar los errores de los inputs
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setValuesInputs({ ...valuesInputs, [name]: value })
    };
    // funcion para cerrar el login
    const handleLogin = () => {
        dispatch(getUsers());
        setShow({
            formlogin: !show.formlogin
        })
    };
    // funcion de registro con login para verificar si esta en DB
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        // controlamos y validamos los inputs
        let errorinput = validate(valuesInputs);
        // en caso de que exista algun error los almacenamos en el estado local
        setErr(errorinput);
        //si no existe ningun error despachamos la info
        if (Object.keys(errorinput).length === 0) {
             // despachamos la informacion al back-end
            let infotoken = await LoginUser(valuesInputs);
            // caso de exito, me trae el token
            // console.log(infotoken.newToken);
            // caso de falla, devuelve el error
            // console.log(infotoken.response.data);
            // comprobamos el resultado del token, si el usuario y password fueron validados debera devolver
            if(infotoken.response){
                if(infotoken.response.data.error === 'Usuario Bloqueado'){
                    Swal.fire({
                        icon: 'info',
                        title: 'Ooopss...',
                        text: 'Esta cuenta esta suspendida',
                        showConfirmButton: false,
                        timer: 4500,
                        footer: 'Contactese con un Admin o envie un correo con su consulta'
                    });
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email o Password erroneos',
                        showConfirmButton: false,
                        timer: 4500,
                        footer: 'Por favor verifique bien sus datos'
                    });
                }
            }else {
                // console.log('Mostrar cartel de logueo con exito');
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio con exitó',
                    showConfirmButton: false,
                    timer: 2000
                });
                // almacenamos la informacion en localstorage del navegador
                localStorage.setItem("token", infotoken.newToken);
                // estado para controlar la session
                setSession(true);
                //dejamos de mostrar el componente login y mostramos el boton de logout
                setShow({
                    formlogin: false
                });
                // limpiamos los inputs
                setValuesInputs({
                    email: "",
                    password: ""
                })
                let userid = users.find((e)=> e.email === valuesInputs.email);
                if(userid){
                    localStorage.setItem('userid',userid.id);
                    await dispatch(addToCart2(carritoSinUsuario,UserId));
                    await dispatch(addToFav2(favoritosSinUsuario,UserId));
                }else if(userid.isAdmin){
                    localStorage.setItem('admin',true)
                }
                console.log('se envio che');
            }
        } else {
            console.log('no se pudo despachar porque tiene errores');
        }
    };
    // funcion para elimanar el token y mostar el boton de login
    const handleLogout = () => {
        // quitamos la informacion almacenada en la localstorage
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('admin');
        localStorage.removeItem('carrito');
        localStorage.removeItem('favorito');


        // estado para controlar la sesion
        setSession(false)
        // window.location.reload();

    }
    const handleGoogleLogin = async (event) => {
        try {
            // providerGoogle.addScope("https://www.googleapis.com/auth/cloud-platform");
            // realizamos una peticion a la api de google y esperamos su respuesta
            const credentialsUser = await signInWithPopup(auth, providerGoogle);
            console.log(credentialsUser);
            let name = credentialsUser._tokenResponse.firstName;
            let surname = credentialsUser._tokenResponse.lastName;
            let email = credentialsUser._tokenResponse.email;
            let phone = credentialsUser.user.phoneNumber;
            let register = credentialsUser._tokenResponse.providerId;
            console.log(name,surname,email,phone,register);
            // buscamos si el usuario se encuentra registrando en nuestra DB
            let userid = users.find((e)=> e.email === email);
            // en caso de no estar lo almacenamos y lo guardamos en nuestro Estado Global
            if(!userid){
                dispatch(postUser({name, surname, email, phone, register}));
                Swal.fire({
                    icon: 'info',
                    title: 'Por Favor Valide su correo',
                    showConfirmButton: false,
                    timer: 4000,
                    footer:'Se envio un mail de confirmacion, por favor validelo'
                //   }).then(() => {
                //     window.location.reload(); // Recarga la página después de cerrar la notificación
                //   
            }
                );        
            }
            if(userid.isAdmin){
                localStorage.setItem('admin','true')
            }
            if(userid.isDeleted){
                Swal.fire({
                    icon: 'info',
                    title: 'Ooopss...',
                    text: 'Esta cuenta esta suspendida',
                    showConfirmButton: false,
                    timer: 4500,
                    footer: 'Contactese con un Admin o envie un correo con su consulta',
                    
                });
            }
            if(userid.register === 'google.com'){
                localStorage.setItem('token',credentialsUser.user.accessToken);
                localStorage.setItem('userid',userid.id);
                const UserId = await localStorage.getItem("userid")
                
                

                await dispatch(addToCart2(carritoSinUsuario,UserId));
                await dispatch(addToFav2(favoritosSinUsuario,UserId));

                Swal.fire({
                    icon: 'success',
                    title: 'Inicio con éxito',
                    showConfirmButton: false,
                    timer: 2000,
                //   }).then(() => {
                //     window.location.reload(); // Recarga la página después de cerrar la notificación
                  });                  
                setSession(true);
                setShow({
                    formlogin: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de login',
                    showConfirmButton: false,
                    timer: 4000,
                    text: 'Este mail se encuentra registrado con otra autenticacion'
                  }); 
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleGitHub = async(event)=>{
        try {
            // realizamos una peticion a la api de google y esperamos su respuesta
            const credentialsUser = await signInWithPopup(auth, providerGitHub);
            console.log(credentialsUser);
            localStorage.setItem('token',credentialsUser.user.accessToken);
            await dispatch(addToCart2(carritoSinUsuario,UserId));
            await dispatch(addToFav2(favoritosSinUsuario,UserId));
            let name = credentialsUser._tokenResponse.firstName;
            let surname = credentialsUser._tokenResponse.lastName;
            let register = credentialsUser._tokenResponse.providerId;
            console.log(name,surname,register);
            Swal.fire({
                icon: 'success',
                title: 'Inicio con exitó',
                showConfirmButton: false,
                timer: 2000
            });
            dispatch(postUser({ name, surname,register}));
            setSession(true);
            setShow({
                formlogin: false
            });
        } catch (error) {
            console.log(error);
        }
    }
   
    // =========================================================================================================================

    return (
        <>
            {/*=============================================== REGISTRO DE LOGIN ================================================= */}
            {localStorage.getItem('token')&&<Button onClick={handleLogout} className="logout-button">Salir</Button>}
            {!localStorage.getItem('token')&&<Button onClick={handleLogin} className="login-button">Iniciar</Button>}
            <Modal isOpen={show.formlogin}>
                <ModalHeader>
                    Iniciar Sesion
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmitLogin}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" name="email" value={valuesInputs.email} onChange={handleChangeInput} />
                            <p>{err.email}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" name="password" value={valuesInputs.password} onChange={handleChangeInput} />
                            <p>{err.password}</p>
                        </FormGroup>
                        <Button color="primary" type="submit">Iniciar Sesion</Button>
                    </form>
                    <Button onClick={handleGoogleLogin}><FcGoogle/></Button>
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
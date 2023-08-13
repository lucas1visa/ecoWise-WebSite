// Importamos a firebase app desde google
import { initializeApp } from "firebase/app";
// Importamos el provider(metodo) para autenticacion de google
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";

// cargamos las credenciales desde google cloud project
// indicando el tipo de dominio y el alcance del proyecto
const firebaseConfig = {
    apiKey: "AIzaSyBhCDeoSrpQMRJBnKR9MBEA7YCWbMAYxng",
    authDomain: "ecowise-db3bc.firebaseapp.com",
    projectId: "ecowise-db3bc",
    storageBucket: "ecowise-db3bc.appspot.com",
    messagingSenderId: "3055184398",
    appId: "1:3055184398:web:e37cc265ce188f99a3aa5f",
    measurementId: "G-GTTFWHLHG7"
};

// Inicializamos la aplicacion de firebase con la configuracion necesaria

const FirebaseApp = initializeApp(firebaseConfig);
// Inicializamos Firebase con la autenticacion que toma como referencia el servicio de getAuth
export const auth = getAuth();
// Creamos una instancia del metodo, donde devolvera un objeto con todos los datos de dicho usuario
export const providerGoogle = new GoogleAuthProvider();
export const providerFace = new FacebookAuthProvider();
export const providerGitHub = new GithubAuthProvider();
// exportamos ah firebase donde tenemos todos los permisos de autenticacion validados
export default FirebaseApp;
// FirebaseApp.auth().getIdTokenResult()
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    let uid = localStorage.getItem("userid")

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/users/find/${uid}`); // Cambia la ruta según tu configuración
                setUserData(response.data);
                console.log("DATA USER",response.data)
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, [uid]);

    if (!userData) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="user-profile">
            {/* <h2>Perfil de Usuario</h2>
            <p>Nombre: {userData.name}</p>
            <p>Apellido: {userData.surname}</p>
            <p>Correo electrónico: {userData.email}</p>
            Agrega aquí otros campos que desees mostrar */}

            <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mx-auto">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Perfil De usuario
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        Informacion importante
                    </p>
                </div>
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Nombre
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {userData.name}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Apellido
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {userData.surname}
                            </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {userData.email}
                            </dd>
                        </div>
                    
                    </dl>
                </div>
            </div>


        </div>
    );
};

export default UserProfile;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deletLogical } from "../../../redux/actions";
import '../../../App.css'
import './usersControl.css'
import { useDarkMode } from "../../DarkModeContext/DarkMode";

const UserControl = () => {
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleToggleLock = async (userId) => {
    await dispatch(deletLogical(userId));
    setInitialLoad(true)
    dispatch(getUsers()); // Actualizamos la lista después de la acción
  };
  
  return (
    <div className={isDarkMode ? 'modo-oscuro' : 'cart-modo-normal'}>
      <div className="container-user-admin">
      <h1 className="h1-title">Panel de control de usuario</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-8 section-admin">
        {users.map((user) => (
          <div className="p-2 rounded-xl shadow-2xl mb-2 flex flex-col gap-3 users-admin">
            <div
              className="grid grid-cols-1 xl:grid-cols-2 items-center gap-4 mb-1 users-admin"
              key={user.id}
            >
              <img
                src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                className="w-14 h-14 object-cover rounded-xl"
                alt="User"
              />
              {/* <div className="col-span-2 flex items-center gap-4"> */}
              <h3 className="font-bold text-start name-user-admin">
                {user.name} {user.surname}
              </h3>

              {!user.isDeleted ? (
                <span className="bg-primary-200 text-dark py-1 px-3 rounded-full font-medium">
                  Activo
                </span>
              ) : (
                <span className="bg-gray-200 text-dark py-1 px-3 rounded-full font-medium">
                  Desactivado
                </span>
              )}
              {/* </div> */}
              <button
                className={`text-white font-bold py-2  rounded-full bg-blue-700 hover:bg-green-600`}
                onClick={() => {
                  handleToggleLock(user.id);
                }}
              >
                {!user.isDeleted ? "Bloquear" : "Desbloquear"}
              </button>
            </div>
          </div>
        ))}
      </section>
      </div>
    </div>
  );
};

export default UserControl;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deletLogical } from "../../../redux/actions";
const UserControl = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleToggleLock = async (userId) => {
    await dispatch(deletLogical(userId));
    dispatch(getUsers()); // Actualizamos la lista después de la acción
  };

  return (
    <div>
      <h1>Panel de control de usuario</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-8">
        {users.map((user) => (
          <div className="bg-white p-4 rounded-xl shadow-2xl mb-2 flex flex-col gap-3">
            <div
              className="grid grid-cols-1 xl:grid-cols-2 items-center gap-4 mb-1"
              key={user.id}
            >
              <img
                src="https://ecowise-web-site.vercel.app/assets/EcoWise-d97d203f.jpg"
                className="w-14 h-14 object-cover rounded-xl"
                alt="User"
              />
              {/* <div className="col-span-2 flex items-center gap-4"> */}
              <h3 className="font-bold text-start">
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
  );
};

export default UserControl;

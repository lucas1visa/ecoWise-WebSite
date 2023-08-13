import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../redux/actions';
const UserControl = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleToggleLock = (userId) => {
        // dispatch(toggleUserLock(userId));
        console.log(userId)
    };

    return (
        <div>
    <h1>Panel de control de usuario</h1>
    <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
        {users.map(user => (
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4" key={user.id}>
                <div className="col-span-2 flex items-center gap-4">
                    <span>Nombre y apellido</span>
                    <h3 className="font-bold">{user.name} {user.surname}</h3>
                    <span className="bg-primary-200 text-dark py-1 px-3 rounded-full font-medium">
                        Activo
                    </span>
                </div>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Bloquear</button>
                <div>
                </div>
            </div>
            </div>


        ))}
    </section>
</div>
    );
};

export default UserControl;

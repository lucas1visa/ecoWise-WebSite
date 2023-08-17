import { Navigate, Outlet } from "react-router";

const  RoutesProtected = ({tokenadmin}) =>{
    console.log(tokenadmin);
    if(!tokenadmin){
        return <Navigate to='/' replace/>
    } else {
        return <Outlet/>
    }
}

export default RoutesProtected;
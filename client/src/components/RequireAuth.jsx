import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({admin}) => {
    const { state } = useAuth();
    const location = useLocation();

    //save location in state prop
    return (
        admin ? (
            state?.user?.isAdmin ? <Outlet /> 
            :state?.user?.accessToken     ? <Navigate to='/Unauthorized' state={{from:location}} replace/>
                                        : <Navigate to="/login" state={{from:location}} replace/>
        ):(
            state?.user?.isAdmin === false || state?.user?.isAdmin ? <Outlet />
            :state?.user?.accessToken  ? <Navigate to='/unauthorized' state={{from:location}} replace/>
                                    : <Navigate to="/login" state={{from:location}} replace/>
        )
    );
}

// intially isAdmin equal to null 
export default RequireAuth;
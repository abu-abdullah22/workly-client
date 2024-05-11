import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";



const PrivateRoute = ({ children }) => {
    const { user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="w-[100vw] h-[80vh] flex justify-center items-center">
            <progress className="progress w-56 flex"></progress>
        </div>
    }
    if (!user) {
        return <Navigate to={'/login'} state={location?.pathname || '/'} />
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;
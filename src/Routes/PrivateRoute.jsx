import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PropTypes } from 'prop-types';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>;
    }

    if(user){
        return children;
    }

    return (
        <Navigate to='/login' state={location?.pathname}></Navigate>
    );
};

PrivateRoute.propTypes = {
    children : PropTypes.node.isRequired,
}

export default PrivateRoute;
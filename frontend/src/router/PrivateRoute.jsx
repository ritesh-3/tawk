import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    // const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const { loading, isAuthenticated } = { loading: false, isAuthenticated: false };
    return (
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to="/login" /> : children
            )}
        </>
    );
}

export default PrivateRoute

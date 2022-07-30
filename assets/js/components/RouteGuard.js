import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {hasJWT} from "../helpers/jwtToken";

const RouteGuard = () => {
    if (!hasJWT()) {
        return <Navigate to="/login"/>;
    }

    return <Outlet/>;
};

export default RouteGuard;

import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {hasJWT} from "../helpers/jwtToken";

const RouteGuard = () => {
    console.log('Route guard');

    if (!hasJWT()) {
        return <Navigate to="/login"/>;
    }

    return <Outlet/>;
};

export default RouteGuard;

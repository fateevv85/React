import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import RouteGuard from "./components/RouteGuard";

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

// todo сделать protected routes
function Routing() {
    return (
        <BrowserRouter>
            <Routes element={<RouteGuard/>}>
                <Route>
                    <Route
                        exact
                        path="/home"
                        component={<Home/>}
                    />
                </Route>
                <Route
                    path="/login"
                    element={<Login/>}
                />
                <Route
                    path="/register"
                    element={<Register/>}
                />
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing

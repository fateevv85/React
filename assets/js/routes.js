import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import RouteGuard from "./components/RouteGuard";

import Home from "./pages/Home"
import LoginPage from "./pages/Login"

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
                    element={<LoginPage/>}
                />
                <Route
                    path="/register"
                    element={<LoginPage/>}
                />
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing

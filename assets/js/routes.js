import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import RouteGuard from "./components/RouteGuard";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RepLogApp from "./RepLog/RepLogApp";

// todo сделать protected routes
function Routing() {
    return (
        <BrowserRouter>
            <Routes element={<RouteGuard/>}>
                <Route
                    path="/home"
                    element={<Home/>}/>
                <Route
                    path="/replogs"
                    element={<RepLogApp withHeart={true}/>}/>
                />
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

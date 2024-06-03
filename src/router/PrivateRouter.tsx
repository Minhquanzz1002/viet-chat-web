import React from "react";
import Cookies from "js-cookie";
import {Navigate} from "react-router-dom";

interface PrivateRouterProps {
    children: React.ReactNode;
}

const PrivateRouter = ({children}: PrivateRouterProps) => {
    const token = Cookies.get('token');
    return token ? children : <Navigate to="/auth/login"/>
}

export default PrivateRouter;

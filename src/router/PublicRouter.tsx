import Cookies from "js-cookie";
import {Navigate} from "react-router-dom";
import React from "react";

interface PublicRouterProps {
    children: React.ReactNode;
}

const PublicRouter = ({children}: PublicRouterProps) => {
    const token = Cookies.get("token");
    return token ? <Navigate to="/"/> : children;
};

export default PublicRouter;
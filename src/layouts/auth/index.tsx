import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="h-screen bg-auth">
            <Outlet/>
        </div>
    );
};

export default AuthLayout;
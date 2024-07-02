import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "../layouts/auth";
import LoginPage from "../pages/Login";
import PublicRouter from "./PublicRouter.tsx";
import PrivateRouter from "./PrivateRouter.tsx";
import HomePage from "../pages/Home";

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<PrivateRouter><HomePage/></PrivateRouter>} index={true}/>
                <Route path="/auth" element={<PublicRouter><AuthLayout/></PublicRouter>}>
                    <Route path="login" element={<LoginPage/>}/>
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default Router;
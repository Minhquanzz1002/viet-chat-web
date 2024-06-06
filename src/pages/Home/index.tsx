import DefaultLayout from "../../layouts/default";
import {useAuth} from "../../hooks/useAuth.ts";
import Loader from "../Loader";

const HomePage = () => {
    const {isLoading} = useAuth();
    return (isLoading ? <Loader/> : <DefaultLayout/>)
};

export default HomePage;
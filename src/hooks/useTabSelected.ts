import {useContext} from "react";
import {AppContext} from "../context/AppContext.tsx";

const useTabSelected = () => {
    const {tabSelected, setTabSelected} = useContext(AppContext);
    return {tabSelected, setTabSelected};
};

export default useTabSelected;
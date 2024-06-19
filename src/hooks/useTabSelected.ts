import {useContext} from "react";
import {AppContext} from "../context/AppContext.tsx";

const useTabSelected = () => {
    const {tabSelected, setTabSelected, resetAllState} = useContext(AppContext);
    return {tabSelected, setTabSelected, resetAllState};
};

export default useTabSelected;
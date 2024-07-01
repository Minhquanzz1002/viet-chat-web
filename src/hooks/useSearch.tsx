import {useContext} from "react";
import {AppContext} from "../context/AppContext.tsx";

const useSearch = () => {
    const {isOpenSearchMenu, setIsOpenSearchMenu} = useContext(AppContext);
    return {isOpenSearchMenu, setIsOpenSearchMenu};
};

export default useSearch;
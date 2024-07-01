import {useContext} from "react";
import {WebsocketContext} from "../context/WebsocketContext.tsx";

export const useWebsocket = () => {
    return useContext(WebsocketContext);
}
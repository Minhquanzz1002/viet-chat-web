import Sidebar from "./sidebar";
import useTabSelected from "../../hooks/useTabSelected.ts";

const DefaultLayout = () => {
    const {tabSelected} = useTabSelected();

    return (
        <div className="h-screen flex flex-nowrap flex-row">
            <Sidebar/>
            {
                tabSelected.type === "CHAT" ? (tabSelected.id === null ? <div>khong co gi</div> : <div>chat</div>) : <div>contact</div>
            }
        </div>
    );
};

export default DefaultLayout;
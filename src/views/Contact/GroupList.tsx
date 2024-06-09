import {UserGroup} from "../../components/Icons";

const GroupList = () => {

    return (
        <div className="h-screen flex-1 flex flex-col">
            <div className="flex flex-row items-center gap-x-2 px-4 h-16 bg-white border-b">
                <UserGroup/>
                <h2 className="font-semibold">Danh sách nhóm</h2>
            </div>

        </div>
    );
};

export default GroupList;
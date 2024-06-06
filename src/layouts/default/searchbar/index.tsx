import {GroupPlus, UserPlus2} from "../../../components/Icons";

const Searchbar = () => {
    return (
        <div className="flex flex-row px-4 gap-2 items-center h-16 border-b">
            <div className="w-full">
                <input className="w-full bg-[#EAEDF0] rounded outline-blue-500 h-8"/>
            </div>
            <div className="h-8 aspect-square flex justify-center items-center hover:bg-[#DFE2E7] rounded cursor-pointer">
                <UserPlus2/>
            </div>
            <div className="h-8 aspect-square flex justify-center items-center hover:bg-[#DFE2E7] rounded cursor-pointer">
                <GroupPlus/>
            </div>

        </div>
    );
};

export default Searchbar;
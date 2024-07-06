import {GroupPlus, Search, UserPlus2} from "../../../components/Icons";
import React, {useState} from "react";
import useSearch from "../../../hooks/useSearch.ts";
import ModalAddFriend from "../../../components/Modals/ModalAddFriend.tsx";
import ModalCreateGroup from "../../../components/Modals/ModalCreateGroup.tsx";

const Searchbar = () => {
    const [isShowCreateGroupModal, setIsShowCreateGroupModal] = useState<boolean>(false);
    const [isShowAddFriendModal, setIsShowAddFriendModal] = useState<boolean>(false);
    const {setIsOpenSearchMenu, isOpenSearchMenu} = useSearch();

    return (
        <div className="flex flex-row px-4 gap-x-1 items-center h-16 w-full ">
            <div
                className={`flex-1 inline-flex items-center justify-center bg-[#EAEDF0] border border-transparent focus-within:border-blue-500 focus-within:bg-white rounded h-8 px-2 gap-x-2`}>
                <Search size={15} strokeWidth={1.5}/>
                <input className="bg-transparent outline-none h-8 text-sm w-full" placeholder="Tìm kiếm"
                       onFocus={() => setIsOpenSearchMenu(true)}/>
            </div>
            {
                isOpenSearchMenu ? (
                    <div className="w-[68px] hover:bg-[#DFE2E7] h-8 cursor-pointer px-2 py-1 rounded font-medium text-center" onClick={() => setIsOpenSearchMenu(false)}>
                        Đóng
                    </div>
                ) : (
                    <React.Fragment>
                        <div
                            onClick={() => setIsShowAddFriendModal(true)}
                            className="h-8 aspect-square flex justify-center items-center hover:bg-[#DFE2E7] rounded cursor-pointer" title="Thêm bạn">
                            <UserPlus2/>
                        </div>
                        <div
                            onClick={() => setIsShowCreateGroupModal(true)}
                            className="h-8 aspect-square flex justify-center items-center hover:bg-[#DFE2E7] rounded cursor-pointer" title="Tạo nhóm chat" >
                            <GroupPlus/>
                        </div>
                    </React.Fragment>
                )
            }
            {
                isShowCreateGroupModal && (<ModalCreateGroup onClose={() => setIsShowCreateGroupModal(false)}/>)
            }
            {
                isShowAddFriendModal && (<ModalAddFriend onClose={() => setIsShowAddFriendModal(false)}/>)
            }
        </div>
    );
};

export default Searchbar;
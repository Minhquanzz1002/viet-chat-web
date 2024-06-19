import {useState} from 'react';
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {AddressCard, Ban, ChevronLeft, PencilLine, Trash, UserGroup} from "../Icons";
import {Friend} from "../../models/profile.ts";
import EditDisplayNameModal from "./EditDisplayNameModal.tsx";
import useTabSelected from "../../hooks/useTabSelected.ts";

interface ProfileModalProps {
    onClose: () => void;
    friend: Friend;
}

const ProfileFriendModal = ({onClose, friend}: ProfileModalProps) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const {setTabSelected} = useTabSelected();

    const onChangeTab = (tab: number) => {
        setActiveTab(tab);
    }

    const onBackTab = () => {
        setActiveTab(activeTab - 1);
    }

    const formatBirthday = (dateStr: string): string => {
        const birthday = new Date(dateStr);
        const day = birthday.getDate();
        const month = birthday.getMonth() + 1;
        const year = birthday.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    }

    const onClickOpenChatRoom = () => {
        onClose();
        setTabSelected(prevState => ({
            contact: {
                ...prevState.contact,
                isSelected: false,
            },
            chat: {
                tabId: friend.chatId,
                isSelected: true,
            }
        }));
    }

    return (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-30">
            <div
                className="relative z-0 h-fit rounded mx-auto bg-white lg:max-w-[400px] w-full max-w-screen-lg">
                <div className="flex justify-between items-center px-4 border-b py-3">
                    {
                        activeTab === 0 ? (
                            <div>
                                <span className="font-medium mt-2 ">Thông tin tài khoản</span>
                            </div>
                        ) : (activeTab === 1 ? (
                            (
                                <div className="flex items-center gap-2">
                                    <button type="button"
                                            className="rounded-full hover:bg-gray-300 flex justify-center items-center w-7 h-7"
                                            onClick={() => setActiveTab(0)}><ChevronLeft stroke="#000000" size={25}
                                                                                         strokeWidth={2}/></button>
                                    <span className="font-medium">Đặt tên gợi nhớ</span>
                                </div>
                            )
                        ) : (
                            (
                                <div className="flex items-center gap-2">
                                    <button type="button"
                                            className="rounded-full hover:bg-gray-300 flex justify-center items-center w-7 h-7"
                                            onClick={() => setActiveTab(activeTab - 1)}><ChevronLeft stroke="#000000"
                                                                                                     size={25}
                                                                                                     strokeWidth={2}/>
                                    </button>
                                    <span className="font-medium">Cập nhật ảnh đại diện</span>
                                </div>
                            )
                        ))
                    }
                    <button className="text-right text-3xl"
                            onClick={() => onClose()}>&times;</button>
                </div>

                <div className="relative w-full h-fit">
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={activeTab}
                            classNames="fade"
                            timeout={300}
                        >
                            <div>
                                {activeTab === 0 && (
                                    <div className="w-full max-h-[60%] overflow-auto">
                                        {/* Start: Cover image */}
                                        <div>
                                            <div className="relative z-0 h-35 md:h-65">
                                                <img
                                                    src={"https://images.unsplash.com/photo-1549813069-f95e44d7f498?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZWJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D"}
                                                    alt="profile cover"
                                                    className="h-40 w-full object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                        {/* End: Cover image */}

                                        {/* Start: Avatar */}
                                        <div className="flex gap-10 items-stretch">
                                            <div
                                                className="relative z-20 ml-4 -mt-6 h-24 max-w-20 rounded-full">
                                                <div className="relative drop-shadow-2 flex justify-center">
                                                    <img
                                                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpPn3HE6cHkT34tqWkpDDr0IclFlNh9MLzgQ&s"}
                                                        className="w-full aspect-square ring-1 ring-white object-cover object-center rounded-full"
                                                        alt="profile"
                                                    />
                                                </div>
                                            </div>
                                            <div className="my-5 flex gap-3 h-fit items-center">
                                                <span
                                                    className="font-semibold text-lg">{friend.profile?.firstName + " " + friend.profile?.lastName}</span>
                                                <button className="rounded-full hover:bg-gray-300 p-1"
                                                        onClick={() => setActiveTab(1)}><PencilLine size={18}/></button>
                                            </div>
                                        </div>

                                        <div className="px-4 mb-3">
                                            <button type="button"
                                                    className="w-full text-blue-600 bg-blue-100 hover:bg-blue-200 rounded py-1 font-semibold flex flex-row justify-center items-center"
                                                    onClick={onClickOpenChatRoom}>Nhắn tin
                                            </button>
                                        </div>

                                        {/* End: Avatar */}

                                        <div className="p-1 bg-gray-200 mb-5"></div>

                                        <div className="px-4">
                                            <div className="font-semibold">Thông tin cá nhân</div>
                                            <div className="text-sm my-3">
                                                <span className="w-2/6 inline-block opacity-80">Giới tính</span>
                                                <span>{friend.profile?.gender ? 'Nam' : 'Nữ'}</span>
                                            </div>
                                            <div className="text-sm my-3">
                                                <span className="w-2/6 inline-block opacity-80">Ngày sinh</span>
                                                <span>{friend.profile?.birthday && formatBirthday(friend.profile.birthday)}</span>
                                            </div>
                                            <div className="text-sm my-3">
                                                <span className="w-2/6 inline-block opacity-80">Điện thoại</span>
                                                <span>+84 354 927 402</span>
                                            </div>
                                        </div>

                                        <div className="p-1 bg-gray-200"></div>

                                        <div className="py-3">
                                            <div
                                                className="w-full cursor-pointer hover:bg-gray-200 py-3 px-4 text-sm flex flex-row justify-start items-center gap-x-2">
                                                <UserGroup strokeWidth={1} height={20} weight={20}
                                                           className="text-gray-500"/>Nhóm chung
                                            </div>
                                            <div
                                                className="w-full cursor-pointer hover:bg-gray-200 py-3 px-4 text-sm flex flex-row justify-start items-center gap-x-2">
                                                <AddressCard/>
                                                Chia sẻ danh thiếp
                                            </div>
                                            <div
                                                className="w-full cursor-pointer hover:bg-gray-200 py-3 px-4 text-sm flex flex-row justify-start items-center gap-x-2">
                                                <Ban/>Chặn tin nhắn và cuộc gọi
                                            </div>
                                            <div
                                                className="w-full cursor-pointer hover:bg-gray-200 py-3 px-4 text-sm flex flex-row justify-start items-center gap-x-2">
                                                <Trash/>Xóa khỏi danh sách bạn bè
                                            </div>

                                        </div>
                                    </div>
                                )}
                                {activeTab === 1 && (
                                    <EditDisplayNameModal onChangeTab={onChangeTab} onCloseModal={onClose} friend={friend}/>
                                )}
                                {activeTab === 2 && (
                                    <div></div>
                                )}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </div>

            </div>
        </div>
    );
};

export default ProfileFriendModal;
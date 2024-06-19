import {useEffect, useState} from 'react';
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {Camera, ChevronLeft, PencilLine} from "../Icons";
import {useAuth} from "../../hooks/useAuth.ts";
import EditProfileModal from "./EditProfileModal.tsx";
import ChangeAvatarModal from "./ChangeAvatarModal.tsx";
import PreviewChangeAvatarModal from "./PreviewChangeAvatarModal.tsx";

interface ProfileModalProps {
    onClose: () => void;
}

const ProfileModal = ({onClose}: ProfileModalProps) => {
    const {profile} = useAuth();
    const [activeTab, setActiveTab] = useState<number>(0);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const onChangeTab = (tab: number) => {
        setActiveTab(tab);
    }

    const onBackTab = () => {
        setActiveTab(activeTab - 1);
    }

    const onChangeImage = (image: string) => {
        setImageSrc(image)
    }

    const formatBirthday = (dateStr: string): string => {
        const birthday = new Date(dateStr);
        const day = birthday.getDate();
        const month = birthday.getMonth() + 1;
        const year = birthday.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    }

    useEffect(() => {
        if (imageSrc) {
            onChangeTab(2);
        }
    }, [imageSrc]);

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
                        ) : (activeTab === 3 ? (
                            (
                                <div className="flex items-center gap-2">
                                    <button type="button"
                                            className="rounded-full hover:bg-gray-300 flex justify-center items-center w-7 h-7"
                                            onClick={() => setActiveTab(0)}><ChevronLeft stroke="#000000" size={25}
                                                                                         strokeWidth={2}/></button>
                                    <span className="font-medium">Cập nhật thông tin cá nhân</span>
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
                                    <div className="w-full">
                                        {/* Start: Cover image */}
                                        <div>
                                            <div className="relative z-0 h-35 md:h-65">
                                                <img
                                                    src={"https://images.unsplash.com/photo-1549813069-f95e44d7f498?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZWJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D"}
                                                    alt="profile cover"
                                                    className="h-40 w-full object-cover object-center"
                                                />
                                                <div
                                                    className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
                                                    <label
                                                        htmlFor="cover"
                                                        className="flex cursor-pointer items-center justify-center gap-2 rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-opacity-80"
                                                    >
                                                        <input
                                                            type="file"
                                                            name="cover"
                                                            id="cover"
                                                            className="sr-only"
                                                        />
                                                        <span><Camera/></span>
                                                        <span>Cập nhật</span>
                                                    </label>
                                                </div>
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
                                                    <div
                                                        className="absolute bg-[#DFE2E7] bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-opacity-90"
                                                        onClick={() => setActiveTab(1)}
                                                    >
                                                        <Camera stroke="#000000"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-5 flex gap-3 h-fit items-center">
                                                <span
                                                    className="font-semibold text-lg">{profile?.firstName + " " + profile?.lastName}</span>
                                                <button className="rounded-full hover:bg-gray-300 p-1"
                                                        onClick={() => setActiveTab(3)}><PencilLine size={18}/></button>
                                            </div>
                                        </div>
                                        {/* End: Avatar */}

                                        <div className="p-1 bg-gray-200 mb-5"></div>

                                        <div className="px-4">
                                            <div className="font-semibold">Thông tin cá nhân</div>
                                            <div className="text-sm my-3">
                                                <span className="w-2/6 inline-block opacity-80">Giới tính</span>
                                                <span>{profile?.gender ? 'Nam' : 'Nữ'}</span>
                                            </div>
                                            <div className="text-sm my-3">
                                                <span className="w-2/6 inline-block opacity-80">Ngày sinh</span>
                                                <span>{profile?.birthday && formatBirthday(profile.birthday)}</span>
                                            </div>
                                            <div className="text-sm my-3">
                                                <span className="w-2/6 inline-block opacity-80">Điện thoại</span>
                                                <span>+84 354 927 402</span>
                                            </div>
                                            <div className="text-xs opacity-80">Chỉ bạn bè có lưu số của bạn trong danh
                                                bạ máy xem được số này
                                            </div>
                                            <div className="border my-3"></div>
                                            <div className="mb-3">
                                                <button type="button"
                                                        className="w-full hover:bg-gray-200 rounded py-1 font-semibold flex flex-row justify-center items-center"
                                                        onClick={() => setActiveTab(3)}><PencilLine/>Cập nhật
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 3 && (
                                    <EditProfileModal onChangeTab={onChangeTab} onCloseModal={onClose}/>
                                )}

                                {activeTab === 1 && (
                                    <ChangeAvatarModal onChangeImage={onChangeImage}/>
                                )}
                                {activeTab === 2 && (
                                    <PreviewChangeAvatarModal onBackTab={onBackTab} image={imageSrc !== null ? imageSrc : ""}/>
                                )}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </div>

            </div>
        </div>
    );
};

export default ProfileModal;
import {Circle, CircleDot} from "../Icons";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {useMutation} from "@tanstack/react-query";
import {UserInfoDTO} from "../../models/profile.ts";
import userApi from "../../api/userApi.ts";
import {UserProfile} from "../../models";

interface EditProfileModalProps {
    onChangeTab: (tab: number) => void;
    onCloseModal: () => void;
}

interface EditProfile {
    name: string;
    gender: boolean;
    birthday?: Date;
}

const EditProfileModal = ({onChangeTab, onCloseModal}: EditProfileModalProps) => {
    const {profile, setProfile, token} = useAuth();
    const [newProfile, setNewProfile] = useState<EditProfile>({
        name: profile?.firstName + " " + profile?.lastName,
        gender: profile?.gender || true
    });
    const [nameError, setNameError] = useState<string>("");
    const [isModified, setIsModified] = useState<boolean>(false);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setNewProfile(prevState => ({...prevState, name: newName}));
        if (newName === "") {
            setNameError("Bạn chưa nhập tên");
        } else {
            setNameError("");
        }
    }

    const updateProfile = useMutation({
        mutationFn: (updatedProfile: UserInfoDTO) => userApi.updateProfile(token, updatedProfile),
        onSuccess: (userProfile: UserProfile) => {
            setProfile(userProfile);
        }
    });

    const onClickUpdateProfile = () => {
        if (isModified) {
            const nameParts = newProfile.name.trim().split(" ");
            const updatedProfile : UserInfoDTO = {
                firstName: nameParts.slice(0, -1).join(" "),
                lastName: nameParts.slice(-1).join(" "),
                gender: newProfile.gender
            };
            updateProfile.mutate(updatedProfile);
            onCloseModal();
        }
    }

    useEffect(() => {
        const isProfileModified = () => {
            return (
                newProfile.name !== (profile?.firstName + " " + profile?.lastName) ||
                newProfile.gender !== profile?.gender
            );
        };

        setIsModified(isProfileModified());
    }, [newProfile, profile]);

    return (
        <div className="w-full px-4 py-3">
            <div className="min-h-80">
                <div>
                    <label htmlFor="editProfileName"
                           className="block mb-2 text-sm">Tên hiển thị</label>
                    <input type="text" id="editProfileName"
                           value={newProfile.name}
                           onChange={onChangeName}
                           className={`${nameError !== "" ? 'border-red-500 focus:border-red-500 focus:shadow-red-100' : 'focus:border-blue-500 focus:shadow-blue-100'} focus:shadow-lg border border-gray-300 text-sm rounded outline-none block w-full p-2`}
                           placeholder="Nhập tên hiển thị"/>
                    {
                        nameError !== "" && <p className="mt-2 text-sm text-red-600 font-light">Bạn chưa nhập tên</p>
                    }
                </div>

                <div className="font-semibold my-5">Thông tin cá nhân</div>
                <div className="flex gap-x-10">
                    <div className="flex items-center gap-x-3 cursor-pointer group" onClick={() => setNewProfile(prevState => ({...prevState, gender: true}))}>
                        {
                            newProfile.gender ? <CircleDot className="text-blue-500"/> :
                                <Circle className="text-gray-500 group-hover:text-blue-600"/>
                        }
                        <div>Nam</div>
                    </div>
                    <div className="flex items-center gap-x-3 group cursor-pointer" onClick={() => setNewProfile(prevState => ({...prevState, gender: false}))}>
                        {
                            newProfile.gender ? <Circle className="text-gray-500 group-hover:text-blue-600"/> :
                                <CircleDot className="text-blue-500"/>
                        }
                        <div className="double-click-prevent">Nữ</div>
                    </div>
                </div>
            </div>

            {/* Start: Footer modal */}
            <div className="flex flex-row justify-end gap-3">
                <button type="button"
                        className="hover:bg-gray-200 rounded font-semibold bg-[#DFE2E7] py-2 px-4"
                        onClick={() => onChangeTab(0)}>Hủy
                </button>
                <button type="button"
                        className="hover:opacity-90 rounded font-semibold bg-blue-600 py-2 px-4 text-white disabled:opacity-80"
                        disabled={!isModified || updateProfile.isPending}
                        onClick={onClickUpdateProfile}>{updateProfile.isPending ? 'Đang xử lý...' : 'Cập nhật'}
                </button>
            </div>
            {/* End: Footer modal */}
        </div>
    );
};

export default EditProfileModal;
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {useMutation} from "@tanstack/react-query";
import {Friend, UserInfoDTO} from "../../models/profile.ts";
import userApi from "../../api/userApi.ts";
import {Avatar} from "../Avatar";

interface EditProfileModalProps {
    onChangeTab: (tab?: number) => void;
    onCloseModal: () => void;
    friend: Friend;
}

const EditDisplayNameModal = ({onChangeTab, onCloseModal, friend}: EditProfileModalProps) => {
    const {token} = useAuth();
    const [displayName, setDisplayName] = useState<string>(friend.displayName);
    const [nameError, setNameError] = useState<string>("");
    const [isModified, setIsModified] = useState<boolean>(false);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setDisplayName(newName);
        if (newName === "") {
            setNameError("Bạn chưa nhập tên");
        } else {
            setNameError("");
        }
    }

    const updateDisplayName = useMutation({
        mutationFn: (updatedProfile: UserInfoDTO) => userApi.updateDisplayName(token, updatedProfile),
        onSuccess: () => {
            console.log("ok")
        }
    });

    const onClickUpdateDisplayName = () => {
        if (isModified) {
            onCloseModal();
        }
    }

    useEffect(() => {
        const isProfileModified = () => {
            return (
                displayName !== friend.displayName
            );
        };

        setIsModified(isProfileModified());
    }, [displayName, friend]);

    return (
        <div className="w-full py-3">
            <div className="px-4">
                <div className="inline-flex justify-center w-full py-3">
                    <Avatar src={friend.profile.thumbnailAvatar} name={friend.displayName} size="extra-large"/>
                </div>
                <div className="text-sm text-center pb-2">
                    Hãy đặt cho <span className="font-medium">{friend.displayName}</span> một cái tên dễ nhớ
                </div>
                <div className="text-sm text-center pb-2">
                    Lưu ý: Tên gợi nhớ chỉ hiển thị riêng với bạn
                </div>
                <div>
                    <input type="text" id="editProfileName"
                           value={displayName}
                           onChange={onChangeName}
                           className={`${nameError !== "" ? 'border-red-500 focus:border-red-500 focus:shadow-red-100' : 'focus:border-blue-500'} focus:shadow-lg border border-gray-300 text-sm rounded outline-none block w-full p-2`}
                           placeholder={friend.displayName}/>
                    {
                        nameError !== "" && <p className="mt-2 text-sm text-red-600 font-light">Bạn chưa nhập tên</p>
                    }
                </div>
            </div>

            <div className="my-3 h-[1px] bg-gray-300"></div>

            {/* Start: Footer modal */}
            <div className="flex flex-row justify-end gap-3 px-4">
                <button type="button"
                        className="hover:bg-gray-200 rounded font-semibold bg-[#DFE2E7] py-2 px-4"
                        onClick={() => onChangeTab(0)}>Hủy
                </button>
                <button type="button"
                        className="hover:opacity-90 rounded font-semibold bg-blue-600 py-2 px-4 text-white disabled:opacity-80"
                        disabled={!isModified || updateDisplayName.isPending}
                        onClick={onClickUpdateDisplayName}>{updateDisplayName.isPending ? 'Đang xử lý...' : 'Xác nhận'}
                </button>
            </div>
            {/* End: Footer modal */}
        </div>
    );
};

export default EditDisplayNameModal;
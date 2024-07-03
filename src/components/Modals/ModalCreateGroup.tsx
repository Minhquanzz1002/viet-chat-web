import Modal from "./Modal.tsx";
import Button from "../Buttons/Button.tsx";
import {Camera, Circle, CircleCheck, Search, X} from "../Icons";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {Friend, OtherUserInfoDTO, Profile} from "../../models/profile.ts";
import {Avatar} from "../Avatar";
import {useMutation} from "@tanstack/react-query";
import userApi from "../../api/userApi.ts";
import {GroupDTO, GroupRequestCreateDTO} from "../../models/group.ts";
import groupApi from "../../api/groupApi.ts";
import {ErrorResponse} from "../../models";
import {Toast} from "../Toast";

type ModalCreateGroupProps = {
    onClose: () => void;
}

const avatars: string[] = [
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/1_family.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/2_family.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/3_family.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/4_work.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/5_work.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/6_work.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/7_friends.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/8_friends.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/9_friends.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/10_school.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/11_school.jpg",
    "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/avt_group/12_school.jpg",
]
const ModalCreateGroup = ({onClose}: ModalCreateGroupProps) => {
    const {friendsByLetter, token, queryClient} = useAuth();
    const [isShowModalChooseAvatar, setIsShowModalChooseAvatar] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [members, setMembers] = useState<Profile[]>([]);
    const [isBtnCreateDisabled, setIsBtnCreateDisabled] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchError, setSearchError] = useState<boolean>(false);
    const [searchSuccess, setSearchSuccess] = useState<OtherUserInfoDTO>();
    const [toastMsg, setToastMsg] = useState<string>("");

    const searchMutation = useMutation({
        mutationFn: ({token, phone}: { token: string, phone: string }) => userApi.getUserInfoByPhone(token, phone),
        onSuccess: (response: OtherUserInfoDTO) => {
            setSearchSuccess(response);
            setSearchError(false);
        },
        onError: (error: ErrorResponse) => {
            setSearchSuccess(undefined);
            setSearchError(true);
            setToastMsg(error.detail);
        }
    });

    const createGroupMutation = useMutation({
        mutationFn: ({token, data}: {
            token: string,
            data: GroupRequestCreateDTO
        }) => groupApi.createGroup(token, data),
        onSuccess: (response: GroupDTO) => {
            console.log(response);
            queryClient.invalidateQueries({queryKey: ['chatRooms']});
            onClose();
        },
        onError: (error: ErrorResponse) => {
            console.log(error);
        }
    });

    const onClickCreateGroup = () => {
        if (token !== "") {
            const memberIds: string[] = members.map(member => member.id);
            const data: GroupRequestCreateDTO = {
                name: name,
                thumbnailAvatar: avatar,
                members: memberIds
            }
            createGroupMutation.mutate({token: token, data: data});
        }
    }

    const onClickAddSearchResultToGroupMember = () => {
        if (members.length === 20) {
            setToastMsg("Tối đa 20 thành viên");
            return;
        }
        if (searchSuccess) {
            const isMemberExists = members.some(m => m.id === searchSuccess.id);
            if (isMemberExists) {
                setSearchSuccess(undefined);
                setSearchValue("")
                return;
            }
            const searchProfile: Profile = {
                id: searchSuccess.id,
                lastName: searchSuccess.lastName,
                firstName: searchSuccess.firstName,
                createdAt: searchSuccess.createdAt,
                bio: searchSuccess.bio,
                thumbnailAvatar: searchSuccess.thumbnailAvatar,
                coverImage: searchSuccess.coverImage,
                gender: searchSuccess.gender,
                birthday: searchSuccess.birthday,
                updatedAt: searchSuccess.updatedAt,
            };
            setMembers(prevState => {
                if (isMemberExists) {
                    return prevState.filter(m => m.id !== searchSuccess.id);
                } else {
                    return [...prevState, searchProfile];
                }
            });
            setSearchSuccess(undefined);
            setSearchValue("")
        }

    }

    const searchProfile = () => {
        if (!searchValue || !/^0(?:3[2-9]|8[12345689]|7[06789]|5[2689]|9[2367890])\d{7}$/.test(searchValue)) {
            setSearchError(true);
            setSearchSuccess(undefined);
            return;
        }
        if (token !== "") {
            searchMutation.mutate({token: token, phone: searchValue});
        }
    }

    const onKeyDownSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchProfile();
        }
    }

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue === '' || /^\d+$/.test(newValue)) {
            if (newValue === '') {
                setSearchError(false);
                setSearchSuccess(undefined);
            }
            setSearchValue(newValue);
        }
    }

    const onClickClearSearchInput = () => {
        setSearchValue("");
        setSearchSuccess(undefined);
        setSearchError(false);
    }

    const onClickRemoveMember = (index: number) => {
        setMembers(prevState => {
            const newMembers = [...prevState];
            newMembers.splice(index, 1);
            return newMembers;
        })
    }
    const onClickAddMember = (member: Profile) => {
        if (members.length === 20) {
            setToastMsg("Tối đa 20 thành viên");
            return;
        }
        setMembers(prevState => {
            const isMemberExists = prevState.some(m => m.id === member.id);
            if (isMemberExists) {
                return prevState.filter(m => m.id !== member.id);
            } else {
                return [...prevState, member];
            }
        });
    }

    const onClickChooseAvatar = (avt: string) => {
        setAvatar(avt);
        setIsShowModalChooseAvatar(false);
    }

    useEffect(() => {
        if (members.length >= 3 && name !== "" && avatar !== "") {
            setIsBtnCreateDisabled(false);
        } else {
            setIsBtnCreateDisabled(true);
        }
    }, [name, members, avatar]);

    useEffect(() => {
        if (toastMsg !== "") {
            const timer = setTimeout(() => {
                setToastMsg("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [toastMsg]);

    return (
        <React.Fragment>
            {
                toastMsg && <Toast>{toastMsg}</Toast>
            }
            {
                isShowModalChooseAvatar && (
                    <div
                        className={`contain-layout fixed flex flex-col items-stretch inset-0 overflow-hidden bg-[rgba(0,0,0,0.5)] h-full w-full z-20 animate-fade-in`}>
                        <div
                            className="flex justify-center items-center flex-row flex-nowrap grow shrink overflow-hidden basis-0">
                            <div
                                className={`relative w-[400px] max-h-[calc(100%_-200px)] h-[calc(100%_-_20px)] self-center bg-white flex flex-col overflow-hidden rounded animate-zoom-in`}>
                                <div className="inline-flex items-center px-2 h-12 min-h-12 relative border-b">
                                    <div className="flex-1 font-medium" title="Cập nhật ảnh đại diện">
                                        Cập nhật ảnh đại diện
                                    </div>
                                    <button type="button" className="text-right text-3xl"
                                            onClick={() => setIsShowModalChooseAvatar(false)}>&times;</button>
                                </div>
                                <div className="flex-1 overflow-hidden relative flex flex-col p-4">
                                    <div></div>
                                    <div className="font-medium my-3">Bộ sưu tập</div>
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute inset-0 overflow-y-auto scrollbar-thin">
                                            <div className="grid grid-cols-4 gap-7">
                                                {
                                                    avatars.map((avt: string, index: number) => (
                                                        <div
                                                            key={"avt-example-" + index}
                                                            className="overflow-hidden aspect-square cursor-pointer relative hover:bg-red-300 rounded-full"
                                                            onClick={() => onClickChooseAvatar(avt)}>
                                                            <div
                                                                className="absolute inset-0 rounded-full hover:bg-black opacity-25 z-30 pointer-events-auto"></div>
                                                            <img src={avt} alt="Avatar"
                                                                 className="rounded-full border border-[#b6bec9]"/>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <Modal width={520} onClose={onClose}>
                <Modal.Header title="Tạo nhóm" onClose={onClose}/>
                <Modal.Body>
                    <div className="flex flex-col h-full">
                        <div className="h-20 flex-none p-4 inline-flex items-center gap-x-3">
                            {
                                avatar === "" ? (
                                    <div
                                        className="w-12 h-12 rounded-full border border-[#7589A3] overflow-hidden inline-flex items-center justify-center cursor-pointer"
                                        onClick={() => setIsShowModalChooseAvatar(true)}>
                                        <Camera stroke="#7589A3" size={25}/>
                                    </div>
                                ) : (
                                    <div
                                        className="w-12 h-12 rounded-full border overflow-hidden inline-flex items-center justify-center cursor-pointer"
                                        onClick={() => setIsShowModalChooseAvatar(true)}>
                                        <img src={avatar} alt="Avatar"
                                             className="rounded-full border border-[#b6bec9]"/>
                                    </div>
                                )
                            }
                            <div className="flex-1">
                                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={66}
                                       className="w-full outline-none text-sm py-2.5 focus:border-blue-500 border-b"
                                       type="text" placeholder="Nhập tên nhóm..."/>
                            </div>
                        </div>
                        <div className="mx-4 h-14 relative">
                            <div
                                className={`absolute inset-x-0 bg-white z-30 rounded-xl ${(searchSuccess || searchError) && 'drop-shadow-2xl border'}`}>
                                <div
                                    className={`inline-flex items-center justify-center w-full ${(searchSuccess || searchError) ? 'border-b' : 'border focus-within:border-blue-500 rounded-full'} gap-x-2 px-2 py-1 h-10 relative`}>
                                    <Search strokeWidth={1.5} className="text-gray-500"/>
                                    <input value={searchValue} onChange={onChangeSearchInput}
                                           className="flex-1 outline-none text-sm" type="text"
                                           onKeyDown={onKeyDownSearchInput} placeholder="Nhập số điện thoại"/>
                                    {
                                        searchValue.length > 0 && (
                                            <button className="bg-gray-600 rounded-full hover:bg-blue-600"
                                                    onClick={onClickClearSearchInput}>
                                                <X className="text-white" size={15}/>
                                            </button>
                                        )
                                    }
                                </div>
                                {
                                    searchSuccess && (
                                        <div
                                            className="h-13 my-1 hover:bg-gray-200 inline-flex justify-start items-center px-5 w-full gap-x-3 cursor-pointer"
                                            onClick={onClickAddSearchResultToGroupMember}>
                                            {
                                                members.some(m => m.id === searchSuccess.id) ? (
                                                    <CircleCheck size={17}/>
                                                ) : (
                                                    <Circle className="text-gray-500" size={17}/>
                                                )
                                            }
                                            <Avatar
                                                size="small"
                                                src={searchSuccess.thumbnailAvatar}
                                                name={searchSuccess?.displayName ? searchSuccess.displayName : searchSuccess.firstName}/>
                                            <div className="flex flex-col">
                                                <div
                                                    className="text-sm">{searchSuccess?.displayName ? searchSuccess.displayName : searchSuccess.firstName + " " + searchSuccess.lastName}</div>
                                                <div className="text-xs text-gray-500">{searchSuccess.phone}</div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    searchError && (
                                        <div className="text-xs py-2 text-gray-500 text-center">
                                            Không khả dụng
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex-1 px-4">
                            <div className="inline-flex border-t h-full w-full">
                                <div className="flex-1 relative">
                                    <div className="absolute inset-0 overflow-y-auto scrollbar-thin">
                                        {
                                            Object.entries(friendsByLetter).map(([letter, friendsArray]) => (
                                                <div key={letter}>
                                                    <div className="px-4 my-2 font-semibold">{letter}</div>
                                                    {
                                                        friendsArray.map((friend: Friend, index: number) => (
                                                            <div key={"fr-" + index}
                                                                 className="h-13 hover:bg-gray-200 inline-flex justify-start items-center gap-x-2 w-full px-3"
                                                                 onClick={() => onClickAddMember(friend.profile)}>
                                                                {
                                                                    members.some(m => m.id === friend.profile.id) ? (
                                                                        <CircleCheck size={17}/>
                                                                    ) : (
                                                                        <Circle className="text-gray-500" size={17}/>
                                                                    )
                                                                }
                                                                <Avatar src={friend.profile.thumbnailAvatar}
                                                                        name={friend.displayName} size="small"/>
                                                                <div>{friend.displayName}</div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {
                                    members.length > 0 && (
                                        <div className="relative basis-2/5 flex flex-col rounded border my-3 ml-2">
                                            <div className="text-sm font-medium px-3 my-3">Đã chọn <span
                                                className="bg-blue-50 rounded px-2 text-xs text-blue-600">{members.length}/20</span>
                                            </div>
                                            <div className="relative flex-1">
                                                <div
                                                    className="absolute inset-0 overflow-y-auto scrollbar-thin w-full px-2">
                                                    <div className="flex flex-col gap-y-2">
                                                        {
                                                            members.map((member: Profile, index: number) => (
                                                                <div key={"member-choose-" + member.id}
                                                                     className="inline-flex items-center justify-between gap-x-1.5 bg-blue-100 rounded-full w-full px-2 py-1"
                                                                >
                                                                    <Avatar src={member.thumbnailAvatar}
                                                                            name={member.firstName} size="very-small"/>
                                                                    <div
                                                                        className="text-xs line-clamp-1 flex-1 text-start">{member.firstName + " " + member.lastName}</div>
                                                                    <button className="rounded-full bg-blue-600 "
                                                                            onClick={() => onClickRemoveMember(index)}>
                                                                        <X size={16} className="text-white"/>
                                                                    </button>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="gray" onClick={onClose}>Hủy</Button>
                    <Button variant="primary" disabled={isBtnCreateDisabled || createGroupMutation.isPending}
                            onClick={onClickCreateGroup}>{createGroupMutation.isPending ? 'Đang tạo...' : 'Tạo group'}</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default ModalCreateGroup;
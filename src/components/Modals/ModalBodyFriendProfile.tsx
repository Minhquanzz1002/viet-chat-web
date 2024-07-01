import {AddressCard, Ban, PencilLine, Trash, UserGroup} from "../Icons";
import {Friend, OtherUserInfoDTO} from "../../models/profile.ts";
import {formatBirthday} from "../../utils/dateUtils.ts";
import {formatPhone} from "../../utils/phoneUtils.ts";
import {useMutation} from "@tanstack/react-query";
import userApi from "../../api/userApi.ts";
import {ErrorResponse} from "../../models";
import {useAuth} from "../../hooks/useAuth.ts";
import React, {useEffect, useState} from "react";
import {ToastSuccess} from "../Toast";

interface ModalBodyFriendProfileProps {
    onClose: () => void;
    profile: OtherUserInfoDTO | null;
    updateProfile: (newProfile: OtherUserInfoDTO) => void;
}

const ModalBodyFriendProfile = ({profile, onClose, updateProfile}: ModalBodyFriendProfileProps) => {
    const {token, queryClient} = useAuth();
    const [toastMsg, setToastMsg] = useState<string>("");

    const addFriendMutation = useMutation({
        mutationFn: ({token, friendId}: { token: string, friendId: string }) => userApi.addFriend(token, friendId),
        onSuccess: (response: Friend) => {
            if (profile) {
                const newProfile = {...profile, status: response.status};
                updateProfile(newProfile);
                queryClient.invalidateQueries({queryKey: ['sends']});
            }
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const cancelFriendRequestMutation = useMutation({
        mutationFn: ({token, friendId}: {
            token: string,
            friendId: string
        }) => userApi.cancelFriendRequest(token, friendId),
        onSuccess: (response: Friend) => {
            if (profile) {
                const newProfile = {...profile, status: response.status};
                updateProfile(newProfile);
                queryClient.invalidateQueries({queryKey: ['sends']});
            }
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const acceptFriendRequestMutation = useMutation({
        mutationFn: ({token, friendId}: {
            token: string,
            friendId: string
        }) => userApi.acceptFriendRequest(token, friendId),
        onSuccess: (response: Friend) => {
            if (profile) {
                const newProfile = {...profile, status: response.status};
                updateProfile(newProfile);
                queryClient.invalidateQueries({queryKey: ['requests']});
                queryClient.invalidateQueries({queryKey: ['chatRooms']});
                queryClient.invalidateQueries({queryKey: ['friends']});
            }
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const deleteFriendMutation = useMutation({
        mutationFn: ({token, friendId}: { token: string, friendId: string }) => userApi.deleteFriend(token, friendId),
        onSuccess: (response: Friend) => {
            if (profile) {
                const newProfile = {...profile, status: response.status};
                updateProfile(newProfile);
                queryClient.invalidateQueries({queryKey: ['friends']});
            }
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const unblockFriendMutation = useMutation({
        mutationFn: ({token, friendId}: { token: string, friendId: string }) => userApi.unblockFriend(token, friendId),
        onSuccess: (response: Friend) => {
            if (profile) {
                const newProfile = {...profile, status: response.status};
                updateProfile(newProfile);
                setToastMsg("Bỏ chặn thành công")
            }
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const blockFriendMutation = useMutation({
        mutationFn: ({token, friendId}: { token: string, friendId: string }) => userApi.blockFriend(token, friendId),
        onSuccess: (response: Friend) => {
            if (profile) {
                const newProfile = {...profile, status: response.status};
                updateProfile(newProfile);
                setToastMsg("Bạn đã chặn tin nhắn và cuộc gọi từ người này")
            }
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const onClickFriendRequest = () => {
        onClose();
    }

    const onClickAddFriend = () => {
        if (token && profile?.id) {
            addFriendMutation.mutate({token: token, friendId: profile.id});
        }
    }

    const onClickDeleteFriend = () => {
        if (token && profile?.id) {
            deleteFriendMutation.mutate({token: token, friendId: profile.id});
        }
    }

    const onClickCancelFriendRequest = () => {
        if (token && profile?.id) {
            cancelFriendRequestMutation.mutate({token: token, friendId: profile.id});
        }
    }

    const onClickAcceptFriendRequest = () => {
        if (token && profile?.id) {
            acceptFriendRequestMutation.mutate({token: token, friendId: profile.id});
        }
    }

    const onClickUnblockFriend = () => {
        if (token && profile?.id) {
            unblockFriendMutation.mutate({token: token, friendId: profile.id});
        }
    }

    const onClickBlockFriend = () => {
        if (token && profile?.id) {
            blockFriendMutation.mutate({token: token, friendId: profile.id});
        }
    }

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
                toastMsg && <ToastSuccess>{toastMsg}</ToastSuccess>
            }
            <div className="absolute inset-0 overflow-auto scrollbar-thin">
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
                                                    className="font-semibold text-lg">{profile?.firstName + " " + profile?.lastName}</span>
                        <button className="rounded-full hover:bg-gray-300 p-1"><PencilLine size={18}/></button>
                    </div>
                </div>

                {
                    profile?.status === "PENDING" && (
                        <div className='border my-3 mx-4 px-2 py-3 rounded text-sm tracking-wide'>
                            Xin chào, mình là {profile?.firstName + " " + profile?.lastName}. Mình tìm thấy bạn bằng số điện
                            thoại. Kết bạn với mình nhé!
                        </div>
                    )
                }

                {
                    profile?.status === 'BLOCK' ? (
                        <div className="flex flex-col items-center px-4 mb-3 h-10">
                            <div className="text-sm text-gray-500">Bỏ chặn để gửi tin nhắn và cuộc gọi tới người này
                            </div>
                            <button type="button" disabled={unblockFriendMutation.isPending}
                                    className="text-sm text-blue-600 disabled:opacity-75"
                                    onClick={onClickUnblockFriend}>Bỏ chặn
                            </button>
                        </div>
                    ) : (
                        <div className="px-4 mb-3 inline-flex w-full gap-x-3 h-10 py-0.5">
                            {
                                (!profile?.status || profile.status === "STRANGER") && (
                                    <button type="button"
                                            onClick={onClickAddFriend}
                                            disabled={addFriendMutation.isPending}
                                            className="w-full disabled:opacity-75 bg-gray-100 hover:bg-gray-200 rounded py-1 font-semibold flex flex-row justify-center items-center"
                                    >{addFriendMutation.isPending ? 'Đang xử lý' : 'Kết bạn'}
                                    </button>
                                )
                            }
                            {
                                profile?.status === "FRIEND_REQUEST" && (
                                    <button type="button"
                                            onClick={onClickCancelFriendRequest}
                                            className="w-full bg-gray-100 hover:bg-gray-200 rounded py-1 font-semibold flex flex-row justify-center items-center"
                                    >{cancelFriendRequestMutation.isPending ? 'Đang xử lý...' : 'Thu hồi'}
                                    </button>
                                )
                            }
                            {
                                profile?.status === "PENDING" && (
                                    <button type="button"
                                            onClick={onClickAcceptFriendRequest}
                                            className="w-full bg-gray-100 hover:bg-gray-200 rounded py-1 font-semibold flex flex-row justify-center items-center"
                                    >{acceptFriendRequestMutation.isPending ? 'Đang xử lý...' : 'Đồng ý'}
                                    </button>
                                )
                            }
                            <button type="button"
                                    onClick={onClickFriendRequest}
                                    className="w-full text-blue-600 bg-blue-100 hover:bg-blue-200 rounded py-1 font-semibold flex flex-row justify-center items-center"
                            >Nhắn tin
                            </button>
                        </div>
                    )
                }

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
                        <span>{profile?.phone && formatPhone(profile.phone)}</span>
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
                    {
                        profile?.status === "BLOCK" ? (
                            <button
                                type="button"
                                onClick={onClickUnblockFriend}
                                className="w-full hover:bg-gray-200 py-3 px-4 text-sm flex flex-row justify-start items-center gap-x-2">
                                <Ban/>
                                {unblockFriendMutation.isPending ? 'Đang xử lý...' : 'Bỏ chặn'}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onClickBlockFriend}
                                className="w-full hover:bg-gray-200 py-3 px-4 text-sm flex flex-row justify-start items-center gap-x-2">
                                <Ban/>
                                {blockFriendMutation.isPending ? 'Đang xử lý...' : 'Chặn tin nhắn và cuộc gọi'}
                            </button>
                        )
                    }
                    {
                        profile?.status === "FRIEND" && (
                            <button
                                type="button"
                                onClick={onClickDeleteFriend}
                                className="w-full cursor-pointer hover:bg-gray-200 py-3 px-4 text-sm flex flex-row justify-start items-center gap-x-2 text-red-500">
                                <Trash strokeWidth={2} className="text-red-500"/>
                                {deleteFriendMutation.isPending ? 'Đang xử lý...' : 'Xóa khỏi danh sách bạn bè'}
                            </button>
                        )
                    }

                </div>
            </div>
        </React.Fragment>
    );
};

export default ModalBodyFriendProfile;
import React from "react";
import {GroupMemberDTO, GroupMemberRole} from "../../models/group.ts";
import {Avatar} from "../Avatar";
import Skeleton from "../Skeleton";
import {Friend, FriendStatus} from "../../models/profile.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {useMutation} from "@tanstack/react-query";
import userApi from "../../api/userApi.ts";
import {ErrorResponse} from "../../models";

type ModalBodyGroupMemberProps = {
    members: GroupMemberDTO[];
    groupId: string;
}
const ModalBodyGroupMember = ({members, groupId}: ModalBodyGroupMemberProps) => {
    const {profile, queryClient, token} = useAuth();

    const addFriendMutation = useMutation({
        mutationFn: ({token, friendId}: { token: string, friendId: string }) => userApi.addFriend(token, friendId),
        onSuccess: (response: Friend) => {
            queryClient.invalidateQueries({queryKey: ['groupMembers', groupId]});
            queryClient.invalidateQueries({queryKey: ['sends']});
            return response;
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const onClickAddFriend = (friendId: string) => {
        if (token) {
            addFriendMutation.mutate({token: token, friendId: friendId})
        }
    }

    return (
        <React.Fragment>
            <div className="h-full w-full flex flex-col">
                {
                    members.length > 0 ? (
                        <React.Fragment>
                            <div className="px-4 my-4 text-sm font-medium">Danh sách thành viên ({members.length})</div>
                            <div className="flex-1 relative overflow-hidden">
                                <div className="absolute inset-0 overflow-y-auto scrollbar-thin">
                                    {
                                        members.map((member) => (
                                            <div
                                                className="inline-flex items-center w-full h-16 hover:bg-gray-200 cursor-pointer px-4 gap-x-2"
                                                key={"group-member-" + member.profile.id}>
                                                <Avatar src={member.profile.thumbnailAvatar}
                                                        name={member?.displayName ? member.displayName : member.profile.firstName} size="small"/>
                                                <div
                                                    className="flex-1 flex flex-col items-start justify-center gap-y-1">
                                                    <div
                                                        className="text-sm font-medium line-clamp-1">{member.displayName ? member.displayName : member.profile.firstName + " " + member.profile.lastName}</div>
                                                    {
                                                        member.role === GroupMemberRole.GROUP_LEADER &&
                                                        <div className="text-xs">Nhóm trưởng</div>
                                                    }
                                                </div>

                                                {
                                                    member.profile.id !== profile?.id && (
                                                        (!member.status || member.status === FriendStatus.STRANGER) && (
                                                            <div className="flex flex-col justify-center">
                                                                <button type="button"
                                                                        onClick={() => onClickAddFriend(member.profile.id)}
                                                                        disabled={addFriendMutation.isPending}
                                                                        className="bg-blue-50 hover:bg-blue-100 disabled:opacity-75 font-medium text-blue-700 rounded px-3 py-1 tracking-wide">
                                                                    {addFriendMutation.isPending ? 'Đang xử lý...' : 'Kết bạn'}
                                                                </button>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Skeleton className="mx-4 my-4 !w-60"/>
                            <div className="flex-1 relative overflow-hidden">
                                <div className="absolute inset-0 overflow-y-auto scrollbar-thin">
                                    {
                                        Array.from({length: 4}).map((_, index: number) => (
                                            <div
                                                className="inline-flex items-center w-full h-16 px-4 gap-x-2"
                                                key={"group-member-ex" + index}>
                                                <div>
                                                    <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-full">

                                                    </div>
                                                </div>
                                                <div
                                                    className="flex-1 flex flex-col items-start justify-center gap-y-1">
                                                    <Skeleton className="w-36 !h-3"/>
                                                    <Skeleton className="w-20 !h-3"/>
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <Skeleton className="w-20"/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        </React.Fragment>
    );
};

export default ModalBodyGroupMember;
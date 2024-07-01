import {Friend} from "../../../models/profile.ts";
import {Avatar} from "../../../components/Avatar";
import {MessageCircleReply} from "../../../components/Icons";
import {Tooltip} from "../../../components/Tooltips";
import {useMutation} from "@tanstack/react-query";
import userApi from "../../../api/userApi.ts";
import {ErrorResponse} from "../../../models";
import {useAuth} from "../../../hooks/useAuth.ts";

interface RequestItemProps {
    request: Friend;
}

const RequestItem = ({request}: RequestItemProps) => {
    const {queryClient, token} = useAuth();

    const acceptFriendRequestMutation = useMutation({
        mutationFn: ({token, friendId}: {
            token: string,
            friendId: string
        }) => userApi.acceptFriendRequest(token, friendId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['requests']});
            queryClient.invalidateQueries({queryKey: ['chatRooms']});
            queryClient.invalidateQueries({queryKey: ['friends']});
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const declineFriendRequestMutation = useMutation({
        mutationFn: ({token, friendId}: {
            token: string,
            friendId: string
        }) => userApi.declineFriendRequest(token, friendId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['requests']});
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const onClickAcceptFriendRequest = () => {
        if (token) {
            acceptFriendRequestMutation.mutate({token: token, friendId: request.profile.id})
        }
    }

    const onClickDeclineFriendRequest = () => {
        if (token) {
            declineFriendRequestMutation.mutate({token: token, friendId: request.profile.id})
        }
    }

    return (
        <div className="bg-white rounded p-4">
            <div className="flex flex-row gap-4 mb-4">
                <div className="w-11 h-11">
                    {
                        request.profile.thumbnailAvatar ? <Avatar src={request.profile.thumbnailAvatar} alt="Avatar"/> :
                            <Avatar>{request.profile?.firstName.charAt(0).toUpperCase()}</Avatar>
                    }
                </div>
                <div className="flex-1">
                    <div className="font-semibold">{request.displayName}</div>
                    <div className="text-xs text-gray-500">18/6 - Từ số điện thoại</div>
                </div>
                <Tooltip message="Nhắn tin">
                    <button className="hover:bg-gray-200  rounded-full p-1">
                        <MessageCircleReply/>
                    </button>
                </Tooltip>
            </div>
            <div className="mb-4 h-14 p-2 border rounded bg-gray-50">
                <div className="overflow-y-auto h-full scrollbar-thin">
                    <div className="text-sm tracking-wide">Xin chào, mình
                        là {request.profile.firstName + " " + request.profile.lastName}. Mình tìm thấy bạn bằng số điện
                        thoại. Kết bạn với mình
                        nhé!
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={onClickDeclineFriendRequest}
                    disabled={declineFriendRequestMutation.isPending}
                    className="bg-gray-200 hover:bg-gray-300 font-semibold rounded px-4 h-10">
                    {declineFriendRequestMutation.isPending ? 'Đang xử lý': 'Từ chối'}
                </button>
                <button
                    onClick={onClickAcceptFriendRequest}
                    disabled={acceptFriendRequestMutation.isPending}
                    className="bg-blue-200 hover:bg-blue-300 text-blue-600 font-semibold rounded px-4 h-10">
                    {acceptFriendRequestMutation.isPending ? 'Đang xử lý...' : 'Đồng ý'}
                </button>
            </div>
        </div>
    );
};

export default RequestItem;
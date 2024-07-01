import {Friend} from "../../../models/profile.ts";
import {Avatar} from "../../../components/Avatar";
import {MessageCircleReply} from "../../../components/Icons";
import {Tooltip} from "../../../components/Tooltips";
import {useMutation} from "@tanstack/react-query";
import userApi from "../../../api/userApi.ts";
import {ErrorResponse} from "../../../models";
import {useAuth} from "../../../hooks/useAuth.ts";

interface SentRequestItemProps {
    request: Friend;
}

const SentRequestItem = ({request}: SentRequestItemProps) => {
    const {queryClient, token} = useAuth();

    const cancelFriendRequestMutation = useMutation({
        mutationFn: ({token, friendId}: {
            token: string,
            friendId: string
        }) => userApi.cancelFriendRequest(token, friendId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['sends']});
        },
        onError: (error: ErrorResponse) => {
            console.log(error.detail);
        }
    });

    const onClickCancelFriendRequeset = () => {
        if (token) {
            cancelFriendRequestMutation.mutate({token: token, friendId: request.profile.id});
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
                    <div className="text-xs text-gray-500">Bạn đã gửi lời mời</div>
                </div>
                <Tooltip message="Nhắn tin">
                    <button className="hover:bg-gray-200  rounded-full p-1">
                        <MessageCircleReply/>
                    </button>
                </Tooltip>
            </div>
            <div>
                <button
                    onClick={onClickCancelFriendRequeset}
                    disabled={cancelFriendRequestMutation.isPending}
                    className="bg-gray-200 hover:bg-gray-300 font-semibold rounded px-4 h-10 w-full">{cancelFriendRequestMutation.isPending ? 'Đang xử lý...' : 'Thu hồi lời mời'}
                </button>
            </div>
        </div>
    );
};

export default SentRequestItem;
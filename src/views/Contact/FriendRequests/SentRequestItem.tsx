import {Friend} from "../../../models/profile.ts";
import {Avatar} from "../../../components/Avatar";
import {MessageCircleReply} from "../../../components/Icons";
import {Tooltip} from "../../../components/Tooltips";

interface SentRequestItemProps {
    request: Friend;
}

const SentRequestItem = ({request}: SentRequestItemProps) => {
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
                    className="bg-gray-200 hover:bg-gray-300 font-semibold rounded px-4 h-10 w-full">Thu hồi lời mời
                </button>
            </div>
        </div>
    );
};

export default SentRequestItem;
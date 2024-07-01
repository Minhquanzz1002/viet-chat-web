import {useAuth} from "../../../hooks/useAuth.ts";
import {ChatRoom} from "../../../models";
import ChatTab from "../../../components/Tabs/ChatTab.tsx";

const ChatMenu = () => {
    const {chatRooms} = useAuth();
    return (
        <div className="flex-1 overflow-y-auto scrollbar-thin border-t">
            {
                chatRooms?.map((chatRoom: ChatRoom) => (
                    <ChatTab chatRoom={chatRoom} key={"tab-chat-" + chatRoom.id}/>
                ))
            }
        </div>
    );
};

export default ChatMenu;
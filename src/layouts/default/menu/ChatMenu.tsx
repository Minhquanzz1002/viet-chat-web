import {useAuth} from "../../../hooks/useAuth.ts";
import {ChatRoom} from "../../../models";
import ChatTab from "../../../components/Tabs/ChatTab.tsx";

const ChatMenu = () => {
    const {chatRooms} = useAuth();
    return (
        <div className="flex-1 overflow-y-auto">
            {
                chatRooms?.map((chatRoom: ChatRoom, index: number) => (
                    <ChatTab chatRoom={chatRoom} key={index}/>
                ))
            }
        </div>
    );
};

export default ChatMenu;
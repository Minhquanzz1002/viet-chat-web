import {useEffect, useState} from 'react';
import {ChatRoom} from "../../models";
import {Avatar} from "../Avatar";
import {useAuth} from "../../hooks/useAuth.ts";
import useTabSelected from "../../hooks/useTabSelected.ts";

interface ChatTabProps {
    chatRoom: ChatRoom;
}

const ChatTab = ({chatRoom}: ChatTabProps) => {
    const {setTabSelected, tabSelected} = useTabSelected();
    const {profile} = useAuth();
    const [sender, setSender] = useState<string>("");
    const lastMessage = chatRoom.lastMessage;
    const senderId = lastMessage?.sender?.id;

    useEffect(() => {
        if (chatRoom.isGroup) {
            if (senderId) {
                if (senderId === profile?.id) {
                    setSender("Bạn: ");
                } else {
                    setSender(lastMessage.sender.lastName + ": ");
                }
            }
        } else {
            if (senderId && senderId === profile?.id) {
                setSender("Bạn: ");
            }
        }
    }, [senderId, profile, lastMessage]);

    const onClickTab = () => {
        setTabSelected(prevState => ({
            ...prevState,
            chat: {
                ...prevState.chat,
                tabId: chatRoom.id,
            }
        }))
    }


    return (
        <div className={`px-4 flex flex-row gap-3 h-[74px] items-center w-full cursor-pointer ${tabSelected.chat.tabId === chatRoom.id ? 'bg-blue-100': 'hover:bg-[#F3F5F6]'}`} onClick={onClickTab}>
            <div>
                {
                    chatRoom?.avatar ? <Avatar src={chatRoom.avatar} alt="avatar"/> :
                        <Avatar>{chatRoom?.name.charAt(0).toUpperCase()}</Avatar>
                }
            </div>
            <div className="flex-1 flex flex-col">
                <div>{chatRoom.name}</div>
                <div className="text-xs grid grid-rows-1">
                    <div className="truncate overflow-hidden">{sender}{chatRoom.lastMessage.content}</div>
                </div>
            </div>
        </div>
    );
};

export default ChatTab;
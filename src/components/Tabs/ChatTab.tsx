import {useEffect, useState} from 'react';
import {ChatRoom} from "../../models";
import {Avatar} from "../Avatar";
import {useAuth} from "../../hooks/useAuth.ts";
import useTabSelected from "../../hooks/useTabSelected.ts";
import dayjs from "dayjs";
import {Ellipsis, Like, Pin} from "../Icons";

interface ChatTabProps {
    chatRoom: ChatRoom;
}

const ChatTab = ({chatRoom}: ChatTabProps) => {
    const [sender, setSender] = useState<string>("");
    const [messageTime, setMessageTime] = useState<string>();
    const {setTabSelected, tabSelected} = useTabSelected();
    const {profile} = useAuth();
    const lastMessage = chatRoom.lastMessage;
    const senderId = lastMessage?.sender?.id;

    useEffect(() => {
        const updateMessageTime = () => {
            const now = dayjs();
            const messageDate = dayjs(chatRoom.lastMessage.createdAt);
            const daysDifference = now.diff(messageDate, 'd');
            const hoursDifference = now.diff(messageDate, 'h');
            const minutesDifference = now.diff(messageDate, 'm');
            const secondsDifference = now.diff(messageDate, 's');
            if (secondsDifference < 60) {
                setMessageTime('vài giây');
            } else if (minutesDifference < 60) {
                setMessageTime(`${minutesDifference} phút`);
            } else if (daysDifference === 0) {
                if (hoursDifference < 24) {
                    setMessageTime(`${hoursDifference} giờ`);
                } else {
                    setMessageTime('hôm nay')
                }
            } else if (daysDifference === 1) {
                setMessageTime('hôm qua');
            } else if (daysDifference <= 7) {
                setMessageTime(`${daysDifference} ngày`);
            } else {
                setMessageTime(messageDate.format('DD/MM'));
            }
        }
        updateMessageTime();

        const intervalId = setInterval(updateMessageTime, 60000);
        return () => clearInterval(intervalId);
    }, [chatRoom]);

    useEffect(() => {
        if (senderId) {
            if (chatRoom.groupId) {
                if (senderId === profile?.id) {
                    setSender("Bạn: ");
                } else {
                    setSender(lastMessage.sender.lastName + ": ");
                }
            } else {
                if (senderId === profile?.id) {
                    setSender("Bạn: ");
                }
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
        <div className={`px-4 flex flex-row gap-3 h-[74px] group items-center w-full cursor-pointer ${tabSelected.chat.tabId === chatRoom.id ? 'bg-blue-100': 'hover:bg-[#F3F5F6]'}`} onClick={onClickTab}>
            <div>
                {
                    chatRoom?.avatar ? <Avatar src={chatRoom.avatar} alt="avatar"/> :
                        <Avatar>{chatRoom?.name.charAt(0).toUpperCase()}</Avatar>
                }
            </div>
            <div className="flex-1 flex flex-col">
                <div className="w-[220.8px] inline-flex gap-x-2 justify-between">
                    <div className="truncate overflow-hidden py-1">{chatRoom.name}</div>
                    <div>
                        <div className="text-xs">
                            <div className="group-hover:hidden">{messageTime}</div>
                            <div className="group-hover:block hidden">
                                <button className="flex h-full p-1  justify-center items-center rounded hover:bg-[#DFE2E7]" title="Thêm">
                                    <Ellipsis/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-xs w-[220.8px] inline-flex gap-x-2 justify-between">
                    <div className="truncate overflow-hidden text-gray-500 inline-flex items-center">
                        {sender}
                        {
                            chatRoom.lastMessage.content.includes('/-strong') ? (
                                <div>
                                    <Like/>
                                </div>
                            ) : (
                                chatRoom.lastMessage.content
                            )
                        }
                    </div>
                    <div>
                        <Pin className="transform rotate-45" size={12} isFill={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatTab;
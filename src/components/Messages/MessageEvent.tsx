import {Message} from "../../models/chat.ts";

interface MessageEventProps {
    message: Message;
}

const MessageEvent = ({message} : MessageEventProps) => {
    return (
        <div className="flex justify-center">
            <div className="w-fit max-w-[90%] cursor-default flex justify-center gap-4 bg-[#F7F8F8] opacity-75 text-xs font-thin drop-shadow-md rounded-xl py-1.5 px-3" title={message.createdAt}>
                <p className="truncate p-0">
                    {message?.content}
                </p>
            </div>
        </div>
    )
};

export default MessageEvent;

import {Message} from "../../models/chat.ts";
import dayjs from "dayjs";
import {Avatar} from "../Avatar";
import React from "react";
import {Like, Quote} from "../Icons";

interface OtherMessageProps {
    message: Message;
    onReplyMessage: (message: Message) => void;
}
const OtherMessage = ({message, onReplyMessage} : OtherMessageProps) => {
    return (
        <div className="flex justify-start gap-x-3 group/container-msg">
            <div>
                {
                    message.sender.thumbnailAvatar ?
                        <Avatar src={message.sender.thumbnailAvatar} alt="Avatar" className="w-10 h-10"/> :
                        <Avatar className="w-10 h-10">{message.sender.firstName.charAt(0).toUpperCase()}</Avatar>
                }
            </div>
            <div className="w-fit min-w-24 max-w-[75%] flex justify-start bg-white shadow rounded-lg p-3">
                <div>
                    <div>
                        {
                            message?.content.includes('/-strong') ? (
                                <div>
                                    <Like/>
                                </div>
                            ) : (
                                    <React.Fragment>
                                        {
                                            message?.content.split('\n').map((line, index) => (
                                                <React.Fragment key={message.messageId + '-msg-line-' + index}>
                                                    {line}
                                                    <br/>
                                                </React.Fragment>
                                            ))
                                        }
                                    </React.Fragment>
                                )
                        }
                    </div>
                    <div className="text-xs text-gray-500 mt-2.5">
                        {
                            dayjs(message.createdAt).format("HH:mm")
                        }
                    </div>
                </div>
            </div>
            <div className="w-max-[25%] hidden group-hover/container-msg:inline-block self-end">
                <div className="mb-2 bg-gray-300 rounded inline-flex gap-x-2">
                    <div className="cursor-pointer inline-flex items-center justify-center h-7 w-5"
                         onClick={() => onReplyMessage(message)}>
                        <Quote className="hover:fill-[#005AE0] fill-gray-500"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OtherMessage;
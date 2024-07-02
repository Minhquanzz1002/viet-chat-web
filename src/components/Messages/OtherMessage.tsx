import {Message} from "../../models/chat.ts";
import dayjs from "dayjs";
import {Avatar} from "../Avatar";
import React from "react";
import {Download, Like, Quote} from "../Icons";
import axios from "axios";
import AttachmentViewer from "./AttachmentViewer.tsx";
import {formatFileSize} from "../../utils/fileUtils.ts";

interface OtherMessageProps {
    message: Message;
    onReplyMessage: (message: Message) => void;
}

const OtherMessage = ({message, onReplyMessage}: OtherMessageProps) => {
    const onClickDownFile = async () => {
        if (message.attachments) {
            try {
                const response = await axios.get(message.attachments[0].url, {responseType: 'blob'});
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = message.attachments[0].filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.log('Error');
            }
        }
    }

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
                            message.attachments ? (
                                <div className="inline-flex justify-between items-center gap-x-3 cursor-pointer">
                                    <div>
                                        <AttachmentViewer filename={message.attachments[0].filename}/>
                                    </div>
                                    <div className="flex flex-col justify-start text-sm gap-y-2">
                                        <div
                                            className="font-medium max-w-full line-clamp-1"
                                            title={message.attachments[0].filename}>{message.attachments[0].filename}</div>
                                        <div className="text-gray-500 text-xs inline-flex gap-x-1">
                                            <span>{formatFileSize(message.attachments[0].size)}</span>
                                            <span>•</span>
                                            <span className="text-blue-600">Tải về để xem lâu dài</span>
                                        </div>
                                    </div>
                                    <div className="self-end">
                                        <div
                                            onClick={onClickDownFile}
                                            className="bg-white p-0.5 rounded inline-flex items-center justify-center cursor-pointer border"
                                            title="Tải về máy">
                                            <Download/>
                                        </div>
                                    </div>
                                </div>
                            ) : (
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
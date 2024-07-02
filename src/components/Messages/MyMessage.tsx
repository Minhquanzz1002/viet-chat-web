import {Message} from "../../models/chat.ts";
import dayjs from "dayjs";
import React from "react";
import {Download, Like, Quote} from "../Icons";
import AttachmentViewer from "./AttachmentViewer.tsx";
import {formatFileSize} from "../../utils/fileUtils.ts";
import axios from "axios";

interface MyMessageProps {
    message: Message;
    onReplyMessage: (message: Message) => void;
}

const MyMessage = ({message, onReplyMessage}: MyMessageProps) => {

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
        <div className="flex justify-end w-full group/container-msg gap-x-2">
            <div className="w-max-[25%] hidden group-hover/container-msg:inline-block self-end">
                <div className="mb-2 bg-gray-300 rounded inline-flex gap-x-2">
                    <div className="cursor-pointer group/reply inline-flex items-center justify-center h-7 w-5"
                         title="Trả lời"
                         onClick={() => onReplyMessage(message)}>
                        <Quote className="group-hover/reply:fill-[#005AE0] fill-gray-500"/>
                    </div>
                </div>
            </div>
            <div
                className="w-fit max-w-[75%] flex justify-end bg-[#E5EFFF] drop-shadow border border-[#E5EFFF] rounded-lg p-3 relative group">
                <div className="min-w-[100px]">
                    {
                        message.replyMessageId && (
                            <div className="bg-blue-200 p-2 rounded mb-2">
                                <div className="h-9 inline-flex justify-center items-center gap-x-2 w-full">
                                    <div className="h-full w-0.5 bg-blue-600"></div>
                                    <div className="text-xs flex-1">
                                        <div className="font-medium">
                                            {message.sender.firstName + " " + message.sender.lastName}
                                        </div>
                                        <div className="w-full max-w-full line-clamp-1 text-gray-500">
                                            {message.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
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
                                    <div className="select-text">
                                        {
                                            message?.content.split('\n').map((line, index) => (
                                                <React.Fragment key={message.messageId + '-msg-line-' + index}>
                                                    {line}
                                                    <br/>
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
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
        </div>
    );
}

export default MyMessage;
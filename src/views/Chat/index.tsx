import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
    ChevronDown,
    GroupPlus,
    Image,
    Like,
    PanelRight,
    Paperclip,
    PencilLine,
    Search,
    SendHorizontal,
    Smile,
    Tag,
    UserRound,
    Video,
    X
} from "../../components/Icons";
import useTabSelected from "../../hooks/useTabSelected.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useAuth} from "../../hooks/useAuth.ts";
import chatApi from "../../api/chatApi.ts";
import {Avatar} from "../../components/Avatar";
import {ChatDTO, Message, MessageRequestDTO} from "../../models/chat.ts";
import dayjs from 'dayjs';
import OtherMessage from "../../components/Messages/OtherMessage.tsx";
import MyMessage from "../../components/Messages/MyMessage.tsx";
import MessageEvent from "../../components/Messages/MessageEvent.tsx";
import ChatInfo from "./ChatInfo.tsx";
import EmojiPicker, {EmojiClickData, EmojiStyle} from "emoji-picker-react";
import fileApi from "../../api/fileApi.ts";
import {UploadFileRequestDTO} from "../../models/file.ts";
import axios from "axios";
import {Toast} from "../../components/Toast";
import Skeleton from "../../components/Skeleton";

interface MessagesByDate {
    [date: string]: Message[];
}

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ChatView = () => {
    const [hidden, setHidden] = useState<boolean>(false);
    const [isShowScrollButton, setIsShowScrollButton] = useState(false);
    const [isShowPickerEmoji, setIsShowPickerEmoji] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [replyMessage, setReplyMessage] = useState<Message | null>(null);
    const [messagesByDate, setMessagesByDate] = useState<MessagesByDate>({});
    const [chat, setChat] = useState<ChatDTO | null>(null);
    const [toastMsg, setToastMsg] = useState<string>("");
    const {tabSelected} = useTabSelected();
    const {token, profile, messages} = useAuth();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && chat?.id && token) {
            const files = Array.from(event.target.files);
            const invalidFile = files.some(file => file.size > MAX_FILE_SIZE);
            if (invalidFile) {
                setToastMsg("Chỉ hỗ trợ gửi file dưới 2MB");
                return;
            }
            files.map(async (file) => {
                const dataUploadFile : UploadFileRequestDTO = {
                    type: 'MESSAGE',
                    filename: file.name
                }
                const link = await getLinkUploadFileMutation.mutateAsync({token: token, data: dataUploadFile})
                await axios.put(link, file, {
                    headers: {
                        'Content-Type': file.type,
                    }
                });

                const dataMsg: MessageRequestDTO = {
                    content: `[FILE] ${file.name}`,
                    attachments: [
                        {
                            filename: file.name,
                            url: link.substring(0, link.indexOf('?')),
                            type: 'FILE',
                            size: file.size,
                        }
                    ]
                }
                sendMessageMutation.mutate([chat.id, dataMsg]);
            })
        }
    }

    const onClickShowInputImage = () => {
        if (imageInputRef.current) {
            imageInputRef.current.showPicker();
        }
    }

    const onClickShowInputFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.showPicker();
        }
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    }

    useEffect(() => {
        setIsShowScrollButton(false);
        setChat(null);
    }, [tabSelected.chat.tabId]);

    useEffect(() => {
        scrollToBottom();
    }, [messagesByDate]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    }, []);

    const sendMessageMutation = useMutation({
        mutationFn: ([chatId, data]: [string, MessageRequestDTO]) => chatApi.sendMessage(token, chatId, data),
        onSuccess: (response: Message) => {
            // setMessages(prevMessages => [...prevMessages, response])
            return response;
        }
    });

    const getLinkUploadFileMutation = useMutation({
        mutationFn: ({token, data} : {token: string; data: UploadFileRequestDTO}) => fileApi.getLinkUploadFileToS3(token, data),
        onSuccess: (response: string) => {
            return response;
        }
    });

    useQuery({
        queryKey: ['chatRoomDetail', tabSelected.chat.tabId],
        queryFn: async () => {
            if (token !== '') {
                return await chatApi.getChat(token, tabSelected.chat.tabId).then((response) => {
                    setChat(response);
                    return response;
                })
            }
        },
        enabled: token !== '' && tabSelected.chat.tabId !== "",
    });

    const onReplyMessage = (message: Message) => {
        setReplyMessage(message);
    }

    const onClickShowPickerEmoji = () => {
        setIsShowPickerEmoji(true);
        inputRef.current?.focus();
    }

    const onEmojiClick = (emoji: EmojiClickData) => {
        // console.log(e);
        setMessage(prevState => prevState + emoji.emoji);
        inputRef.current?.focus();
    }

    const onClickLike = () => {
        if (!chat) {
            return;
        }
        const data: MessageRequestDTO = replyMessage ? {
            content: '/-strong',
            replyMessageId: replyMessage?.messageId
        } : {
            content: '/-strong'
        }
        sendMessageMutation.mutate([chat.id, data]);
        setMessage('');
        setReplyMessage(null);
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = '40px';
        }
    }

    const onSendMessage = () => {
        if (!chat) {
            return;
        }
        const data: MessageRequestDTO = replyMessage ? {
            content: message,
            replyMessageId: replyMessage?.messageId
        } : {
            content: message
        }
        sendMessageMutation.mutate([chat.id, data]);
        setMessage('');
        setReplyMessage(null);
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = '40px';
        }
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (message.trim()) {
                onSendMessage();
            }
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setIsShowPickerEmoji(false);
        }
    };

    useEffect(() => {
        if (isShowPickerEmoji) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShowPickerEmoji]);

    useEffect(() => {
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            const dates: MessagesByDate = {};
            messages.forEach((msg) => {
                const firstDate = dayjs(msg.createdAt).format("ddd DD/MM/YYYY")
                if (!dates[firstDate]) {
                    dates[firstDate] = [];
                }
                dates[firstDate].push(msg);
            });
            setMessagesByDate(dates);
        }
    }, [messages]);

    useEffect(() => {
        if (toastMsg !== "") {
            const timer = setTimeout(() => {
                setToastMsg("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [toastMsg]);

    return (
        <React.Fragment>
            {
                toastMsg && <Toast>{toastMsg}</Toast>
            }
            <div className="flex w-full h-screen max-h-screen">
                <div className="flex-1 h-full max-h-full">
                    <div className="h-16 max-h-16 min-h-16 border-b px-4 flex flex-row items-center justify-between">
                        <div className="inline-flex gap-x-3">
                            <div>
                                <Avatar src={chat?.avatar} name={chat?.name}/>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <div className="font-medium text-lg group flex items-center h-8">
                                    {
                                        chat?.name ? chat.name : <Skeleton/>
                                    }
                                    <button
                                        className="ml-2 rounded-full hover:bg-gray-300 bg-gray-100 p-1 hidden group-hover:inline-block"
                                    ><PencilLine size={15}/></button>
                                </div>
                                <div className="inline-flex gap-2">

                                    {
                                        chat?.group && (
                                            <React.Fragment>
                                                <div
                                                    className="text-xs inline-flex items-center gap-x-1 hover:text-blue-600 hover:underline cursor-pointer"
                                                    title={`${chat.group.members.length} thành viên`}>
                                                    <UserRound/>{chat.group.members.length} thành viên
                                                </div>
                                                <div className="w-[1px] bg-gray-600 my-[2px]"></div>
                                            </React.Fragment>
                                        )
                                    }
                                    <div
                                        className="text-xs inline-flex items-center gap-x-1 hover:text-blue-600 hover:underline cursor-pointer"
                                        title="Phân loại">
                                        <Tag className="transform rotate-[135deg]"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="inline-flex gap-x-1">
                            <button className="w-8 h-8 hover:bg-gray-200 rounded flex justify-center items-center">
                                <GroupPlus height={22} width={22}/>
                            </button>
                            <button className="w-8 h-8 hover:bg-gray-200 rounded flex justify-center items-center"
                                    title="Tìm kiếm tin nhắn">
                                <Search/>
                            </button>
                            <button className="w-8 h-8 hover:bg-gray-200 rounded flex justify-center items-center"
                                    title="Cuộc gọi video">
                                <Video/>
                            </button>
                            <button onClick={() => setHidden(!hidden)} title="Thông tin hội thoại"
                                    className={`${hidden ? 'hover:bg-gray-200' : 'bg-blue-200'} w-8 h-8 rounded flex justify-center items-center`}>
                                <PanelRight expand={!hidden}/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col h-[calc(100%_-_64px)]">
                        {/* Start: Messages */}
                        <div className="bg-[#EEF0F1] flex-1 overflow-y-auto scrollbar-thin px-4 relative">
                            {
                                Object.entries(messagesByDate).map(([date, messagesArray]) => (
                                    <React.Fragment key={date}>
                                        <div className="flex justify-center">
                                            <div
                                                className="text-center w-fit text-xs px-2 py-1 my-2 bg-[#7F7D7E] rounded-lg text-white">
                                                {date}
                                            </div>
                                        </div>
                                        {
                                            messagesArray.map((message: Message, index: number) => {
                                                return (
                                                    <div key={message.messageId + index} className="my-6">
                                                        {
                                                            message.type === "EVENT" ?
                                                                <MessageEvent message={message}/> :
                                                                (message.sender.id === profile?.id ?
                                                                    <MyMessage message={message}
                                                                               onReplyMessage={onReplyMessage}/> :
                                                                    <OtherMessage message={message}
                                                                                  onReplyMessage={onReplyMessage}/>)

                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </React.Fragment>

                                ))
                            }
                            <div ref={messagesEndRef} className='end'/>
                        </div>
                        {/* End: Messages */}

                        <div className="relative">
                            {
                                isShowScrollButton && (
                                    <div
                                        className="absolute -top-12 right-6 w-9 h-9 rounded-full bg-white cursor-pointer flex items-center justify-center"
                                        onClick={scrollToBottom} title="Cuộn xuống cuối">
                                        <ChevronDown/>
                                    </div>
                                )
                            }
                            <div className="h-10 border-b flex items-center py-1 px-2 gap-x-2">
                                <div
                                    title="Gửi Sticker"
                                    className="cursor-pointer hover:bg-gray-200 h-full aspect-square rounded flex items-center justify-center">
                                    <Smile/>
                                </div>
                                <div
                                    onClick={onClickShowInputImage}
                                    title="Gửi hình ảnh"
                                    className="cursor-pointer hover:bg-gray-200 h-full aspect-square rounded flex items-center justify-center">
                                    <Image strokeWidth={1.5} size={22}/>
                                </div>
                                <input className='hidden' type='file' accept='.png, .jpg' ref={imageInputRef}/>
                                <div
                                    onClick={onClickShowInputFile}
                                    title="Đính kèm File"
                                    className="cursor-pointer hover:bg-gray-200 h-full aspect-square rounded flex items-center justify-center">
                                    <Paperclip/>
                                </div>
                                <input className='hidden' type='file' onChange={onFileChange} multiple={true}
                                       ref={fileInputRef}/>
                            </div>
                            {
                                replyMessage && (
                                    <div className="px-4 pt-2">
                                        <div className="bg-gray-200 px-3 py-2 rounded">
                                            <div className="h-9 inline-flex justify-center items-center gap-x-2 w-full">
                                                <div className="h-full w-0.5 bg-blue-600"></div>
                                                <div className="text-xs flex-1">
                                                    <div>Trả lời: <span
                                                        className="font-medium">{replyMessage.sender.firstName + " " + replyMessage.sender.lastName}</span>
                                                    </div>
                                                    <div className="w-full max-w-full line-clamp-1 text-gray-500">
                                                        {replyMessage.content}
                                                    </div>
                                                </div>
                                                <div className="self-start">
                                                    <button onClick={() => setReplyMessage(null)}
                                                            title="Đóng"
                                                    ><X
                                                        className="text-gray-400 hover:text-gray-600"/></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div
                                className="flex flex-wrap justify-end items-center py-3 w-full px-4 gap-x-1">
                                <div className={`flex-1 flex max-h-28 overflow-y-auto scrollbar-thin`}>
                                <textarea ref={inputRef} value={message} onChange={onChangeInput}
                                          onKeyDown={onInputKeyDown}
                                          className="w-full px-2 py-2 outline-none resize-none scrollbar-thin max-h-28"
                                          placeholder={`Nhập @, tin nhắn tới ${chat?.name}`} onInput={onInput}
                                          rows={1}/>
                                </div>
                                <div className="self-end inline-flex items-center justify-center">
                                    <div className="relative">
                                        {
                                            isShowPickerEmoji && (
                                                <div className="absolute bottom-9 left-0" ref={pickerRef}>
                                                    <EmojiPicker
                                                        onEmojiClick={onEmojiClick}
                                                        searchPlaceholder="Tìm kiếm"
                                                        previewConfig={{showPreview: false}}
                                                        emojiStyle={EmojiStyle.GOOGLE}
                                                    />
                                                </div>
                                            )
                                        }
                                        <div
                                            onClick={onClickShowPickerEmoji}
                                            title="Biểu cảm"
                                            className="w-8 aspect-square flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer">
                                            <Smile/>
                                        </div>
                                    </div>
                                    {
                                        message ? (
                                            <button
                                                onClick={onSendMessage}
                                                title="Gửi"
                                                className="w-8 aspect-square flex items-center justify-center hover:bg-blue-100 rounded">
                                                <SendHorizontal/>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={onClickLike}
                                                title="Gửi nhanh biểu tượng cảm xúc"
                                                className="w-8 aspect-square flex items-center justify-center hover:bg-gray-200 rounded">
                                                <Like/>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !hidden && (<ChatInfo chatRoom={chat}/>)
                }
            </div>
        </React.Fragment>
    );
};

export default ChatView;
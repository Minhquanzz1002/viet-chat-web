import axiosClient from "./axiosClient.ts";
import {ChatDTO, Message, MessagePageable, MessageRequestDTO} from "../models/chat.ts";

const chatApi = {
    async getChat(token: string, chatId: string) : Promise<ChatDTO> {
        const url : string = `/v1/chats/${chatId}`;
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async getMessages(token: string, chatId: string) : Promise<MessagePageable> {
        const url : string = `/v1/chats/${chatId}/messages`;
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async sendMessage(token: string, chatId: string, data: MessageRequestDTO): Promise<Message> {
        const url : string = `/v1/chats/${chatId}/messages`;
        return await axiosClient.post(url, data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default chatApi;
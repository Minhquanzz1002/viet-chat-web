import axiosClient from "./axiosClient.ts";
import {ChatRoom, UserProfile} from "../models";
import {Friend} from "../models/profile.ts";

const userApi = {
    async profile(token: string) : Promise<UserProfile> {
        const url = "/v1/users/profile";
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async getAllChatRooms(token: string) : Promise<ChatRoom[]> {
        const url = "/v1/users/profile/chats";
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async getAllFriends(token: string, type: "friend" | "request" | "sent") : Promise<Friend[]> {
        const url = `/v1/users/profile/friends?type=${type}`;
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
}
export default userApi;
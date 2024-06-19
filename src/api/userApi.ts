import axiosClient from "./axiosClient.ts";
import {ChatRoom, UserProfile} from "../models";
import {Friend, UserInfoDTO} from "../models/profile.ts";
import {GroupDTO} from "../models/group.ts";

const userApi = {
    async profile(token: string) : Promise<UserProfile> {
        const url = "/v1/users/profile";
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async updateProfile(token: string, data: UserInfoDTO) : Promise<UserProfile>  {
        const url = "/v1/users/profile";
        return await axiosClient.put(url, data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async updateDisplayName(token: string, data: UserInfoDTO) : Promise<UserProfile>  {
        const url = "/v1/users/profile";
        return await axiosClient.put(url, data,{
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
    async getAllGroups(token: string) : Promise<GroupDTO[]> {
        const url = `/v1/users/profile/groups`;
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
export default userApi;
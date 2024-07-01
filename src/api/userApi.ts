import axiosClient from "./axiosClient.ts";
import {ChatRoom, UserProfile} from "../models";
import {Friend, OtherUserInfoDTO, UserInfoDTO} from "../models/profile.ts";
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
    },
    async getSearchHistory(token: string) : Promise<OtherUserInfoDTO[]> {
        const url = `/v1/users/profile/search/recent`;
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async getUserInfoByPhone(token: string, phone: string) : Promise<OtherUserInfoDTO> {
        const url = `/v1/users/profile/${phone}`;
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async addFriend(token: string, friendId: string) : Promise<Friend> {
        const url = `/v1/users/profile/friends/${friendId}`;
        return await axiosClient.put(url,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async cancelFriendRequest(token: string, friendId: string) : Promise<Friend> {
        const url = `/v1/users/profile/friends/${friendId}/cancel`;
        return await axiosClient.put(url,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async acceptFriendRequest(token: string, friendId: string) : Promise<Friend> {
        const url = `/v1/users/profile/friends/${friendId}/accept`;
        return await axiosClient.put(url,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async declineFriendRequest(token: string, friendId: string) : Promise<Friend> {
        const url = `/v1/users/profile/friends/${friendId}/decline`;
        return await axiosClient.put(url,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async deleteFriend(token: string, friendId: string) : Promise<Friend> {
        const url = `/v1/users/profile/friends/${friendId}`;
        return await axiosClient.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async blockFriend(token: string, friendId: string) : Promise<Friend> {
        const url = `/v1/users/profile/friends/${friendId}/block`;
        return await axiosClient.put(url,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async unblockFriend(token: string, friendId: string) : Promise<Friend> {
        const url = `/v1/users/profile/friends/${friendId}/unblock`;
        return await axiosClient.put(url,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
}
export default userApi;
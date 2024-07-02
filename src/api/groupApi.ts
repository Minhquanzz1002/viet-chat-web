import axiosClient from "./axiosClient.ts";
import {GroupDTO, GroupMemberDTO, GroupRequestCreateDTO} from "../models/group.ts";

const groupApi = {
    async createGroup(token: string, data: GroupRequestCreateDTO): Promise<GroupDTO> {
        const url: string = '/v1/groups';
        return await axiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    async getAllMembers(token: string, groupId: string): Promise<GroupMemberDTO[]> {
        const url: string = `/v1/groups/${groupId}/members`;
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
}

export default groupApi;
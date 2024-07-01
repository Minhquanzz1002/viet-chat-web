import axiosClient from "./axiosClient.ts";
import {GroupDTO, GroupRequestCreateDTO} from "../models/group.ts";

const groupApi = {
    async createGroup(token: string, data: GroupRequestCreateDTO): Promise<GroupDTO> {
        const url: string = '/v1/groups';
        return await axiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
}

export default groupApi;
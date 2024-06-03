import axiosClient from "./axiosClient.ts";
import {UserProfile} from "../models";

const userApi = {
    async profile(token: string) : Promise<UserProfile> {
        const url = "/v1/users/profile";
        return await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
export default userApi;
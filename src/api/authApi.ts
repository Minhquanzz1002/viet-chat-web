import {Credential, Tokens} from "../models";
import axiosClient from "./axiosClient.ts";

const authApi = {
    async login(credential : Credential) : Promise<Tokens> {
        const url = '/v1/auth/login';
        return await axiosClient.post(url, credential);
    }
};

export default authApi;
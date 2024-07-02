import axiosClient from "./axiosClient.ts";
import {UploadFileRequestDTO} from "../models/file.ts";

const fileApi = {
    async getLinkUploadFileToS3(token: string, data: UploadFileRequestDTO): Promise<string> {
        const url: string = `/v1/files`;
        return await axiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
}
export default fileApi;
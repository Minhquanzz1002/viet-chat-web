import axiosClient from "./axiosClient.ts";
import {OTPRequestDTO, PhoneNumberDTP} from "../models/phone.ts";
import {Tokens} from "../models";

const phoneApi = {
    async sendOTP(data: PhoneNumberDTP): Promise<string> {
        const url: string = `/v1/verification/otp/sms/send`;
        return await axiosClient.post(url, data);
    },
    async validate(data: OTPRequestDTO): Promise<Tokens> {
        const url: string = `/v1/verification/otp/sms/validate`;
        return await axiosClient.post(url, data);
    },
}
export default phoneApi;
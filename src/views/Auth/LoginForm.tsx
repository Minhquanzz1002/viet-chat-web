import InputIcon from "../../components/Forms/Inputs/InputIcon.tsx";
import {Lock, Smartphone} from "lucide-react";
import React, {useEffect, useState} from "react";
import authApi from "../../api/authApi.ts";
import {useMutation} from "@tanstack/react-query";
import {ErrorResponse, Tokens} from "../../models";
import {useAuth} from "../../hooks/useAuth.ts";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

interface LoginFormProps {
    hidden: boolean;
    onForgotPasswordClick: () => void;
}

const LoginForm = ({hidden = false, onForgotPasswordClick}: LoginFormProps) => {
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("")
    const [isShowInfoAccountDemo, setIsShowInfoAccountDemo] = useState<boolean>(true);

    const navigate = useNavigate();
    const {setToken} = useAuth();

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        const newPhone = e.target.value.trim();
        if (newPhone === '' || /^\d+$/.test(newPhone)) {
            setPhone(newPhone);
        }
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setPassword(e.target.value);
    }

    const isButtonDisabled = phone.length < 10 || password === "";

    // Change page title dynamically
    useEffect(() => {
        document.title = "Đăng nhập tài khoản Viet Chat";
    }, []);

    const {mutateAsync: loginAsync, isPending: isLoading} = useMutation({
        mutationFn: authApi.login,
        onSuccess: (tokens: Tokens) => {
            console.log(tokens);
            Cookies.set('token', tokens.accessToken, {expires: 1});
            Cookies.set('refreshToken', tokens.refreshToken, {expires: 14});
            setToken(tokens.accessToken);
            navigate('/');
        },
        onError: (error: ErrorResponse) => {
            setError(error.detail);
        }
    });

    const onLogin = () => {
        if (!/^0(?:3[2-9]|8[12345689]|7[06789]|5[2689]|9[2367890])\d{7}$/.test(phone)) {
            setError("Vui lòng nhập số điện thoại hợp lệ");
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{8,32}$/.test(password)) {
            setError("Mật khẩu từ 8 - 32 ký tự gồm tối thiểu 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 chữ số và 1 ký tự đặc biệt");
            return;
        }
        loginAsync({phone: phone, password: password});
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onLogin();
        }
    };

    return (
        <React.Fragment>
            {
                isShowInfoAccountDemo && (
                    <div className="fixed inset-0 z-20 inline-flex justify-center items-center">
                        <div className="mt-10 bg-white   rounded w-[600px]">
                            <div className="h-10 inline-flex justify-between items-center w-full px-4 border-b">
                                <div className="font-medium">Danh sách tài khoản demo</div>
                                <button type="button" onClick={() => setIsShowInfoAccountDemo(false)}>&times;</button>
                            </div>
                            <div className="px-4 py-4 text-sm">
                                <div className="!cursor-text !select-text">Số điện thoại: 0354927402, Mật khẩu: Vietchat123123@, Tên: Nguyễn Minh Quân</div>
                                <div className="!cursor-text !select-text">Số điện thoại: 0342036135, Mật khẩu: Vietchat123123@, Tên: Bành Xuân Mụi</div>
                                <div className="!cursor-text !select-text">Số điện thoại: 0961613087, Mật khẩu: Vietchat123123@, Tên: Trần Khánh Linh</div>
                                <div className="!cursor-text !select-text">Số điện thoại: 0929635572, Mật khẩu: Vietchat123123@, Tên: Hà Huy Hùng</div>
                                <div className="!cursor-text !select-text">Số điện thoại: 0939730322, Mật khẩu: Vietchat123123@, Tên: Phạm Hà Gia Huy</div>
                                <div className="!cursor-text !select-text">Số điện thoại: 0354062270, Mật khẩu: Vietchat123123@, Tên: Trần Quang Khải</div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div role="tabpanel"
                 className={`p-8 flex flex-col gap-3 ${hidden && 'hidden'}`}>
                <InputIcon placeholder="Số điện thoại" type="tel" autoComplete="off" id="phone" name="phone"
                           value={phone}
                           onChange={onChangePhone}>
                    <Smartphone size={20} color="#7d7d7d"/>
                </InputIcon>
                <InputIcon onKeyDown={onKeyDown} placeholder="Mật khẩu" type="password" id="password" name="password"
                           value={password}
                           onChange={onChangePassword}>
                    <Lock size={20} color="#7d7d7d"/>
                </InputIcon>
                {error !== '' && <div className="bg-red-100 text-red-700 text-xs p-3 mb-3">{error}</div>}
                <button className="rounded text-white bg-blue-500 py-2.5 hover:opacity-90 disabled:opacity-80"
                        disabled={isButtonDisabled || isLoading} onClick={onLogin}>
                    {isLoading ? "Đang đăng nhập ..." : "Đăng nhập với mật khẩu"}
                </button>
                <div className="flex justify-center">
                <span className="text-xs hover:text-blue-600 hover:underline  cursor-pointer"
                      onClick={onForgotPasswordClick}>Quên mật khẩu?</span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LoginForm;
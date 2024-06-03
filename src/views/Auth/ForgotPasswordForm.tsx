import InputIcon from "../../components/Forms/Inputs/InputIcon.tsx";
import {ChevronsLeft, Smartphone} from "lucide-react";
import React, {useEffect, useState} from "react";

interface ForgotPasswordFormProps {
    hidden: boolean;
    onBackClick: () => void;
    onPhoneSubmit: (phoneNumber: string) => void;
}

const ForgotPasswordForm = ({hidden = false, onBackClick, onPhoneSubmit}: ForgotPasswordFormProps) => {
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<string>("");
    const onClickForgetPassword = () => {
        if (!/^0(?:3[2-9]|8[12345689]|7[06789]|5[2689]|9[2367890])\d{7}$/.test(phone)) {
            setError("Vui lòng nhập số điện thoại hợp lệ");
            return;
        }
        onPhoneSubmit(phone);
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        const newPhone = e.target.value;
        if (newPhone === '' || /^\d+$/.test(newPhone)) {
            setPhone(newPhone);
        }
    }

    const isButtonDisabled = phone.length < 10;

    // Change page title dynamically
    useEffect(() => {
        document.title = "Khôi phục mật khẩu Viet Chat";
    }, []);

    return (
        <div role="tabpanel"
             className={`p-8 flex flex-col gap-3 ${hidden && 'hidden'}`}>
            <h3 className="text-center font-semibold mb-5 mt-10">Nhập số điện thoại của bạn</h3>
            <InputIcon placeholder="Số điện thoại" type="tel" id="phone" name="phone" value={phone}
                       onChange={onChangePhone}>
                <Smartphone size={20} color="#7d7d7d"/>
            </InputIcon>

            {
                error !== '' && <div className="bg-red-100 text-red-700 text-xs p-3 mb-3" >{error}</div>
            }

            <button className="rounded text-white bg-blue-500 py-2.5 hover:opacity-90 disabled:opacity-70" disabled={isButtonDisabled} onClick={onClickForgetPassword}>Tiếp
                tục
            </button>

            <button type="button"
                    className="w-fit flex flex-row justify-center items-center text-xs hover:text-blue-600 hover:underline  cursor-pointer"
                    onClick={onBackClick}><ChevronsLeft size={16} strokeWidth={1}/>Quay lại
            </button>
        </div>
    );
};

export default ForgotPasswordForm;
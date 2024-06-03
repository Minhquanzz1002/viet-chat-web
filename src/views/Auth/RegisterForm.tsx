import InputIcon from "../../components/Forms/Inputs/InputIcon.tsx";
import {Smartphone} from "lucide-react";
import React, {useEffect, useState} from "react";

interface RegisterFormProps {
    hidden: boolean;
}
const RegisterForm = ({hidden = false} : RegisterFormProps) => {
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<string>("");
    const onClickSentOTP = () => {
        if (!/^0(?:3[2-9]|8[12345689]|7[06789]|5[2689]|9[2367890])\d{7}$/.test(phone)) {
            setError("Vui lòng nhập số điện thoại hợp lệ");
            return;
        }
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
        document.title = "Đăng ký tài khoản Viet Chat";
    }, []);

    return (
        <div role="tabpanel"
             className={`p-8 flex flex-col gap-3 ${hidden && 'hidden'}`}>
            <InputIcon placeholder="Số điện thoại" type="tel" name="phone" id="phone" value={phone} onChange={onChangePhone}>
                <Smartphone size={20} color="#7d7d7d"/>
            </InputIcon>
            {
                error !== '' && <div className="bg-red-100 text-red-700 text-xs p-3 mb-3" >{error}</div>
            }

            <button className="rounded text-white bg-blue-500 py-2.5 hover:opacity-90 disabled:opacity-80" type="button" disabled={isButtonDisabled} onClick={onClickSentOTP}>Gửi OTP</button>
        </div>
    );
};

export default RegisterForm;
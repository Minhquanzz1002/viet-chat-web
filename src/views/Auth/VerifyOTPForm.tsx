import OTPInput from "../../components/Forms/Inputs/OTPInput.tsx";
import {useEffect, useState} from "react";

interface VerifyOTPFormProps {
    hidden: boolean;
    phone: string;
}

const VerifyOTPForm = ({hidden, phone}: VerifyOTPFormProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(180);
    const [countdown, setCountdown] = useState<number>(30);
    const [otp, setOtp] = useState<string>("");
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;

            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResend = () => {
        setCountdown(10);
        setTimeLeft(180);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const onChangeOTP = (newOtp: string) => {
        setOtp(newOtp);
        if (newOtp.length === 6) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }

    const onVerifyOtp = () => {
        console.log(otp);
    }

    // Change page title dynamically
    useEffect(() => {
        document.title = "Xác nhận OTP";
    }, []);

    return (
        <div role="tabpanel"
             className={`p-8 flex flex-col gap-3 ${hidden && 'hidden'}`}>
            <h3 className="text-center font-semibold mt-5">Xác nhận OTP</h3>
            <p className="text-xs text-center">Nhập mã OTP được gửi về số điện thoại</p>
            <p className="text-center font-bold text-sky-500">(+84) {phone}</p>
            <div className="flex justify-center">
                <div
                    className="bg-gray-400 text-sm rounded-full h-10 w-10 text-white flex items-center justify-center">{formatTime(timeLeft)}</div>
            </div>
            <OTPInput onChangeOTP={onChangeOTP}/>

            <button type="button" className="rounded text-white bg-blue-500 py-2.5 hover:opacity-90 disabled:opacity-70"
                    disabled={isButtonDisabled || timeLeft <= 0} onClick={onVerifyOtp}>Tiếp tục
            </button>
            <div className="text-xs">
                <span>Bạn không nhận được OTP? </span>
                {
                    countdown > 0 ? (
                        <span className="text-blue-600">Gửi lại mã sau {countdown}</span>
                    ) : (
                        <button onClick={handleResend} type="button" className="text-blue-600">Gửi lại mã</button>
                    )
                }
            </div>
        </div>
    );
};

export default VerifyOTPForm;
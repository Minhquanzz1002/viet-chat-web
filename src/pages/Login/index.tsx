import {useState} from "react";
import LoginForm from "../../views/Auth/LoginForm.tsx";
import RegisterForm from "../../views/Auth/RegisterForm.tsx";
import ForgotPasswordForm from "../../views/Auth/ForgotPasswordForm.tsx";
import {animated, useTransition} from "@react-spring/web";
import VerifyOTPForm from "../../views/Auth/VerifyOTPForm.tsx";
import ProfileForm from "../../views/Auth/ProfileForm.tsx";

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    const [phone, setPhone] = useState<string>('');
    const [typeOTP, setTypeOTP] = useState<"REGISTER" | "FORGOT">("REGISTER");
    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    const onPhoneSubmit = (phoneNumber: string, type: "REGISTER" | "FORGOT") => {
        setPhone(phoneNumber);
        handleTabClick(4);
        setTypeOTP(type);
    };

    const transitions = useTransition(activeTab, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
        config: {duration: 300},
    });

    return (
        <div className="mx-auto relative flex flex-col items-center max-w-[600px] px-12">
            <h1 className="text-center text-6xl text-blue-600 p-3 mt-10">Viet Chat</h1>
            <p className="text-center text-lg font-light text-gray-800 mb-5">
                Đăng nhập tài khoản Viet chat <br/> để kết nối với ứng dụng Viet Chat Web
            </p>

            <div className="bg-white w-[400px] rounded">
                {/* Start: Tab list */}
                <ul className={`list-none flex flex-row text-center border-b ${(activeTab === 3 || activeTab === 4) && 'hidden'}`}
                    role='tablist'>
                    <li className="w-1/2 text-centercursor-pointer">
                        <button type="button" role="tab" aria-selected={activeTab === 1}
                                className={` px-5 leading-10  border-b-2 border-transparent hover:opacity-80 ${activeTab === 1 && 'border-gray-800 font-semibold'}`}
                                onClick={() => handleTabClick(1)}>ĐĂNG NHẬP
                        </button>
                    </li>
                    <li className="w-1/2 text-centercursor-pointer">
                        <button type="button" role="tab" aria-selected={activeTab === 2}
                                className={`px-5 leading-10 border-b-2 border-transparent hover:opacity-80 ${activeTab === 2 && 'border-gray-800 font-semibold'}`}
                                onClick={() => handleTabClick(2)}>ĐĂNG KÝ
                        </button>
                    </li>
                </ul>

                {
                    transitions((styles, item) => (
                        item === 1 ? (
                            <animated.div style={styles}>
                                <LoginForm hidden={activeTab !== 1} onForgotPasswordClick={() => handleTabClick(3)}/>
                            </animated.div>
                        ) : item === 2 ? (
                            <animated.div style={styles}>
                                <RegisterForm hidden={activeTab !== 2} onSubmit={onPhoneSubmit}/>
                            </animated.div>
                        ) : item === 3 ? (
                            <animated.div style={styles}>
                                <ForgotPasswordForm hidden={activeTab !== 3} onBackClick={() => handleTabClick(1)}
                                                    onPhoneSubmit={onPhoneSubmit}/>
                            </animated.div>
                        ) : item === 4 ? (
                            <animated.div style={styles}>
                                <VerifyOTPForm hidden={activeTab !== 4} phone={phone} type={typeOTP}/>
                            </animated.div>
                        ) : (
                            <animated.div style={styles}>
                                <ProfileForm/>
                            </animated.div>
                        )
                    ))
                }
            </div>
        </div>
    );
};

export default LoginPage;
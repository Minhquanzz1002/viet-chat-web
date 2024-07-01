import React, {useEffect, useRef, useState} from 'react';
import {Avatar} from "../Avatar";
import {useAuth} from "../../hooks/useAuth.ts";
import Skeleton from "../Skeleton";
import ProfileModal from "./ProfileModal.tsx";
import {useNavigate} from "react-router-dom";
import useTabSelected from "../../hooks/useTabSelected.ts";

const MenuModal = () => {
    const {profile, logout} = useAuth();
    const {resetAllState} = useTabSelected();
    const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
    const [isShowProfile, setIsShowProfile] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const onClickLogout = () => {
        logout();
        resetAllState();
        navigate("/auth/login");
    }

    const onClickShowProfileModal = () => {
        setIsShowMenu(false);
        setIsShowProfile(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsShowMenu(false);
        }
    };

    useEffect(() => {
        if (isShowMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShowMenu]);

    return (
        <React.Fragment>
            <div className="cursor-pointer" title={profile?.firstName + " " + profile?.lastName} onClick={() => setIsShowMenu(!isShowMenu)}>
                {
                    profile?.thumbnailAvatar ? <Avatar src={profile.thumbnailAvatar} alt="avatar"/> :
                        <Avatar>{profile?.lastName.charAt(0).toUpperCase()}</Avatar>
                }
            </div>

            {
                isShowMenu && (
                    <div
                        ref={menuRef}
                        className="absolute rounded z-20 py-2 shadow-2xl border w-72 bg-white left-full text-sm">
                        <div className="px-4 py-2 font-semibold text-base">
                            {
                                profile?.firstName ? profile.firstName + " " + profile.lastName : <Skeleton/>
                            }
                        </div>
                        <div className="border my-2 mx-2"></div>
                        <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={onClickShowProfileModal}>Hồ sơ của
                            bạn
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Đổi mật
                            khẩu
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Cài đặt
                        </div>
                        <div className="border my-2 mx-2"></div>
                        <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={onClickLogout}>Đăng
                            xuất
                        </div>
                    </div>
                )
            }
            {
                isShowProfile && <ProfileModal onClose={() => setIsShowProfile(false)}/>
            }
        </React.Fragment>
    );
};

export default MenuModal;
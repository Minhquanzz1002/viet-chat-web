import {Avatar} from "../../../components/Avatar";
import {Friend} from "../../../models/profile.ts";
import {Ellipsis} from "../../../components/Icons";
import useTabSelected from "../../../hooks/useTabSelected.ts";
import React, {useEffect, useRef, useState} from "react";
import ProfileFriendModal from "../../../components/Modal/ProfileFriendModal.tsx";
import EditDisplayNameModal from "../../../components/Modal/EditDisplayNameModal.tsx";

interface FriendItemProps {
    friend: Friend;
    showDivider: boolean;
}

const FriendItem = ({friend, showDivider}: FriendItemProps) => {
    const {setTabSelected} = useTabSelected();
    const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
    const [isShowProfile, setIsShowProfile] = useState<boolean>(false);
    const [isShowUpdateDisplayName, setIsShowUpdateDisplayName] = useState<boolean>(false);
    const [menuPosition, setMenuPosition] = useState<{ top: number, right: number }>({top: 0, right: 48});
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onClickShowProfile = () => {
        setIsShowProfile(true);
        setIsShowMenu(false);
    }

    const onClickShowUpdateDisplayName = () => {
        setIsShowUpdateDisplayName(true);
        setIsShowMenu(false);
    }

    const onClickBlockFriend = () => {
        setIsShowMenu(false);
    }

    const onClickDeleteFriend = () => {
        setIsShowMenu(false);
    }

    const onClickChatRoom = () => {
        setTabSelected(prevState => ({
            contact: {
                ...prevState.contact,
                isSelected: false,
            },
            chat: {
                tabId: friend.chatId,
                isSelected: true,
            }
        }));
    }

    const onClickShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            let topPosition = rect.bottom;

            if (topPosition + 220 > window.innerHeight) {
                topPosition = topPosition - 220;
            }

            setMenuPosition({
                top: topPosition,
                right: 48,
            });
        }
        setIsShowMenu(!isShowMenu);
    }

    const onRightClickShowMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setMenuPosition({
            top: e.clientY,
            right: window.innerWidth - e.clientX,
        });
        setIsShowMenu(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsShowMenu(false);
        }
    };

    const handleScroll = () => {
        setIsShowMenu(false);
    };

    useEffect(() => {
        if (isShowMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener("scroll", handleScroll, true);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.addEventListener("scroll", handleScroll, true);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.addEventListener("scroll", handleScroll, true);
        };
    }, [isShowMenu]);

    return (
        <React.Fragment>
            <div className='hover:bg-[#F3F5F6] cursor-pointer flex flex-row px-4' onClick={onClickChatRoom}
                 onContextMenu={onRightClickShowMenu}>
                <div className='flex-1 flex flex-row items-center'>
                    <div className="w-11 h-11">
                        {
                            friend.profile.thumbnailAvatar ?
                                <Avatar src={friend.profile.thumbnailAvatar} alt="Avatar"/> :
                                <Avatar>{friend.profile?.firstName.charAt(0).toUpperCase()}</Avatar>
                        }
                    </div>
                    {
                        friend?.displayName && <div
                            className={`w-full ml-4 py-5 ${showDivider && 'border-b-2'} font-semibold`}>{friend.displayName}</div>
                    }
                </div>
                <div className={`flex flex-col items-center justify-center ${showDivider && 'border-b-2'}`}>
                    <button className="hover:bg-[#DFE2E7] rounded w-8 h-8 flex items-center justify-center relative"
                            ref={buttonRef}
                            onClick={onClickShowMenu}>
                        <Ellipsis/>
                    </button>
                </div>
            </div>
            {
                isShowMenu && (
                    <div
                        ref={menuRef}
                        style={{top: menuPosition.top, right: menuPosition.right}}
                        className={`absolute rounded shadow-xl bg-white border z-20 py-2 w-40 text-sm`}>
                        <h3 className="tracking-wide px-2 h-9 flex items-center hover:bg-gray-100 cursor-pointer"
                            onClick={onClickShowProfile}>Xem thông
                            tin</h3>
                        <div className="h-[1px] bg-gray-200 mx-2 my-1"></div>
                        <h3 className="px-2 h-9 flex items-center hover:bg-gray-100 cursor-pointer"
                            onClick={onClickShowUpdateDisplayName}>Đặt tên gợi nhớ</h3>
                        <div className="h-[1px] bg-gray-200 mx-2 my-1"></div>
                        <h3 className="px-2 h-9 flex items-center hover:bg-gray-100 cursor-pointer" onClick={onClickBlockFriend}>Chặn người này</h3>
                        <div className="h-[1px] bg-gray-200 mx-2 my-1"></div>
                        <h3 className="text-red-600 px-2 h-9 flex items-center hover:bg-gray-100 cursor-pointer" onClick={onClickDeleteFriend}>Xóa
                            bạn</h3>
                    </div>
                )
            }

            {
                isShowProfile && (<ProfileFriendModal onClose={() => setIsShowProfile(false)} friend={friend}/>)
            }
            {
                isShowUpdateDisplayName && (
                    <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-30">
                        <div
                            className="relative z-0 h-fit rounded mx-auto bg-white lg:max-w-[400px] w-full max-w-screen-lg">
                            <div className="flex justify-between items-center px-4 border-b py-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Đặt tên gợi nhớ</span>
                                </div>
                                <button className="text-right text-3xl"
                                        onClick={() => setIsShowUpdateDisplayName(false)}>&times;</button>
                            </div>

                            <div className="relative w-full h-fit">
                                <div>
                                    <EditDisplayNameModal onChangeTab={() => setIsShowUpdateDisplayName(false)} onCloseModal={() => setIsShowUpdateDisplayName(false)} friend={friend}/>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
        </React.Fragment>
    );
};

export default FriendItem;
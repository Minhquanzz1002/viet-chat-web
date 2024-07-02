import {Avatar} from "../../../components/Avatar";
import {Ellipsis} from "../../../components/Icons";
import {GroupDTO} from "../../../models/group.ts";
import useTabSelected from "../../../hooks/useTabSelected.ts";
import React, {useEffect, useRef, useState} from "react";
import ModalGroupMember from "../../../components/Modals/ModalGroupMember.tsx";

interface GroupItemProps {
    group: GroupDTO
    showDivider: boolean;
}

const GroupItem = ({group, showDivider}: GroupItemProps) => {
    const {setTabSelected} = useTabSelected();
    const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
    const [groupIdSelected, setGroupIdSelected] = useState<string>("");
    const [menuPosition, setMenuPosition] = useState<{ top: number, right: number }>({top: 0, right: 48});
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onClickShowModalGroupMember = (e: React.MouseEvent<HTMLDivElement>, groupId: string) => {
        e.stopPropagation();
        setGroupIdSelected(groupId)
    }

    const onClickGroupChat = () => {
        setTabSelected(prevState => ({
            ...prevState,
            contact: {
                ...prevState.contact,
                isSelected: false,
            },
            chat: {
                tabId: group.chatId,
                isSelected: true
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
            {
                groupIdSelected &&
                <ModalGroupMember onClose={() => setGroupIdSelected("")} groupId={groupIdSelected}/>
            }

            <div className='hover:bg-[#F3F5F6] cursor-pointer flex flex-row px-4 h-[72px]' onClick={onClickGroupChat}
                 onContextMenu={onRightClickShowMenu}>
                <div className='flex-1 flex flex-row items-center'>
                    <div className="w-11 h-11">
                        {
                            group.thumbnailAvatar ? <Avatar src={group.thumbnailAvatar} alt="Avatar"/> :
                                <Avatar>{group.name.charAt(0).toUpperCase()}</Avatar>
                        }
                    </div>
                    {
                        group?.name && (
                            <div
                                className={`w-full ml-4 py-3 flex flex-col justify-evenly h-full ${showDivider && 'border-b-2'}`}>
                                <div className="font-semibold">{group.name}</div>
                                <div
                                    className="text-xs text-gray-500 font-semibold w-fit hover:text-blue-600 hover:underline"
                                    onClick={(e) => onClickShowModalGroupMember(e, group.id)}>
                                    {`${group.members.length} thành viên`}
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className={`flex flex-col items-center justify-center relative ${showDivider && 'border-b-2'}`}>
                    <button className="hover:bg-[#DFE2E7] rounded w-8 h-8 flex items-center justify-center"
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
                        <h3 className="px-2 h-9 flex items-center hover:bg-gray-100 cursor-pointer">Phân loại</h3>
                        <div className="h-[1px] bg-gray-200 mx-2 my-1"></div>
                        <h3 className="text-red-600 px-2 h-9 flex items-center hover:bg-gray-100 cursor-pointer">Rời
                            nhóm</h3>
                    </div>
                )
            }
        </React.Fragment>
    );
};

export default GroupItem;
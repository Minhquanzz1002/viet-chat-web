import {Avatar} from "../../components/Avatar";
import {
    Bell,
    Eye,
    GroupPlus,
    Link, LogOut,
    PencilLine,
    Pin,
    Settings,
    SortDown,
    Trash,
    UserGroup
} from "../../components/Icons";
import React, {useState} from "react";
import {ChatDTO} from "../../models/chat.ts";

interface ChatInfoProps {
    chatRoom: ChatDTO | null;
}

const ChatInfo = ({chatRoom} : ChatInfoProps) => {
    const [isChatPinned, setIsChatPinned] = useState<boolean>(false);
    const [isChatMuted, setIsChatMuted] = useState<boolean>(false);
    return (
        <div className={`flex-none w-80 border-l ease-out h-screen max-h-screen flex flex-col`}>
            <div className="h-16 border-b flex items-center justify-center font-semibold text-lg ">
                Thông tin hội thoại
            </div>
            <div className="scrollbar-thin overflow-y-scroll flex-1">
                <div>
                    <div className="flex flex-col items-center pt-5 pb-4 px-4">
                        {
                            chatRoom?.avatar ? <Avatar
                                    src={chatRoom.avatar} alt="Avatar"/> :
                                <Avatar>{chatRoom?.name.charAt(0).toUpperCase()}</Avatar>
                        }
                        <div className="font-medium text-lg flex items-center ">
                            {chatRoom?.name}
                            <button
                                className="ml-2 rounded-full hover:bg-gray-300 bg-gray-100 p-1"
                            ><PencilLine size={15}/></button>
                        </div>
                        <div className={`flex justify-center w-full py-4`}>
                            <div className="flex flex-col items-center gap-y-2 h-[84px] w-[78px]">
                                <div
                                    onClick={() => setIsChatMuted(!isChatMuted)}
                                    className={`rounded-full ${isChatPinned ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-200 hover:bg-gray-300'} w-8 h-8 inline-flex items-center justify-center cursor-pointer`}>
                                    <Bell isOn={!isChatMuted} className={isChatMuted ? 'text-blue-600' : ''}/>
                                </div>
                                <div className="text-xs text-center ">{isChatMuted ? 'Bật' : 'Tắt'} thông<br/> báo</div>
                            </div>
                            <div className="flex flex-col items-center gap-y-2 h-[84px] w-[78px]">
                                <div
                                    onClick={() => setIsChatPinned(!isChatPinned)}
                                    className={`rounded-full ${isChatPinned ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-200 hover:bg-gray-300'} w-8 h-8 inline-flex items-center justify-center cursor-pointer`}>
                                    <Pin className={isChatPinned ? 'text-blue-600' : ''} isOn={!isChatPinned}/>
                                </div>
                                <div className="text-xs text-center ">{isChatPinned ? 'Bỏ ghim' : 'Ghim'} hội<br/> thoại</div>
                            </div>
                            {
                                chatRoom?.group ? (
                                    <React.Fragment>
                                        <div className="flex flex-col gap-y-2 items-center h-[84px] w-[78px]">
                                            <div
                                                className="rounded-full bg-gray-200 w-8 h-8 inline-flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                                                <GroupPlus height={18} width={18}/>
                                            </div>
                                            <div className="text-xs text-center ">Thêm <br/> thành viên</div>
                                        </div>
                                        <div className="flex flex-col gap-y-2 items-center h-[84px] w-[78px]">
                                            <div
                                                className="rounded-full bg-gray-200 w-8 h-8 inline-flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                                                <Settings/>
                                            </div>
                                            <div className="text-xs text-center ">Quản lý<br/> nhóm</div>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <div className="flex flex-col gap-y-2 items-center h-[84px] w-[78px]">
                                        <div
                                            className="rounded-full bg-gray-200 w-8 h-8 inline-flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                                            <GroupPlus/>
                                        </div>
                                        <div className="text-xs text-center ">Tạo nhóm<br/> trò chuyện</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="h-2 bg-gray-100"/>
                    {/* Start: Setting 1 */}
                    <div>
                        <div>
                            <div
                                className="inline-flex gap-x-2 w-full px-4 items-center hover:bg-gray-50 cursor-pointer h-12">
                                <UserGroup height={20} weight={20} strokeWidth={1.5}/>
                                Nhóm chung
                            </div>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-100"/>
                    {/* End: Setting 1 */}

                    {/* Start: Video/Image */}
                    <div>
                        <div className="inline-flex justify-between w-full py-3 px-4 cursor-pointer">
                            <div className="font-medium ">Ảnh/Video</div>
                            <div><SortDown/></div>
                        </div>
                        <div className="min-h-24 grid grid-cols-4 gap-1 px-4 pb-3">
                            {
                                Array.from({length: 4}).map((_, index: number) => (
                                    <React.Fragment key={"image-video-" + index}>
                                        <div className="w-full aspect-square">
                                            <img
                                                className="object-cover h-full w-full rounded-md border"
                                                src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/06/the-20-cutest-anime-children-of-all-time-ranked.jpg"
                                                alt="Image"
                                            />
                                        </div>
                                        <div className="w-full aspect-square">
                                            <img
                                                className="object-cover h-full w-full rounded-md border"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO3MRxspW_MOmUNZZ3caFItEgC73hryVV3mQ&s"
                                                alt="Image"
                                            />
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className="pb-3 px-4">
                            <button className="w-full bg-gray-100 hover:bg-gray-200 rounded h-8 font-medium">Xem
                                tất cả
                            </button>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-100"/>
                    {/* End: Video/Image */}

                    {/* Start: Link */}
                    <div>
                        <div className="inline-flex justify-between w-full py-3 px-4 cursor-pointer">
                            <div className="font-medium ">Link</div>
                            <div><SortDown/></div>
                        </div>
                        <div className="min-h-24 flex flex-col gap-1 pb-3">
                            {
                                Array.from({length: 3}).map((_, index: number) => (
                                    <React.Fragment key={"link-" + index}>
                                        <div
                                            className="inline-flex gap-x-2 cursor-pointer hover:bg-gray-200 px-4 h-16 items-center">
                                            <div
                                                className="w-11 h-11 rounded border border-gray-300 flex items-center justify-center bg-gray-200">
                                                <Link/>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-medium">Tiêu đề đường dẫn</div>
                                                <div className="text-blue-600 text-xs">docs.google.com</div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className="pb-3 px-4">
                            <button className="w-full bg-gray-100 hover:bg-gray-200 rounded h-8 font-medium">Xem
                                tất cả
                            </button>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-100"/>
                    {/* End: Link */}

                    {/* Start: Setting 2 */}
                    <div>
                        <div className="inline-flex justify-between w-full py-3 px-4 cursor-pointer">
                            <div className="font-medium ">Thiết lập bảo mật</div>
                            <div><SortDown/></div>
                        </div>
                        <div className="min-h-24">
                            <div
                                className="inline-flex gap-x-2 w-full px-4 items-center hover:bg-gray-50 cursor-pointer h-12">
                                <Eye/>
                                Ẩn trò chuyện
                            </div>
                            <div
                                className="text-red-600 inline-flex gap-x-2 w-full px-4 items-center hover:bg-gray-50 cursor-pointer h-12">
                                <Trash strokeWidth={2} className="text-red-600"/>
                                Xóa lịch sử trò chuyện
                            </div>
                            {
                                chatRoom?.group && (
                                    <div
                                        className="text-red-600 inline-flex gap-x-2 w-full px-4 items-center hover:bg-gray-50 cursor-pointer h-12">
                                        <LogOut strokeWidth={2}/>
                                        Rời nhóm
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {/* End: Setting 2 */}
                </div>
            </div>
        </div>
    );
};

export default ChatInfo;
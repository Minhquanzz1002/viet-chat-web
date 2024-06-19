import {useState} from 'react';
import {GroupPlus, PanelRight, Search, Video} from "../../components/Icons";

const ChatView = () => {
    const [hidden, setHidden] = useState<boolean>(false);
    return (
        <div className="flex w-full">
            <div className="flex-1">
                <div className="h-16 border-b px-4 flex flex-row items-center justify-between">
                    <div className="inline-flex">
                        <div>avatar</div>
                        <div className="flex flex-col">
                            <div>ten</div>
                            <div>ten</div>
                        </div>
                    </div>

                    <div className="inline-flex gap-x-1">
                        <button className="w-8 h-8 hover:bg-gray-200 rounded flex justify-center items-center">
                            <GroupPlus height={22} width={22}/>
                        </button>
                        <button className="w-8 h-8 hover:bg-gray-200 rounded flex justify-center items-center">
                            <Search/>
                        </button>
                        <button className="w-8 h-8 hover:bg-gray-200 rounded flex justify-center items-center">
                            <Video/>
                        </button>
                        <button onClick={() => setHidden(!hidden)}
                                className={`${hidden ? 'hover:bg-gray-200' : 'bg-blue-200'} w-8 h-8 rounded flex justify-center items-center`}>
                            <PanelRight expand={!hidden}/>
                        </button>
                    </div>
                </div>
                <div className="bg-[#EEF0F1]">

                </div>
            </div>
            <div className={`flex-none w-80 border-l ease-out ${hidden && 'hidden'}`}>
                <div className="h-16 border-b flex items-center justify-center font-semibold text-lg">
                    Thông tin hội thoại
                </div>
            </div>
        </div>
    );
};

export default ChatView;
import React, {ReactElement, useState} from "react";
import ChatMenu from "../menu/ChatMenu.tsx";
import ContactMenu from "../menu/ContactMenu.tsx";
import Searchbar from "../searchbar";
import TodoMenu from "../menu/TodoMenu.tsx";

import {AddressBook, CommentDots, Gear, SquareCheck} from "../../../components/Icons";
import useTabSelected from "../../../hooks/useTabSelected.ts";
import MenuModal from "../../../components/Modals/MenuModal.tsx";
import useSearch from "../../../hooks/useSearch.ts";

interface Tab {
    title: string;
    icon: ReactElement;
    component: ReactElement;
}

const tabs: Tab[] = [
    {
        title: "Tin nhắn",
        icon: <CommentDots/>,
        component: <ChatMenu/>
    },
    {
        title: "Danh bạ",
        icon: <AddressBook/>,
        component: <ContactMenu/>
    },
    {
        title: "To-Do",
        icon: <SquareCheck/>,
        component: <TodoMenu/>
    }
];
const Sidebar = () => {
    const {setTabSelected} = useTabSelected();
    const {isOpenSearchMenu} = useSearch();
    const [activeTab, setActiveTab] = useState<number>(0);


    const onClickTab = (index: number) => {
        setActiveTab(index);
        if (index === 0) {
            setTabSelected(prevState => ({
                ...prevState,
                chat: {
                    ...prevState.chat,
                    isSelected: true
                },
                contact: {
                    ...prevState.contact,
                    isSelected: false,
                    tabId: 0,
                }
            }));
        }
        if (index === 1) {
            setTabSelected(prevState => ({
                ...prevState,
                chat: {
                    ...prevState.chat,
                    isSelected: false
                },
                contact: {
                    ...prevState.contact,
                    isSelected: true,
                    tabId: 0,
                }
            }));
        }
    }

    return (
        <nav className="flex flex-row">
            <div className="h-screen w-16 bg-[#0091FF] flex flex-col justify-between">
                {/* Start: Sidebar top */}
                <div>
                    <div className="flex justify-center mt-8 my-5 relative">
                        <MenuModal/>
                    </div>
                    {
                        tabs.map((tab: Tab, index: number) => (
                            <div key={index}
                                 title={tab.title}
                                 className={`aspect-square flex items-center justify-center cursor-pointer ${activeTab === index ? 'bg-[#006edc]' : 'hover:bg-[#0082E5]'}`}
                                 onClick={() => onClickTab(index)}>
                                {
                                    React.cloneElement(tab.icon, {type: activeTab === index && "solid"})
                                }
                            </div>
                        ))
                    }
                </div>
                {/* End: Sidebar top */}

                {/* Start: Sidebar bottom */}
                <div>
                    <div className={`aspect-square flex items-center justify-center cursor-pointer hover:bg-[#0082E5]`} title="Cài đặt">
                        <Gear/>
                    </div>
                </div>
                {/* End: Sidebar bottom */}
            </div>

            <div className="h-screen w-80 max-w-80 bg-white flex flex-col border-r">
                <Searchbar/>
                {
                    isOpenSearchMenu ? (
                        <div className="">
                            <div className="px-4">
                                Sắp ra mắt
                            </div>
                        </div>
                    ) : (tabs[activeTab].component)
                }
            </div>

        </nav>
    );
};

export default Sidebar;
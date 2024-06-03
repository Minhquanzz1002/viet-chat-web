import {ReactElement, useState} from "react";
import ChatMenu from "../menu/ChatMenu.tsx";
import ContactMenu from "../menu/ContactMenu.tsx";
import Searchbar from "../searchbar";
import TodoMenu from "../menu/TodoMenu.tsx";

interface Tab {
    icon: string,
    activeIcon: string,
    component: ReactElement
}

const tabs : Tab[] = [
    {
        icon: '/message-outline.png',
        activeIcon: '/message.png',
        component: <ChatMenu/>
    },
    {
        icon: '/contact-book-outline.png',
        activeIcon: '/contact-selected.png',
        component: <ContactMenu/>
    },
    {
        icon: '/todo-outline.png',
        activeIcon: '/todo-selected.png',
        component: <TodoMenu/>
    }
];
const Sidebar = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <nav className="flex flex-row">
            <div className="h-screen w-16 bg-[#0091FF] flex flex-col justify-between">
                {/* Start: Sidebar top */}
                <div className="">
                    <div>
                        avatar
                    </div>
                    {
                        tabs.map((tab: Tab, index: number) => (
                            <div key={index} className={`aspect-square flex items-center justify-center cursor-pointer ${activeTab === index ? 'bg-[#006edc]' : 'hover:bg-[#0082E5]'}`} onClick={() => setActiveTab(index)}>
                                <img src={index === activeTab ? tab.activeIcon : tab.icon} alt="Tab" className="w-6"/>
                            </div> 
                        ))
                    }
                </div>
                {/* End: Sidebar top */}

                {/* Start: Sidebar bottom */}
                <div>a</div>
                {/* End: Sidebar bottom */}
            </div>

            <div className="w-80 bg-white border-r">
                <Searchbar/>
                {tabs[activeTab].component}
            </div>

        </nav>
    );
};

export default Sidebar;
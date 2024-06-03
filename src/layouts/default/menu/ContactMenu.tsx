import {Handshake, UserRoundPlus, Users} from "lucide-react";
import {ReactElement, useState} from "react";
import useTabSelected from "../../../hooks/useTabSelected.ts";

interface Tab {
    icon: ReactElement;
    label: string;
}

const tabs : Tab[] = [
    {
        icon: <Handshake />,
        label: 'Danh sách bạn bè'
    },
    {
        icon: <Users />,
        label: 'Danh sách nhóm'
    },
    {
        icon: <UserRoundPlus />,
        label: 'Lời mời kết bạn'
    }
]

const ContactMenu = () => {
    const {setTabSelected} = useTabSelected();
    const [activeTab, setActiveTab] = useState<number>(0);

    const onChangeTab = (index: number) => {
        setActiveTab(index);
        setTabSelected({type: "CONTACT", id: index})
    }

    return (
        <div className="flex flex-col">
            {
                tabs.map((tab: Tab, index: number) => (
                    <div key={"contact-" + index} className={`flex flex-row justify-start items-center cursor-pointer px-4 h-14 ${activeTab === index ? 'bg-[#E5EFFF]' : 'hover:bg-[#F3F5F6]'}`} onClick={() => onChangeTab(index)}>
                        {tab.icon}
                        <div className="px-4 font-semibold tracking-wide">{tab.label}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default ContactMenu;
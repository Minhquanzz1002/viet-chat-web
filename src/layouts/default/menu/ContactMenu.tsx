import {ReactElement} from "react";
import useTabSelected from "../../../hooks/useTabSelected.ts";
import {UserGroup, UserList, UserPlus} from "../../../components/Icons";

interface Tab {
    icon: ReactElement;
    label: string;
}

const tabs : Tab[] = [
    {
        icon: <UserList />,
        label: 'Danh sách bạn bè'
    },
    {
        icon: <UserGroup />,
        label: 'Danh sách nhóm'
    },
    {
        icon: <UserPlus />,
        label: 'Lời mời kết bạn'
    }
]

const ContactMenu = () => {
    const {setTabSelected, tabSelected} = useTabSelected();

    const onChangeTab = (index: number) => {
        setTabSelected(prevState => ({
            chat: {
                ...prevState.chat,
                isSelected: false
            },
            contact: {
                isSelected: true,
                tabId: index,
            }
        }));
    }

    return (
        <div className="flex flex-col">
            {
                tabs.map((tab: Tab, index: number) => (
                    <div key={"contact-" + index} className={`flex flex-row justify-start items-center cursor-pointer px-4 h-14 ${tabSelected.contact.tabId === index ? 'bg-[#E5EFFF]' : 'hover:bg-[#F3F5F6]'}`} onClick={() => onChangeTab(index)}>
                        {tab.icon}
                        <div className="px-4 font-semibold tracking-wide">{tab.label}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default ContactMenu;
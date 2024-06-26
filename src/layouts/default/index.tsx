import Sidebar from "./sidebar";
import useTabSelected from "../../hooks/useTabSelected.ts";
import WelcomeView from "../../views/Welcome";
import ChatView from "../../views/Chat";
import FriendList from "../../views/Contact/Friends";
import GroupList from "../../views/Contact/Groups";
import FriendRequest from "../../views/Contact/FriendRequests";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";

const tabsComponents: Record<"CHAT" | "CONTACT", Record<string | number, React.ComponentType>> = {
    CHAT: {
        '': WelcomeView,
        default: ChatView
    },
    CONTACT: {
        0: FriendList,
        1: GroupList,
        2: FriendRequest
    }
}

const DefaultLayout = () => {
    const {profile} = useAuth();
    const {tabSelected} = useTabSelected();
    const [type, setType] = useState<"CHAT" | "CONTACT">("CHAT");
    const [tabId, setTabId] = useState<string | number>("");

    useEffect(() => {
        const {chat, contact} = tabSelected;
        if (chat.isSelected) {
            setType("CHAT");
            setTabId(chat.tabId);
        } else {
            setType("CONTACT");
            setTabId(contact.tabId);
        }
    }, [tabSelected]);

    const Component = tabsComponents[type]?.[tabId] || tabsComponents[type]?.default;

    useEffect(() => {
        document.title = "Viet Chat - " + profile?.firstName + " " + profile?.lastName;
    }, [profile]);

    return (
        <div className="h-screen w-screen max-w-full flex flex-nowrap flex-row">
            <Sidebar/>
            <Component/>
        </div>
    );
};

export default DefaultLayout;
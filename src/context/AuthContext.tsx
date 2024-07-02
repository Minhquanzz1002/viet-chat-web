import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {ChatRoom, UserProfile} from "../models";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import userApi from "../api/userApi.ts";
import Cookies from "js-cookie";
import {Friend} from "../models/profile.ts";
import {GroupDTO} from "../models/group.ts";
import {Message} from "../models/chat.ts";
import chatApi from "../api/chatApi.ts";
import useTabSelected from "../hooks/useTabSelected.ts";

type AuthContextType = {
    isLoading: boolean;
    token: string;
    profile: UserProfile | null;
    chatRooms: ChatRoom[];
    chatRoomSelected: ChatRoom | null;
    friends: Friend[] | null;
    requests: Friend[] | null;
    sentRequests: Friend[] | null;
    groups: GroupDTO[] | null;
    friendsByLetter: FriendsByLetter;
    messages: Message[];
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
    setChatRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>;
    setChatRoomSelected: React.Dispatch<React.SetStateAction<ChatRoom | null>>;
    setFriends: React.Dispatch<React.SetStateAction<Friend[] | null>>;
    setRequests: React.Dispatch<React.SetStateAction<Friend[] | null>>;
    setSentRequests: React.Dispatch<React.SetStateAction<Friend[] | null>>;
    setGroups: React.Dispatch<React.SetStateAction<GroupDTO[] | null>>;
    setFriendsByLetter: React.Dispatch<React.SetStateAction<FriendsByLetter>>;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    logout: () => void;
    queryClient: QueryClient;
}

export interface FriendsByLetter {
    [letter: string]: Friend[];
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
    children: ReactNode;
}

const AuthProvider = ({children}: Props) => {
    const {tabSelected} = useTabSelected();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string>("");
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatRoomSelected, setChatRoomSelected] = useState<ChatRoom | null>(null);
    const [friends, setFriends] = useState<Friend[] | null>(null);
    const [requests, setRequests] = useState<Friend[] | null>(null);
    const [sentRequests, setSentRequests] = useState<Friend[] | null>(null);
    const [groups, setGroups] = useState<GroupDTO[] | null>(null);
    const [friendsByLetter, setFriendsByLetter] = useState<FriendsByLetter>({});
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (friends) {
            const sortedFriends = friends.sort((a, b) => {
                if (a.profile.firstName.charAt(0) < b.profile.firstName.charAt(0)) return -1;
                if (a.profile.firstName.charAt(0) > b.profile.firstName.charAt(0)) return 1;
                return 0;
            });
            const letters: FriendsByLetter = {};
            sortedFriends.forEach((friend) => {
                const firstLetter = friend.profile.firstName.charAt(0).toUpperCase();
                if (!letters[firstLetter]) {
                    letters[firstLetter] = [];
                }
                letters[firstLetter].push(friend);
            });
            setFriendsByLetter(letters);
        }
    }, [friends]);


    useEffect(() => {
        const savedToken = Cookies.get("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token !== "" && profile !== null) {
            setIsLoading(false);
        }
    }, [token, profile, chatRooms]);


    useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            if (token !== '') {
                return await userApi.profile(token).then((response) => {
                    setProfile(response)
                    return response;
                })
            }
        },
        enabled: token !== '',
    });

    useQuery({
        queryKey: ['chatRooms'],
        queryFn: async () => {
            if (token !== '') {
                return await userApi.getAllChatRooms(token).then((response) => {
                    setChatRooms(response)
                    return response;
                })
            }
        },
        enabled: token !== '',
    });

    useQuery({
        queryKey: ['friends'],
        queryFn: async () => {
            if (token !== '') {
                return await userApi.getAllFriends(token, "friend").then((response) => {
                    setFriends(response);
                    return response;
                })
            }
        },
        enabled: token !== '',
    });

    useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            if (token !== '') {
                return await userApi.getAllFriends(token, "request").then((response) => {
                    setRequests(response);
                    return response;
                })
            }
        },
        enabled: token !== '',
    });

    useQuery({
        queryKey: ['sends'],
        queryFn: async () => {
            if (token !== '') {
                return await userApi.getAllFriends(token, "sent").then((response) => {
                    setSentRequests(response);
                    return response;
                })
            }
        },
        enabled: token !== '',
    });

    useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            if (token !== '') {
                return await userApi.getAllGroups(token).then((response) => {
                    setGroups(response);
                    return response;
                })
            }
        },
        enabled: token !== '',
    });

    const logout = () => {
        Cookies.remove('token');
        setToken("");
        setFriends(null);
        setSentRequests(null);
        setRequests(null);
        setProfile(null);
        setChatRooms([]);
        setChatRoomSelected(null);
    }

    useQuery({
        queryKey: ['messages', tabSelected.chat.tabId],
        queryFn: async () => {
            if (token !== '') {
                return await chatApi.getMessages(token, tabSelected.chat.tabId).then((response) => {
                    setMessages(response.content);
                    return response;
                })
            }
        },
        enabled: token !== '' && tabSelected.chat.tabId !== "",
    });

    return (
        <AuthContext.Provider value={{messages, queryClient, token, setToken, profile, setProfile, chatRooms, setChatRooms, chatRoomSelected, setChatRoomSelected, friends, setFriends, requests, setRequests, isLoading, setIsLoading, sentRequests, setSentRequests, logout, groups, setGroups, friendsByLetter, setFriendsByLetter, setMessages}}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
export {AuthContext}
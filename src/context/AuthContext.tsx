import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {ChatRoom, UserProfile} from "../models";
import {useQuery} from "@tanstack/react-query";
import userApi from "../api/userApi.ts";
import Cookies from "js-cookie";
import {Friend} from "../models/profile.ts";
import {GroupDTO} from "../models/group.ts";

type AuthContextType = {
    isLoading: boolean;
    token: string;
    profile: UserProfile | null;
    chatRooms: ChatRoom[] | null;
    chatRoomSelected: ChatRoom | null;
    friends: Friend[] | null;
    requests: Friend[] | null;
    sentRequests: Friend[] | null;
    groups: GroupDTO[] | null;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
    setChatRooms: React.Dispatch<React.SetStateAction<ChatRoom[] | null>>;
    setChatRoomSelected: React.Dispatch<React.SetStateAction<ChatRoom | null>>;
    setFriends: React.Dispatch<React.SetStateAction<Friend[] | null>>;
    setRequests: React.Dispatch<React.SetStateAction<Friend[] | null>>;
    setSentRequests: React.Dispatch<React.SetStateAction<Friend[] | null>>;
    setGroups: React.Dispatch<React.SetStateAction<GroupDTO[] | null>>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
    children: ReactNode;
}

const AuthProvider = ({children}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string>("");
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [chatRooms, setChatRooms] = useState<ChatRoom[] | null>(null);
    const [chatRoomSelected, setChatRoomSelected] = useState<ChatRoom | null>(null);
    const [friends, setFriends] = useState<Friend[] | null>(null);
    const [requests, setRequests] = useState<Friend[] | null>(null);
    const [sentRequests, setSentRequests] = useState<Friend[] | null>(null);
    const [groups, setGroups] = useState<GroupDTO[] | null>(null);

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
        setChatRooms(null);
        setChatRoomSelected(null);
    }

    return (
        <AuthContext.Provider value={{token, setToken, profile, setProfile, chatRooms, setChatRooms, chatRoomSelected, setChatRoomSelected, friends, setFriends, requests, setRequests, isLoading, setIsLoading, sentRequests, setSentRequests, logout, groups, setGroups}}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
export {AuthContext}
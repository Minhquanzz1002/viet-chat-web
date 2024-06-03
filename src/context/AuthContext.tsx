import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {UserProfile} from "../models";
import {useQuery} from "@tanstack/react-query";
import userApi from "../api/userApi.ts";
import Cookies from "js-cookie";

type AuthContextType = {
    token: string;
    profile: UserProfile | null;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
    children: ReactNode;
}

const AuthProvider = ({children}: Props) => {


    const [token, setToken] = useState<string>("");
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const savedToken = Cookies.get("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);


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
    })

    return (
        <AuthContext.Provider value={{token, setToken, profile, setProfile}}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
export {AuthContext}
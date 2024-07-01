import {createContext, ReactNode, useEffect, useState} from 'react';
import {Client, IFrame} from "@stomp/stompjs";
import {useAuth} from "../hooks/useAuth.ts";
import SockJS from "sockjs-client";
import {Message} from "../models/chat.ts";
import {LastMessage} from "../models";

type WebsocketContextType = {
    client: Client | null;
}

const WebsocketContext = createContext<WebsocketContextType>({} as WebsocketContextType);

interface Props {
    children: ReactNode;
}

const WebsocketProvider = ({children}: Props) => {
    const {token, chatRooms, setChatRooms} = useAuth();
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        if (token !== '') {
            const stompClient = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8080/api/ws'),
                connectHeaders: {
                    Authorization: `Bearer ${token}`
                },
                reconnectDelay: 5000,
                onConnect: (frame) => {
                    console.log(frame + '');
                    chatRooms?.map((chatRoom) => {
                        stompClient.subscribe("/chatroom/" + chatRoom.id, onMessageReceived)
                    });
                },
                onStompError: (frame) => {
                    console.log(frame + '');
                },
                onDisconnect: (frame) => {
                    console.log(frame + '')
                }
            });
            stompClient.activate();
            setClient(stompClient);
            return () => {
                if (stompClient) {
                    stompClient.deactivate();
                }
            }
        }
    }, [token]);

    const onMessageReceived = (payload: IFrame) => {
        try {
            const destination = payload.headers.destination;
            const chatRoomId = destination.split("/").pop();
            const message: Message = JSON.parse(payload.body);
            const lastMessage: LastMessage = {
                messageId: message.messageId,
                content: message.content,
                sender: message.sender,
                createdAt: message.createdAt
            }
            if (chatRooms) {
                setChatRooms((prevState) => {
                    return prevState?.map(chatRoom => {
                        if (chatRoom.id === chatRoomId) {
                            return {
                                ...chatRoom,
                                lastMessage
                            };
                        }
                        return chatRoom;
                    });
                });
            }
        } catch (error) {
            console.error('Error parsing message body:', error);
        }
    }

    return (
        <WebsocketContext.Provider value={{client}}>
            {children}
        </WebsocketContext.Provider>
    );
};
export default WebsocketProvider;
export {WebsocketContext}
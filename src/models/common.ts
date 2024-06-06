export interface ErrorResponse {
    timestamp: Date;
    status: number;
    error: string;
    detail: string;
}
export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    bio: string | null;
    thumbnailAvatar: string | null;
    coverImage: string | null;
    gender: boolean;
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ChatRoom {
    id: string;
    lastMessage: LastMessage;
    name: string;
    avatar: string | null;
    groupId: string | null;
    status: string;
    lastSeenMessageId: string | null;
    isGroup: boolean;
}

export interface LastMessage {
    messageId: string;
    content: string;
    sender: Sender;
    createdAt: string;
}

export interface Sender {
    id: string;
    firstName: string;
    lastName: string;
    thumbnailAvatar: string | null;
    gender: boolean;
}
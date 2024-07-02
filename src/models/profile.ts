export interface UserInfoDTO {
    firstName: string;
    lastName: string;
    gender: boolean;
}
export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
    thumbnailAvatar: string;
    coverImage: string;
    gender: boolean;
    birthday: string;
    createdAt: string;
    updatedAt: string;
}

export enum FriendStatus {
    BLOCK = 'BLOCK',
    FRIEND_REQUEST = 'FRIEND_REQUEST',
    STRANGER = 'STRANGER',
    PENDING = 'PENDING',
    BLOCKED = 'BLOCKED',
    FRIEND = 'FRIEND'
}

export interface Friend {
    profile: Profile;
    displayName: string;
    status: FriendStatus;
    chatId: string;
    isBestFriend: boolean;
}

export interface OtherUserInfoDTO {
    id: string;
    phone: string;
    displayName: string;
    status: FriendStatus;
    firstName: string;
    lastName: string;
    bio: string;
    thumbnailAvatar: string;
    coverImage: string;
    gender: boolean;
    birthday: string;
    createdAt: string;
    updatedAt: string;
}
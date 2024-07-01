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

export interface Friend {
    profile: Profile;
    displayName: string;
    status: "BLOCK" | "FRIEND_REQUEST" | "STRANGER" | "PENDING" | "BLOCKED" | "FRIEND";
    chatId: string;
    isBestFriend: boolean;
}

export interface OtherUserInfoDTO {
    id: string;
    phone: string;
    displayName: string;
    status: "BLOCK" | "FRIEND_REQUEST" | "STRANGER" | "PENDING" | "BLOCKED" | "FRIEND";
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
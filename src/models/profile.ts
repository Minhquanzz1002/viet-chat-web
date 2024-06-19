export interface UserInfoDTO {
    firstName: string;
    lastName: string;
    gender: boolean;
}
interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    bio: string | null;
    thumbnailAvatar: string | null;
    coverImage: string | null;
    gender: boolean;
    birthday: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Friend {
    profile: Profile;
    displayName: string;
    status: "FRIEND" | "FRIEND_REQUEST" | "PENDING";
    chatId: string;
    isBestFriend: boolean;
}
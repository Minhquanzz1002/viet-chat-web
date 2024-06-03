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
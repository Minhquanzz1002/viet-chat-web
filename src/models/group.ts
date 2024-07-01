import {Profile} from "./profile.ts";

export type GroupDTO = {
    id: string
    name: string;
    thumbnailAvatar: string;
    members: GroupMember[];
    chatId: string;
    createdAt: string;
    updatedAt: string;
}

interface GroupMember {
    profile: Profile;
    role: 'GROUP_LEADER' | 'DEPUTY_GROUP_LEADER' | 'MEMBER';
    joinMethod: string;
}

export interface GroupRequestCreateDTO {
    name: string;
    thumbnailAvatar: string;
    members: string[];
}
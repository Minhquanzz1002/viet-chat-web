import {FriendStatus, Profile} from "./profile.ts";

export type GroupDTO = {
    id: string
    name: string;
    thumbnailAvatar: string;
    members: GroupMember[];
    chatId: string;
    createdAt: string;
    updatedAt: string;
}

export enum GroupMemberRole {
    GROUP_LEADER = 'GROUP_LEADER',
    DEPUTY_GROUP_LEADER = 'DEPUTY_GROUP_LEADER',
    MEMBER = 'MEMBER'
}

interface GroupMember {
    profile: Profile;
    role: GroupMemberRole;
    joinMethod: string;
}

export interface GroupMemberDTO extends GroupMember {
    status: FriendStatus;
    displayName: string;
}

export interface GroupRequestCreateDTO {
    name: string;
    thumbnailAvatar: string;
    members: string[];
}
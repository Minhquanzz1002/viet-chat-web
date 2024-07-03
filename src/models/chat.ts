import {GroupDTO} from "./group.ts";
import {Profile} from "./profile.ts";

export interface Chat {
    id: string;
    firstName: string;
    lastName: string;
    thumbnailAvatar: string | null;
    gender: boolean;
}

export interface MessagePageable {
    content: Message[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface Attachment {
    type: 'IMAGE' | 'VIDEO' | 'FILE';
    url: string;
    filename: string;
    size: number;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Message {
    messageId: string;
    replyMessageId: string | null;
    type: string;
    sender: Sender;
    content: string;
    attachments: Attachment[] | null;
    reactions: Reaction[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Sender {
    id: string;
    firstName: string;
    lastName: string;
    thumbnailAvatar: string;
    gender: boolean;
}

export interface Reaction {
    user: Sender;
    type: string;
    quantity: number;
}

export interface ChatDTO {
    id: string;
    group: GroupDTO;
    members: Profile[]
    name: string;
    avatar: string;
}

export interface MessageRequestDTO {
    replyMessageId?: string;
    content?: string;
    attachments?: Attachment[];
}
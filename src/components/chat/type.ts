export type MessageTypes = 'TEXT' | 'VIDEO' | 'IMAGE';

export type ChatItem = {
    name: string;
    username: string;
    id: number;
    photoUrl: string;
};

export type Chatlist = {
    name: string;
    id: number;
    items?: Array<ChatItem>;
    photoUrl: string;
    unread: number;
    conversationId:number
};

export type ChatConversation = {
    id: number;
    type: MessageTypes;
    content: string;
    createdAt?: Date;
    photoUrl?: string;
    mediaUrl?: string;
    position: 'RIGHT' | 'LEFT';
};

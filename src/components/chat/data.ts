import { ChatConversation } from './type';

export const chatList = [
    {
        id: 1,
        name: 'user 01',
        photoUrl: '',
        unread: 0,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 02',
        photoUrl: '',
        unread: 5,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 03',
        photoUrl: '',
        unread: 0,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 04',
        photoUrl: '',
        unread: 2,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 05',
        photoUrl: '',
        unread: 10,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 06',
        photoUrl: '',
        unread: 0,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 07',
        photoUrl: '',
        unread: 0,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 08',
        photoUrl: '',
        unread: 0,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 09',
        photoUrl: '',
        unread: 0,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    },
    {
        id: 1,
        name: 'user 10',
        photoUrl: '',
        unread: 28,
        date: new Date(2022, 3, 18),
        message: 'hello there',
        room: '25 B'
    }
];

export const chatConversations: Array<ChatConversation> = [
    {
        id: 0,
        type: 'TEXT',
        content: 'I Am Looking For A Business Telephone .',
        position: 'LEFT',
        createdAt: new Date()
    },
    {
        id: 1,
        type: 'TEXT',
        content:
            'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industrys Standard Dummy Text ',
        position: 'RIGHT',
        createdAt: new Date()
    },
    {
        id: 2,
        type: 'TEXT',
        content: 'I Am Looking For A Business Telephone .',
        position: 'LEFT',
        createdAt: new Date()
    },
    {
        id: 3,
        type: 'TEXT',
        content:
            'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industrys Standard Dummy Text ',
        position: 'LEFT',
        createdAt: new Date()
    }
];

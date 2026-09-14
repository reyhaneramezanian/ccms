import Chat from 'src/components/chat';
import { Chatlist, ChatConversation } from 'src/components/chat/type';
import { setChatKey } from 'src/redux/actions/actions';
import { useGetUser } from 'src/auth/UserProvider';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    useMessage_GetUserMessagesQuery,
    useInfiniteMessage_GetConversationQuery,
    SortEnumType
} from 'src/graphql/generated';
import { useRouter } from 'next/router';

export default function Messages() {
    const [state, setState] = useState({ activeConversation: undefined });
    const user = useGetUser();
    const {query:{uid}} = useRouter()
    const dispatch = useDispatch();

    // const fetcherId = !!uid

    // const {data:dataMessage} = useMessage_GetUserMessagesQuery({
    //     skip:0,
    //     take:50,
    //     where:{
    //         and:[
    //             {user:{healer:{userId:{eq:Number(uid)}}}},
    //             {user:{client:{userId:{eq:Number(user?.id)}}}}
    //         ]
    //     }
    // },{
    //     enabled : !!Number(uid)
    // });

    // console.log('dataMessage',dataMessage)

    const input = {
        conversationId: state.activeConversation?.conversationId,
        skip: 0,
        take: 50,
        order: { id: SortEnumType.Desc },
    };

    const key = ['message_getConversation.infinite', input, user];
    const strKey = JSON.stringify(key);

    useEffect(() => {
        dispatch(setChatKey(JSON.parse(strKey)));
    }, [strKey]);

    const { data: listData } = useMessage_GetUserMessagesQuery();
    const { data: messages, fetchNextPage } = useInfiniteMessage_GetConversationQuery(input, {
        getNextPageParam: (lastPage, pages) => ({ skip: pages.length * 50 }),
        enabled: !!state.activeConversation?.conversationId
    });

    const list: Chatlist[] = listData?.message_getUserMessages?.result?.items
        ?.map?.((item) => {
            return {
                id: item?.user?.id,
                name: item?.user?.name,
                unread: item?.unreadCount,
                photoUrl: item?.user?.imageAddress,
                conversationId: item?.conversationId,
            };
        })
        .filter(Boolean);

    const conversations: ChatConversation[] = messages?.pages
        ?.map?.((page) => page.message_getConversation?.result?.items)
        .flat?.()
        .reverse?.()
        .map?.((item) => ({
            id: item.conversationId,
            content: item.text,
            type: 'TEXT',
            position: item.senderId === user?.id ? 'LEFT' : 'RIGHT',
            createdAt: new Date(item.createdAt),
        }));

        
    return (
        <Chat
            state={state}
            setState={setState}
            list={list}
            conversations={conversations}
            onNextPage={fetchNextPage}
        />
    );
}

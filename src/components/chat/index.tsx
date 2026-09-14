// import Logo from 'src/assets/logo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { HTMLAttributes, useEffect, useState, useRef } from 'react';
import { Chatlist, ChatConversation } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUser } from 'src/auth/UserProvider';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import {
    useMessage_CreateMessageMutation,
} from 'src/graphql/generated';
import {
    ChatConversationContainer,
    ChatInputContainer,
    ChatInputWrapper,
    ChatItemFlex,
    ChatItemFlexContainer,
    ChatItemInnerContainer,
    ChatItemLastMessage,
    ChatItemName,
    ChatItemOuterContainer,
    ChatItemRoomName,
    ChatListContainer,
    ChatListUnreadCount,
    ChatSendIconContainer,
    EmptyChatList,
    MessageContainer,
    MessageSpace,
    MessagesWrapper,
    MessageText,
    NoConversationContainer,
    ProfilePictureContainer,
    StyledChatInput,
    StyledChatSendIcon
} from './styled';
import { ImageOrPlaceHolder } from '../shared/image-placeholder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
dayjs.extend(relativeTime);

export default function Chat({
    state = {},
    setState = () => { },
    list = [],
    conversations = [],
    onNextPage = () => { },
    readOnly = false
}: {
    state: any;
    setState: any;
    list: Chatlist[];
    conversations: ChatConversation[];
    onNextPage?: () => void;
    readOnly?: boolean;
}) {
    return (
        <div
            style={{
                height: 'calc(100vh - 230px)',
                display: 'flex',
                columnGap: '0',
                margin: '5px 0px',
            }}>
            <List list={list} state={state} setState={setState} />
            <Conversations
                state={state}
                setState={setState}
                conversations={conversations}
                nextPage={onNextPage}
                readOnly={readOnly}
            />
        </div>
    );
}

function List({ list = [], state, setState }: { list?: Array<Chatlist>; state; setState }) {
    const router = useRouter();
    const queryClient = useQueryClient();

    if (list.length === 0) return <EmptyChatList>No Conversation</EmptyChatList>;

    return (
        <ChatListContainer>
            {list.map((item, index) => (
                <ChatItemOuterContainer
                    active={state.activeConversation?.id === item.id}
                    key={index}
                    onClick={() => {
                        setState({ ...state, activeConversation: item });
                    }}>
                    <ChatItemInnerContainer active={state.activeConversation?.id === item.id}>
                        <ProfilePictureContainer>
                            <ImageOrPlaceHolder src={item.photoUrl} />
                            {item.unread > 0 && (
                                <ChatListUnreadCount>{item.unread}</ChatListUnreadCount>
                            )}
                        </ProfilePictureContainer>
                        <ChatItemFlexContainer>
                            <ChatItemFlex>
                                <ChatItemName active={String(state.activeConversation?.id === item.id)}>
                                    {item.name}
                                </ChatItemName>
                                <ArrowForwardIosIcon style={{marginRight:'10px',fontSize:'10px'}} />
                            </ChatItemFlex>
                        </ChatItemFlexContainer>
                    </ChatItemInnerContainer>
                </ChatItemOuterContainer>
            ))}
        </ChatListContainer>
    );
}

function Conversations({ state, setState, conversations, nextPage, readOnly }) {
    return (
        <ChatConversationContainer>
            {state.activeConversation ? (
                <Messages
                    conversations={conversations}
                    nextPage={nextPage}
                    setState={setState}
                    state={state}
                    readOnly={readOnly}
                />
            ) : (
                <NoConversation setState={setState} />
            )}
        </ChatConversationContainer>
    );
}

function Messages({
    conversations = [],
    nextPage,
    displayProfilePicture = true,
    state,
    setState,
    readOnly
}: {
    conversations: Array<ChatConversation>;
    nextPage: () => void;
    displayProfilePicture?: boolean;
    state;
    setState;
    readOnly?: boolean;
}) {
    const ref = useRef<any>();
    const chatKey = useSelector(({ chatKey }: any) => chatKey);
    const dispatch = useDispatch();
    const dataRef = useRef({ previousScroll: undefined, mustGetNextPage: false, value: 0 });
    const queryClient = useQueryClient();

    useEffect(() => {
        dataRef.current.previousScroll = undefined;
        dataRef.current.value = 0;
    }, [chatKey]);

    useEffect(() => {
        dataRef.current.mustGetNextPage = true;

        const div = ref.current;

        if (div) div.scrollTop = div.scrollHeight - dataRef.current.value;
        queryClient.refetchQueries('message_getUserMessages');

    }, [conversations.length]);

    return (
        <MessagesWrapper>
            {renderConversations()}
            {!readOnly && <ChatInput state={state} scrollToEnd={scrollToEnd} />}
        </MessagesWrapper>
    );

    function renderConversations() {
        return (
            <div style={{ overflow: 'auto' }} ref={ref} onScroll={paginate}>
                {conversations.map((item, index) => {
                    const isFromSender = item.position === 'RIGHT';

                    return (
                        <MessageContainer key={index}>
                            {isFromSender ? (
                                <MessageSpace />
                            ) : null}
                            <div style={{ display: 'grid', maxWidth: '50%' }}>
                                {getContent(item, isFromSender)}
                                <CompareDate date={item.createdAt} />
                            </div>
                        </MessageContainer>
                    );
                })}
            </div>
        );
    }

    function getContent(item: ChatConversation, isFromSender: boolean) {
        const content = (item.content || '').split(/(\[.*?\]\(.*?\))/).map((text, index) => {
            if (text.match(/\[.*?\]\(.*?\)/)) {
                let [, string, url] = text.match(/\[(.*?)\]\((.*?)\)/) || [];

                if (url.startsWith('www.')) url = url.replace('www.', 'http://www.');

                return (
                    <a href={url} target="_blank" key={index} rel="noopener noreferrer">
                        {string}
                    </a>
                );
            }

            return <span key={index}>{text}</span>;
        });

        return (
            <MessageText
                style={{
                    backgroundColor: isFromSender ? '#55A1FB' : 'rgb(231 240 252)',
                    color: isFromSender ? '#fff' : '#191A23',
                    marginBottom: '5px',
                    borderRadius: `${isFromSender ? 8 : 0}px ${isFromSender ? 0 : 8}px 8px 8px`,
                }}>
                {content}
            </MessageText>
        );
    }

    function scrollToEnd() {
        setTimeout(() => (ref.current.scrollTop = ref.current.scrollHeight), 100);
    }

    function paginate(e) {
        let { previousScroll } = dataRef.current;

        if (previousScroll === undefined) previousScroll = e.target.scrollHeight;

        let isGoingUp = previousScroll - e.target.scrollTop > 0;
        let isReachingToTop = e.target.scrollTop < 900;

        if (isGoingUp && isReachingToTop) {
            dataRef.current.value = e.target.scrollHeight - e.target.scrollTop;

            if (dataRef.current.mustGetNextPage) {
                dataRef.current.mustGetNextPage = false;

                nextPage?.();
            }
        }
    }
}

function ChatInput({ scrollToEnd, state }) {
    const [message, setMessage] = useState('');
    const key = useSelector(({ chatKey }: any) => chatKey);
    const queryClient = useQueryClient();
    const [string, input, { id }] = key;
    const { mutate: createMessage } = useMessage_CreateMessageMutation({
        onMutate: (variables) => {
            const allData: any = queryClient.getQueryData([string, input], { exact: false });
            const oldData = JSON.stringify(allData || {});

            allData?.pages?.[0]?.message_getConversation?.result?.items?.unshift?.({
                ...variables.messageInput,
                createdAt: new Date(),
                senderId: user?.id
            });

            queryClient.setQueryData([string, input], allData);

            return { oldData };
        },
        onError: (error, variables, context: any) => {
            console.log(error);

            queryClient.setQueryData(key, JSON.parse(context.oldData));
        }
    });

    const inputRef = useRef<any>();
    const dataRef = useRef([]);

    const dispatch = useDispatch();
    const user = useGetUser();

    dataRef.current = key;

    useEffect(() => {
        window.addEventListener('keydown', handleSendMessage);

        function handleSendMessage(e) {
            if (e.keyCode === 13 && document.activeElement === inputRef.current) {
                sendMessage();
            }
        }

        return () => window.removeEventListener('keydown', handleSendMessage);
    }, []);

    return (
        <ChatInputWrapper>
            <ChatInputContainer>
                {/* <StyledAttachmentIcon onClick={openUploadModal} /> */}
                <StyledChatInput
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write Your Messages"
                />
            </ChatInputContainer>
            <ChatSendIconContainer active={String(message !== '')} onClick={sendMessage}>
                <StyledChatSendIcon active={String(message !== '')} />
            </ChatSendIconContainer>
        </ChatInputWrapper>
    );

    function sendMessage() {
        setMessage((message) => {
            if (!message) return '';

            const [_, { conversationId }, { id }] = dataRef.current;

            createMessage({
                messageInput: {
                    // messageType: MessageType.Message,
                    conversationId: Number(conversationId) || null,
                    receiverId: Number(state?.activeConversation?.id) || undefined,
                    text: message
                }
            });

            scrollToEnd();

            inputRef.current.focus();

            return '';
        });
    }
}

function CompareDate({ date, ...props }: HTMLAttributes<HTMLDivElement> & { date: Date }) {
    const [time, setTime] = useState('');

    useEffect(() => {
        if (!date) return;

        updateTime(date);

        const interval = setInterval(() => updateTime(date), 20000);

        function updateTime(date) {
            setTime(dayjs(date).fromNow());
        }

        return () => clearInterval(interval);
    }, [date]);

    return <div {...props} style={{ marginLeft: '10px', fontSize: '11px' }}>{time === 'a few seconds ago' ? 'now' : time}</div>;
}

function NoConversation({ setState }) {
    useEffect(() => {
        openList();

        window.addEventListener('resize', openList);

        function openList() {
            if (window.innerWidth < 768) {
                setState((state) => {
                    if (state.isListActive) return state;

                    return { ...state, isListActive: true };
                });
            }
        }

        return () => window.removeEventListener('resize', openList);
    }, []);

    return <NoConversationContainer>Select a Chat Or Start A Messaging</NoConversationContainer>;
}

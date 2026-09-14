import styled from '@emotion/styled';
import ChatSendIcon from 'src/assets/icons/chat_send_icon';

export const ChatItemInnerContainer = styled.div(({ active }: { active?: boolean }) => ({
    cursor: 'pointer',
    transition: '0.4s',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    // margin: '0 10px',
    padding: '15px 0',
    borderBottom: active ? '' : '1px solid #fff'
}));

export const ChatItemOuterContainer = styled.li(({ active }: { active?: boolean }) => ({
    backgroundColor: active ? '#D5E8FF' : '',
    transition: '0.4s',
    '&:hover': {
        backgroundColor: active ? '#D5E8FF' : '#ccc'
    }
}));

export const ChatConversationContainer = styled.div({
    flex: '1',
    backgroundColor: '#fff',
    // borderRadius: '10px',
    padding: '10px'
});

export const NoConversationContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: '10px'
});

export const EmptyChatList = styled.div({
    backgroundColor: '#5293D3',
    height: '100%',
    width: '210px',
    // borderRadius: '10px',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#fff'
});

export const MessageContainer = styled.div({ display: 'flex' });

export const MessageText = styled.p({
    backgroundColor: 'white',
    padding: '5px 15px',
    margin: '10px'
});

export const MessageSpace = styled.div({ flex: '1' });

export const ChatSendIconContainer = styled.div(({ active }: { active: string }) => ({
    width: '50px',
    height: '40px',
    backgroundColor: active === 'true' ? '#3E205A' : '#fff',
    transition: '0.4s',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 3px #191A23',
    cursor: 'pointer'
}));

export const StyledChatInput = styled.input({
    flex: 1,
    border: 'none',
    outline: 'none'
});

export const ChatInputContainer = styled.div({
    display: 'flex',
    flex: 1,
    boxShadow: '0 0 3px #191A23',
    borderRadius: '8px',
    padding: '5px 10px',
    backgroundColor: '#fff',
    alignItems: 'center'
});

export const ChatInputWrapper = styled.div({
    display: 'flex',
    columnGap: '10px',
    padding: '10px',
    paddingBottom: 5,
    paddingTop: 15
});

export const StyledChatSendIcon = styled(ChatSendIcon)(({ active }: { active: string }) => ({
    width: '20px',
    height: '20px',
    '& path': {
        fill: active === 'true' ? '#fff' : '#35094F',
        transition: '0.4s'
    }
}));

export const MessagesWrapper = styled.div({
    display: 'grid',
    gridTemplateRows: '1fr auto',
    height: '100%',
    '@media (max-width: 768px)': {
        height: 'calc(100% - 80px)'
    }
});

export const ChatHeaderContainer = styled.div({});

export const ChatListContainer = styled.ul({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    backgroundColor: '#5293D3',
    height: '100%',
    width: '210px',
    // borderRadius: '10px',
    overflow: 'auto'
});

export const ChatItemName = styled.div(({ active }: { active: string }) => ({
    marginLeft:'10px',
    fontSize:'17px',
    color:active === 'true' ? '#3E205A':'#fff',
    fontWeight:active === 'true' ? 'bold':'normal'
}));
export const ChatItemLastMessage = styled.div({ color: '#7E7E7E', fontSize: '12px' });
export const ChatItemRoomName = styled.div({ color: '#7E7E7E' });
export const ChatItemFlex = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});
export const ChatItemFlexContainer = styled.div({ flex: 1, marginLeft: '2px' });

export const ProfilePictureContainer = styled.div({ position: 'relative' });

export const ChatListUnreadCount = styled.span({
    backgroundColor: '#3E205A',
    color: 'white',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    textAlign: 'center',
    borderRadius: '50%',
    lineHeight: '20px',
    position: 'absolute',
    right: 3,
    bottom: 3
});

export const StyledProfilePictureImage = styled.img(({ style }) => ({
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    margin: '0 5px',
    ...style
}));

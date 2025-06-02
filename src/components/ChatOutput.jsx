import styled, { keyframes } from 'styled-components';
import { FiThumbsUp, FiThumbsDown, FiCopy } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Spinner from '../ui/Spinner';
import TypewriterMessage from '../ui/TypewriterMessage';
import { useEffect, useRef } from 'react';
import Logo from '../ui/Logo';

const ani = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    overflow: auto;
    max-width: 70rem;
    max-height: 50rem;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
    opacity: 0;
    animation: ${ani} 2.5s forwards;

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const MessageWrapper = styled.div`
    opacity: 0;
    animation: ${ani} 1s forwards;
    display: flex;
    justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div`
    max-width: 65%;
    margin: 0 7rem;
    padding: 1.2rem;
    border-radius: 25px;
    background: ${({ $isUser }) =>
        $isUser ? 'var(--color-lightgray)' : 'var(--color-white)'};
    border: ${({ $isUser }) =>
        $isUser ? '1px solid #e0e0e0' : '1px solid #e0e0e0'};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const MessageFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    font-size: 12px;
    color: #888;
`;

const MainMessage = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    opacity: 0.9;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
`;

const BaseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: all 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #333;
    }
`;

const RateButton = styled(BaseButton)`
    &:hover {
        color: var(--color-red);
    }
`;

const CopyButton = styled(BaseButton)`
    &:hover {
        color: var(--color-red);
    }
`;

const ChatOutput = () => {
    const chat = useSelector((state) => state.chat);
    const { messages } = chat;
    const isLoading = chat.status === 'receiving';
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <MessagesContainer>
            {messages.map((message) => (
                <MessageWrapper key={message.id} $isUser={message.isUser}>
                    <MessageBubble $isUser={message.isUser}>
                        <MainMessage>
                            {!message.isUser ? (
                                <>
                                    <Logo type="round" url="/logo.png" />
                                    <TypewriterMessage
                                        text={message.text}
                                        speed={10}
                                        isUser={message.isUser}
                                    />
                                </>
                            ) : (
                                <>
                                    <TypewriterMessage
                                        text={message.text}
                                        speed={10}
                                        isUser={message.isUser}
                                    />
                                    <Logo
                                        type="round"
                                        url="/nofaceavatar.png"
                                    />
                                </>
                            )}
                        </MainMessage>
                        {!message.isUser && (
                            <MessageFooter>
                                <ActionButtons>
                                    <RateButton
                                        onClick={() => console.log('Like')}
                                        aria-label="Нравится"
                                    >
                                        <FiThumbsUp size={16} />
                                    </RateButton>
                                    <RateButton
                                        onClick={() => console.log('Dislike')}
                                        aria-label="Не нравится"
                                    >
                                        <FiThumbsDown size={16} />
                                    </RateButton>
                                    <CopyButton
                                        onClick={() => console.log('Copy')}
                                        aria-label="Копировать"
                                    >
                                        <FiCopy size={16} />
                                    </CopyButton>
                                </ActionButtons>
                            </MessageFooter>
                        )}
                    </MessageBubble>
                </MessageWrapper>
            ))}

            {isLoading && (
                <MessageWrapper $isUser={false}>
                    <MessageBubble $isUser={false}>
                        <Spinner />
                    </MessageBubble>
                </MessageWrapper>
            )}
            <div ref={messagesEndRef} />
        </MessagesContainer>
    );
};

export default ChatOutput;

import styled from 'styled-components';
import { FiThumbsUp, FiThumbsDown, FiCopy } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Spinner from '../ui/Spinner';

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    overflow: auto;
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const MessageWrapper = styled.div`
    display: flex;
    justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div`
    max-width: 85%;
    padding: 16px;
    border-radius: 16px;
    background: ${({ $isUser }) => ($isUser ? '#f0f0f0' : '#f9f9f9')};
    border: ${({ $isUser }) =>
        $isUser ? '1px solid #e0e0e0' : '1px solid #e0e0e0'};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const MessageContent = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
    font-size: 15px;
`;

const MessageFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    font-size: 12px;
    color: #888;
`;

const Timestamp = styled.span`
    opacity: 0.7;
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
        color: #e8391a;
    }
`;

const CopyButton = styled(BaseButton)`
    &:hover {
        color: #ed9d09;
    }
`;

const ChatOutput = () => {
    const chat = useSelector((state) => state.chat);
    const { messages } = chat;
    const isLoading = chat.status === 'receiving';

    return (
        <MessagesContainer>
            {messages.map((message) => (
                <MessageWrapper key={message.id} $isUser={message.isUser}>
                    <MessageBubble $isUser={message.isUser}>
                        <MessageContent>{message.text}</MessageContent>
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
        </MessagesContainer>
    );
};

export default ChatOutput;

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Message from './Message';
import Spinner from '../ui/Spinner';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid red;
    width: 60rem;
    height: 50rem;
    top: 10vh;
    left: 50%;
    border-radius: 2%;
`;

function ChatOutput() {
    const chat = useSelector((state) => state.chat);
    const { messages } = chat;
    console.log(chat);

    return (
        <Container>
            {messages.map((message) => (
                <Message
                    message={message.text}
                    isUser={message.isUser}
                    key={message.id}
                />
            ))}
            {chat.status === 'receiving' && <Spinner />}
        </Container>
    );
}

export default ChatOutput;

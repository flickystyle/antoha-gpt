import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 1rem;
    display: flex;
    justify-content: flex-start;
`;

const Name = styled.span`
    text-decoration: underline;
    color: brown;
    font-size: 1.5rem;
`;

function Message({ message, isUser }) {
    return (
        <Wrapper>
            <span>
                <Name>{isUser ? 'User' : 'Bot'}</Name> : {message}
            </span>
        </Wrapper>
    );
}

export default Message;

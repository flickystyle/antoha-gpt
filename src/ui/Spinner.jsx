import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

const SpinnerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
`;

const TypingIndicator = styled.div`
    display: flex;
    align-items: center;
    height: 20px;
`;

const Dot = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #666;
    margin: 0 2px;
    animation: ${blink} 1.4s infinite both;
    animation-delay: ${(props) => props.delay};
`;

const SpinnerText = styled.span`
    color: #666;
    font-size: 14px;
    margin-left: 8px;
`;

function Spinner() {
    return (
        <SpinnerContainer>
            <TypingIndicator>
                <Dot delay="0s" />
                <Dot delay="0.2s" />
                <Dot delay="0.4s" />
            </TypingIndicator>
            <SpinnerText>Печатает...</SpinnerText>
        </SpinnerContainer>
    );
}

export default Spinner;

import styled, { keyframes } from 'styled-components';
import Logo from './Logo';

const wave = keyframes`
        0%, 30%, 60%, 100%, 130%, 300% {
        transform: translateY(0);
        opacity: 0.2;
      }

      30% {
        transform: translateY(-5px);
        opacity: 1;
      }`;

const SpinnerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
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
    background-color: var(--color-logo);
    margin: 0 2px;
    animation: ${wave} 1s infinite ease-in-out;
    animation-delay: ${(props) => props.delay};
`;

function Spinner() {
    return (
        <SpinnerContainer>
            <Logo type="round" url="/logo.png" alt="NTS logo" />
            <TypingIndicator>
                <Dot delay="0s" />
                <Dot delay="0.3s" />
                <Dot delay="0.6s" />
            </TypingIndicator>
        </SpinnerContainer>
    );
}

export default Spinner;

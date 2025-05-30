import styled from 'styled-components';

const StyledSpinner = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    position: relative;
    left: 30px;
    top: 20px;

    & span {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: red;
        border-radius: 50%;
        animation: wave 1s infinite ease-in-out;
    }
    & span:nth-child(2) {
        animation-delay: 0.3s;
    }

    & span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes wave {
        0%,
        30%,
        60%,
        100%,
        130%,
        300% {
            transform: translateY(0);
        }

        30% {
            transform: translateY(-15px);
        }
    }
`;

function Spinner() {
    return (
        <StyledSpinner>
            <span></span>
            <span></span>
            <span></span>
        </StyledSpinner>
    );
}

export default Spinner;

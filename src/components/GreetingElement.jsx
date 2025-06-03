import styled, { keyframes } from 'styled-components';
import Logo from '../ui/Logo';
import { useSelector } from 'react-redux';

const ani = keyframes`
  0% {opacity: 0;}
  100% {opacity: 0.9;}
`;

const backAni = keyframes`
  0% {opacity: 0.9;}
  100% {opacity: 0;}
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40rem;
    height: 15rem;

    position: absolute;
    top: 54%;
    left: 50%;
    align-items: center;
    transform: translate(-50%);

    &.showen {
        opacity: 0;
        animation: ${ani} 1s forwards;
    }

    &.hidden {
        opacity: 0.8;
        animation: ${backAni} 1s forwards;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    max-height: 5rem;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const P = styled.p`
    text-align: center;
    padding: 0;
    margin-top: 0;
`;

const A = styled.a`
    text-decoration: none;
    color: var(--color-red);
    font-weight: 600;
`;

function GreetingElement() {
    const chat = useSelector((state) => state.chat);
    console.log(chat);

    return (
        <Container className={`${chat.startSession ? 'showen' : 'hidden'}`}>
            <LogoWrapper>
                <Logo type="square" url="/logo.png" />
                <h1>
                    НефтеТранс
                    <br /> Сервис
                </h1>
            </LogoWrapper>
            <TextWrapper>
                <h2>НТС Ассистент</h2>
                <P>
                    Инструмент для быстрого поиска информации по корпоративной
                    базе знаний.
                </P>
                <P>
                    Перед началом использования ознакомьтесь с{' '}
                    <A href="#">правилами использования ассистента</A>.
                </P>
                <P>
                    Ответы ассистента могут содержать неточности, поэтому
                    советуем перепроверять информацию перед применением.
                </P>
            </TextWrapper>
        </Container>
    );
}

export default GreetingElement;

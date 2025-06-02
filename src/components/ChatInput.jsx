import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addUserMessage, sendMessage } from '../slices/chatSlice';
import { FiArrowUp, FiMic, FiPaperclip, FiMicOff } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { GrSend } from "react-icons/gr";

const InputContainer = styled.div`
    max-width: 800px;
    width: 100%;
    margin: auto;
    padding: 16px;
    box-sizing: border-box;
`;

const Form = styled.form`
    width: 100%;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 0.3rem;
    flex-direction: column;
    align-items: center;
    border-radius: 30px;
    border: 1px solid #e0e0e0;
    background-color: rgb(198, 199, 205);
    padding: 8px 16px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTextarea = styled.textarea`
    flex: 1;
    border: none;
    border-bottom: 1px solid var(--dark-gray);
    background: transparent;
    resize: none;
    outline: none;
    font-size: 16px;
    line-height: 1.5;
    padding: 8px 0;
    max-height: 200px;
    width: 95%;
    font-family: inherit;

    &::placeholder {
        color: #838282;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;
const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    width: 95%;
`;

const Button = styled.button`
    color: var(--color-red);
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s;
    position: relative;
    left: 8px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.3;
        color: var(--color-darkgray);
    }
`;

const FakeButtonGroup = styled.div`
    padding: 0;
    margin: 0;
    display: flex;
`;

const FakeButton = styled.button`
    color: var(--color-darkgray);
    border: none;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    padding: 2px;
    margin-left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s;
    position: relative;
    left: -10px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.3;
        color: var(--color-darkgray);
    }

    &:hover {
        cursor: pointer;
        color: var(--color-red);
    }
`;

const FakeButton2 = styled.button`
    color: var(--color-darkgray);
    border: none;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    padding: 2px;
    margin-left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s;
    position: relative;
    /* left: 10px; */
    transform: rotate(0.88turn);

    &:disabled {
        cursor: not-allowed;
        opacity: 0.3;
        color: var(--color-darkgray);
    }

    &:hover {
        cursor: pointer;
        color: var(--color-red);
    }
`;



const GreetingText = styled.p`
    text-align: center;
    font-size: 12px;
    color: #9e9e9e;
    margin-top: 12px;
`;

const Line = styled.div`
    height: 1px;
    width: 95%;
    padding: 0;
    margin: 0;
    line-height: 0;
    background-color: #838282;
`;

function ChatInput() {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [scrollbarRows, setScrollbarRows] = useState(0);
    const textareaRef = useRef(null);
    const dispatch = useDispatch();
    const status = useSelector((state) => state.chat.status);
    const isDisabled = status === 'receiving';

    useEffect(() => {
        const currentSymbols = Number(textareaRef.current.offsetWidth) / 9;
        const newRows = inputValue.split('\n').reduce((acc, line) => {
            console.log('len', line.length);
            console.log({ currentSymbols });
            if (line.length > currentSymbols) {
                acc += Math.ceil(line.length / currentSymbols);
            } else {
                acc += 1;
            }
            return acc;
        }, 0);
        setScrollbarRows(newRows);
    }, [inputValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        dispatch(addUserMessage(inputValue));
        dispatch(sendMessage(inputValue));
        setInputValue('');
    };

    return (
        <InputContainer>
            <GreetingText>
                ИИ Ассистент может допускать ошибки. Проверяйте важную
                информацию.
            </GreetingText>
            <Form onSubmit={handleSubmit}>
                <InputWrapper $focused={isFocused}>
                    <StyledTextarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Задайте вопрос или напишите что-нибудь..."
                        rows={scrollbarRows}
                        cols={5}
                    />
                    <Line />
                    <ButtonGroup>
                        <FakeButtonGroup>
                            <FakeButton disabled={isDisabled}>
                                <FiMic size={24} />
                            </FakeButton>

                            <FakeButton2 type="file" disabled={isDisabled}>
                                <FiPaperclip size={23} />
                            </FakeButton2>
                        </FakeButtonGroup>

                        <Button type="submit" disabled={!inputValue.trim()}>
                            <GrSend size={33} />
                        </Button>
                    </ButtonGroup>
                </InputWrapper>
            </Form>
        </InputContainer>
    );
}

export default ChatInput;

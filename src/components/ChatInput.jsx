import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addUserMessage, sendMessage, startSession } from '../slices/chatSlice';
import { FiMic, FiPaperclip, FiArrowUp } from 'react-icons/fi';
import { GrSend } from 'react-icons/gr';

const InputContainer = styled.div`
    max-width: 800px;
    width: 100%;
    margin: auto;
    padding: 16px;
    box-sizing: border-box;
    z-index: 999;
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
    min-height: 2.2rem;
`;

const Button = styled.button`
    color: var(--color-white);
    border: 3px solid var(--color-red);
    border-radius: 50%;
    background-color: var(--color-red);
    cursor: pointer;
    padding: 4px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    position: relative;
    left: 1px;

    &:active {
        transform: scale(0.7);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        color: var(--color-white);
        background-color: var(--color-darkgray);
        border-color: var(--color-darkgray);
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

const Line = styled.div`
    height: 2px;
    width: 95%;
    padding: 0;
    margin: 0;
    line-height: 0;
    background-color: var(--color-darkgray);
    opacity: 0.4;
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
        dispatch(startSession());
        setInputValue('');
    };

    return (
        <InputContainer>
            <Form onSubmit={handleSubmit}>
                <InputWrapper $focused={isFocused}>
                    <StyledTextarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Задайте ваш вопрос..."
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

                        <Button
                            type="submit"
                            disabled={!inputValue.trim() || isDisabled}
                        >
                            <FiArrowUp size={22} />
                        </Button>
                    </ButtonGroup>
                </InputWrapper>
            </Form>
        </InputContainer>
    );
}

export default ChatInput;

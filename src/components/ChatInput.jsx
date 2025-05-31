import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addUserMessage, sendMessage } from '../slices/chatSlice';
import { HiArrowSmallUp } from 'react-icons/hi2';

const InputContainer = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
`;

const Form = styled.form`
    width: 100%;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius: 16px;
    border: 2px solid #e0e0e0;
    background-color: #f9f9f9;
    padding: 8px 16px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:focus-within {
        border-color: #cc0000;
    }
    &:hover {
        border-color: #cc0000;
    }
`;

const StyledInput = styled.input`
    flex: 1;
    border: none;
    background: transparent;
    resize: none;
    outline: none;
    font-size: 16px;
    line-height: 1.5;
    padding: 8px 0;
    max-height: 200px;
    font-family: inherit;

    &::placeholder {
        color: #9e9e9e;
    }
`;

const Button = styled.button`
    background: none;
    border: 1px solid #cc0000;
    color: #cc0000;
    border-radius: 50%;
    cursor: pointer;
    padding: 8px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        border: 1px solid gray;
        color: gray;
    }
`;

const FooterText = styled.p`
    text-align: center;
    font-size: 12px;
    color: #9e9e9e;
    margin-top: 12px;
`;

function ChatInput() {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef < HTMLTextAreaElement > null;
    const dispatch = useDispatch();

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue, textareaRef]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        dispatch(addUserMessage(inputValue));
        dispatch(sendMessage(inputValue));
        setInputValue('');
    };

    return (
        <InputContainer>
            <Form onSubmit={handleSubmit}>
                <InputWrapper $focused={isFocused}>
                    <StyledInput
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Задайте вопрос или напишите что-нибудь..."
                        rows={1}
                    />
                    <Button type="submit" disabled={!inputValue.trim()}>
                        <HiArrowSmallUp size={20} />
                    </Button>
                </InputWrapper>
            </Form>
            <FooterText>
                AntohaGPT может допускать ошибки. Проверяйте важную информацию.
            </FooterText>
        </InputContainer>
    );
}

export default ChatInput;

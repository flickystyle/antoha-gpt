import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addUserMessage, sendMessage } from '../slices/chatSlice';

const Form = styled.form`
    display: flex;
    border: 2px solid red;
    width: 40rem;
    height: 7rem;
`;

const Textarea = styled.textarea`
    resize: none;
    margin: auto;
    width: 80%;
`;

function ChatInput() {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        if (!inputValue.trim()) return;
        dispatch(addUserMessage(inputValue));
        dispatch(sendMessage(inputValue));
        setInputValue('');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Textarea
                type="text"
                placeholder="Введите запрос"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
        </Form>
    );
}

export default ChatInput;

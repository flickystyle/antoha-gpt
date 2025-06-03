import { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Cursor = styled.span`
    display: inline-block;
    width: 8px;
    height: 16px;
    background: #333;
    margin-left: 4px;
    vertical-align: middle;
    animation: ${blink} 0.8s infinite;
`;

const MessageContainer = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.5;
    font-size: 15px;
    min-height: 20px;
`;

const TypewriterMessage = ({
    text,
    speed = 20,
    isUser,
    onComplete,
    scrollRef,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToBottom = useCallback(() => {
        if (scrollRef?.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [scrollRef]);

    useEffect(() => {
        if (!isUser && currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
                scrollToBottom();
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, isUser, scrollToBottom]);

    useEffect(() => {
        if (!isUser && currentIndex === text.length && onComplete) {
            onComplete();
        }
    }, [currentIndex, text.length, isUser, onComplete]);

    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    return (
        <MessageContainer>
            {!isUser ? displayedText : text}
            {!isUser && currentIndex < text.length && <Cursor />}
        </MessageContainer>
    );
};

export default TypewriterMessage;

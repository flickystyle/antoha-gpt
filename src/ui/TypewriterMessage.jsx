import { useState, useEffect } from 'react';
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

const TypewriterMessage = ({ text, speed = 30, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    return (
        <MessageContainer>
            {displayedText}
            {currentIndex < text.length && <Cursor />}
        </MessageContainer>
    );
};

export default TypewriterMessage;

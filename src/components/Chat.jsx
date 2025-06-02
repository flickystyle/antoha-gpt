import ChatInput from './ChatInput';
import ChatOutput from './ChatOutput';
import GreetingElement from './GreetingElement';
import MainWindow from './MainWindow';

function Chat() {
    return (
        <>
            <MainWindow>
                <ChatOutput />
                <GreetingElement />
                <ChatInput />
            </MainWindow>
        </>
    );
}

export default Chat;

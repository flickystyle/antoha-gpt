import ChatInput from './ChatInput';
import ChatOutput from './ChatOutput';
import MainWindow from './MainWindow';

function Chat() {
    return (
        <>
            <MainWindow>
                <ChatOutput />
                <ChatInput />
            </MainWindow>
        </>
    );
}

export default Chat;

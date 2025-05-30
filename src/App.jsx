import Chat from './components/Chat';
import GlobalStyles from './components/GlobalStyles';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <GlobalStyles />
            <Chat />
        </Provider>
    );
}

export default App;

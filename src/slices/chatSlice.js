import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    messages: [{ id: 1, text: 'Привет! Я твой ассистент.', isUser: false }],
    status: 'idle', // 'idle' | 'sending' | 'receiving' | 'error'
    error: null,
};

//'http://127.0.0.1:8080/api'
const API = 'http://127.0.0.1:8080/api';

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (userMessage, { rejectWithValue }) => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: userMessage }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Ошибка сервера');
            }

            const data = await response.json();
            console.log(data);
            return data.reply;
        } catch (error) {
            return rejectWithValue(
                error.message || 'Не удалось отправить сообщение'
            );
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addUserMessage: (state, action) => {
            state.messages.push({
                id: Date.now(),
                text: action.payload,
                isUser: true,
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.status = 'receiving';
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'idle';
                state.messages.push({
                    id: Date.now(),
                    text: action.payload,
                    isUser: false,
                });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
                state.messages.push({
                    id: Date.now(),
                    text: 'Ошибка: ' + action.payload,
                    isUser: false,
                });
            });
    },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;

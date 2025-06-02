import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    status: 'idle', // 'idle' | 'sending' | 'receiving' | 'error'
    error: null,
    startSession: true,
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

            return data.message;
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
        startSession: (state) => {
            state.startSession = false;
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

export const { addUserMessage, startSession } = chatSlice.actions;
export default chatSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios"
import customLogger from "../../utils/logger";
const initialState = {
    chats: [],
    chatsLoading: false,
    messagesLoading: false,
    sendingMessage: false,
    messages: []
}

export const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        updateMessages(state, action) {
            state.messages = [...state.messages, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllChats.pending, (state, action) => {
                state.chatsLoading = true
            })
            .addCase(getAllChats.fulfilled, (state, action) => {
                state.chats = action.payload.chats
                state.chatsLoading = false
            })
            .addCase(getAllChats.rejected, (state, action) => {
                state.chatsLoading = false
            })
            .addCase(getAllMessages.pending, (state, action) => {
                state.messagesLoading = true
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.messages = action.payload.messages
                state.messagesLoading = false
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.messagesLoading = false
            })
            .addCase(sendMessage.pending, (state, action) => {
                state.sendingMessage = true
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sendingMessage = false
                state.messages = [...state.messages, action.payload.newMessage]
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.sendingMessage = false
            })
    }
})

export default inboxSlice.reducer;

export const getAllChats = createAsyncThunk('getAllChats', async () => {
    try {
        const { data } = await axios.get('/api/v1/chats');
        customLogger.info("getAllChats#addComment", "All Chats loaded..")
        return data;
    } catch (error) {
        customLogger.error("getAllChats#addComment", "Error response", "", error)
        throw new Error(error.message);
    }
})

export const getAllMessages = createAsyncThunk('getAllMessages', async (chatId) => {
    try {
        const { data } = await axios.get(`/api/v1/messages/${chatId}`);
        customLogger.info("getAllChats#getAllMessages", "All Messages loaded..")
        return data;
    } catch (error) {
        customLogger.error("getAllChats#getAllMessages", "Error response", "", error)
        throw new Error(error.message);
    }
})
export const sendMessage = createAsyncThunk('sendMessage', async (msgData) => {
    try {
        const { data } = await axios.post('/api/v1/newMessage/', msgData);
        customLogger.info("getAllChats#sendMessage", "Mesage sent..")
        return data;
    } catch (error) {
        customLogger.error("getAllChats#sendMessage", "Error response", "", error)
        throw new Error(error.message);
    }
}) 
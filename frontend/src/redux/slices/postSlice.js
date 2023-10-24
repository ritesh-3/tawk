import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import customLogger from "../../utils/logger";
import { showSnackbar } from "./app";

const initialState = {
    commentLoading: false,
    postsLoading: false,
    newPostLoading: false,
    success: false,
    commentSuccess:false,
    posts: [],
    totalPosts: null,
};


const postSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addComment.pending, (state, action) => {
                state.commentLoading = true;
                state.commentSuccess = false;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.commentLoading = false
                state.commentSuccess = true;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.commentLoading = false
                state.commentSuccess = false;
            })
            .addCase(getPostsOfFollowing.pending, (state, action) => {
                state.postsLoading = true
            })
            .addCase(getPostsOfFollowing.fulfilled, (state, action) => {
                state.postsLoading = false
                state.posts = action.payload.posts
                state.totalPosts = action.payload.totalPosts
            })
            .addCase(getPostsOfFollowing.rejected, (state, action) => {
                state.postsLoading = false
            })
            .addCase(addNewPost.pending, (state, action) => {
                state.newPostLoading = true
                state.success = false
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.newPostLoading = false
                state.success = action.payload.success
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.newPostLoading = false
                state.success = false
            })
    }
})

export default postSlice.reducer;

export const addComment = createAsyncThunk('addComment', async ({ postId, comment }, { dispatch }) => {
    try {
        const { data } = await axios.post(`/api/v1/post/comment/${postId}`, { comment });
        customLogger.info("postSlice#addComment", "Comment Added successfully..")
        dispatch(showSnackbar({ severity: "success", message: "Comment Posted!" }));
        return data;
    } catch (error) {
        customLogger.error("postSlice#addComment", "Error response", "", error)
        dispatch(showSnackbar({ severity: "error", message: "Error while Commenting"}));
        throw new Error(error.message);
    }
});
export const likePost = createAsyncThunk('likePost', async (postId, { dispatch }) => {
    try {
        const { data } = await axios.get(`/api/v1/post/${postId}`);
        customLogger.info("postSlice#likePost", "Liked successfully..")
        // dispatch(showSnackbar({ severity: "success", message: "Comment Posted!" }));
        return data;
    } catch (error) {
        customLogger.error("postSlice#likePost", "Error response", "", error)
        dispatch(showSnackbar({ severity: "error", message: "Error while liking" }));
        throw new Error(error.message);
    }
});

export const getPostsOfFollowing = createAsyncThunk('getPostsOfFollowing', async (page = 1, { dispatch }) => {
    try {
        const { data } = await axios.get(`/api/v1/posts?page=${page}`);
        customLogger.info("postSlice#getPostsOfFollowing", "Loaded Posts successfully..")
        return data
    } catch (error) {
        customLogger.error("postSlice#getPostsOfFollowing", "Error response", "", error)
        dispatch(showSnackbar({ severity: "error", message: "Error while loading Posts" }));
        throw new Error(error.message);
    }
})

export const addNewPost = createAsyncThunk('addNewPost', async (postData, { dispatch }) => {
    try {
        const { data } = await axios.post("/api/v1/post/new", postData);
        dispatch(showSnackbar({ severity: "success", message: "Posted Successfully!" }));
        customLogger.info("postSlice#addNewPost", "Loaded Posts successfully..")
        return data
    } catch (error) {
        customLogger.error("postSlice#addNewPost", "Error response", "", error)
        dispatch(showSnackbar({ severity: "error", message: "Error while posting" }));
        throw new Error(error.message);
    }
})
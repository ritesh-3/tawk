import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";
import customLogger from "../../utils/logger";


// ----------------------------------------------------------------------

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    user: null,
    error: false,
    allUsers: null,
    otherUser: null,
    followLoading: false,
    resetSuccess: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateIsLoading(state, action) {
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading;
        },
        logIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
            state.user_id = null;
        },
        allUsers(state, action) {
            state.allUsers = action.payload.users
        },
        updateOtherUser(state, action) {
            state.otherUser = action.payload.user
        },
        followUser(state, action) {
            state.followLoading = action.payload.loading
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetailsById.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getUserDetailsById.fulfilled, (state, action) => {
                state.otherUser = action.payload.user
                state.isLoading = false
            })
            .addCase(getUserDetailsById.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(forgotPassword.pending, (state, action) => {
                state.isLoading = true
                state.resetSuccess = false
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(resetPassword.pending, (state, action) => {
                state.isLoading = true
                state.resetSuccess = false
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.resetSuccess = true
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.resetSuccess = false

            })
    }

});

export default userSlice.reducer;


/**
 * @name userSlice#LoginUser
 * @param {*} formValues 
 * @returns 
 */
export function LoginUser(formValues) {
    return async (dispatch, getState) => {
        // Make API call here
        customLogger.trace("LogginUser", "userSlice#LoginUser")
        dispatch(userSlice.actions.updateIsLoading({ isLoading: true, error: false }));
        await axios
            .post(
                "/api/v1/login",
                {
                    ...formValues,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                customLogger.info("LogginUser sucess", "userSlice#LoginUser", "", response)
                dispatch(
                    userSlice.actions.logIn({
                        isLoggedIn: true,
                        user: response.data.user,
                    })
                );
                // window.localStorage.setItem("user_id", response.data.user_id);
                dispatch(
                    showSnackbar({ severity: "success", message: response.data.message })
                );
                dispatch(
                    userSlice.actions.updateIsLoading({ isLoading: false, error: false })
                );
            })
            .catch(function (error) {
                customLogger.error("LogginUser Error", "userSlice#LoginUser", "", error)
                dispatch(showSnackbar({ severity: "error", message: error.message }));
                dispatch(
                    userSlice.actions.updateIsLoading({ isLoading: false, error: true })
                );
            });
    };
}

export function RegisterUser(formValues) {
    return async (dispatch, getState) => {
        // Make API call here
        try {
            dispatch(userSlice.actions.updateIsLoading({ isLoading: true, error: false }));
            const { data } = await axios.post("/api/v1/signup", { ...formValues })
            dispatch(
                userSlice.actions.logIn({
                    isLoggedIn: true,
                    user: data.user,
                })
            );
            dispatch(
                showSnackbar({ severity: "success", message: data.message })
            );
            dispatch(
                userSlice.actions.updateIsLoading({ isLoading: false, error: false })
            );
        } catch (error) {
            customLogger.error(error.message, "userSlice#RegisterUser")
            dispatch(showSnackbar({ severity: "error", message: error.message }));
            dispatch(
                userSlice.actions.updateIsLoading({ isLoading: false, error: true })
            );
        }
    };
}

/**
 * @name userSlce#LoadAllUsers
 * @returns 
 */
export function LoadAllUsers() {
    return async (dispatch, getState) => {
        try {
            customLogger.trace("Loading all users", "userSlce#LoadAllUsers")
            dispatch(userSlice.actions.updateIsLoading({ isLoading: true, error: false }));
            const { data } = await axios.get('/api/v1/users/suggested');
            customLogger.trace("All Users Loaded successfully", "userSlce#LoadAllUsers")
            dispatch(userSlice.actions.allUsers({ users: data.users }))
            dispatch(
                userSlice.actions.updateIsLoading({ isLoading: false, error: false })
            );
        } catch (error) {
            customLogger.error(error.message, "userSlce#LoadAllUsers")
            dispatch(showSnackbar({ severity: "error", message: error.message }));
            dispatch(
                userSlice.actions.updateIsLoading({ isLoading: false, error: true })
            );
        }
    }
}

/**
 * @name userSlce#getUserDetails
 * @returns 
 */
export function getUserDetails(username) {
    return async (dispatch, getState) => {
        try {
            customLogger.trace("Loading User", "userSlce#getUserDetails")
            dispatch(userSlice.actions.updateIsLoading({ isLoading: true, error: false }));
            const { data } = await axios.get(`/api/v1/user/${username}`);
            customLogger.trace("All Users Loaded successfully", "userSlce#LoadAllUsers")
            dispatch(userSlice.actions.updateOtherUser({ user: data.user }))
            dispatch(
                userSlice.actions.updateIsLoading({ isLoading: false, error: false })
            );
        } catch (error) {
            customLogger.error(error.message, "userSlce#getUserDetails")
            dispatch(showSnackbar({ severity: "error", message: error.message }));
            dispatch(
                userSlice.actions.updateIsLoading({ isLoading: false, error: true })
            );
        }
    }
}
/**
 * @name userSlce#followUser
 * @returns 
 */
export function followUser(userId) {
    return async (dispatch, getState) => {
        try {
            customLogger.trace("Following USer", "userSlce#followUser", "", userId)
            dispatch(userSlice.actions.followUser({ status: true }));
            const { data } = await axios.get(`/api/v1/follow/${userId}`);
            customLogger.trace("Follow users api returned resposne", "userSlce#LoadAllUsers", "", data)
            dispatch(userSlice.actions.followUser({ status: false }));
        } catch (error) {
            customLogger.error(error.message, "userSlce#followUser")
            dispatch(userSlice.actions.followUser({ status: false }));
            dispatch(showSnackbar({ severity: "error", message: "Follow Error" }));
        }
    }
}

/**
 * @name userSlce#LogOut
 * @returns 
 */
export function LogOut() {
    return async (dispatch, getState) => {
        try {
            customLogger.trace("LogOut USer", "userSlce#LogOut", "")
            dispatch(userSlice.actions.updateIsLoading({ isLoading: true, error: false }));
            await axios.get('/api/v1/logout');
            customLogger.trace("LogOut users api returned resposne", "userSlce#LoadAllUsers", "")
            dispatch(userSlice.actions.logIn({
                isLoggedIn: false,
                user: null
            }));
            dispatch(showSnackbar({ severity: "success", message: "Logged Out !" }));
            dispatch(userSlice.actions.updateIsLoading({ isLoading: false, error: false }));
        } catch (error) {
            customLogger.error(error.message, "userSlce#LogOut")
            dispatch(userSlice.actions.updateIsLoading({ isLoading: false, error: true }));
            dispatch(showSnackbar({ severity: "error", message: "LogOut Error" }));
        }
    }
}

// Get User Details By ID
export const getUserDetailsById = createAsyncThunk('getUserDetailsById', async (userId, { dispatch }) => {
    try {
        const { data } = await axios.get(`/api/v1/userdetails/${userId}`);
        customLogger.info("postSlice#getUserDetailsById", "successfully..")
        return data;
    } catch (error) {
        customLogger.error("postSlice#getUserDetailsById", "Error response", "", error)
        dispatch(showSnackbar({ severity: "error", message: "Error while Commenting" }));
        throw new Error(error.message);
    }
});

export const forgotPassword = createAsyncThunk('forgotPassword', async (email, { dispatch }) => {
    try {
        const { data } = await axios.post('/api/v1/password/forgot', { email });
        customLogger.info("postSlice#forgotPassword", "successfully..","",data)
        dispatch(showSnackbar({ severity: "success", message: data.message }));
        return data;
    } catch (error) {
        customLogger.error("postSlice#forgotPassword", "Error response", "", error)
        dispatch(showSnackbar({ severity: "error", message: error?.message ? error?.message : "Something went wrong" }));
        throw new Error(error.message);
    }
});
// Get User Details By ID
export const resetPassword = createAsyncThunk('resetPassword', async ({ token, password }, { dispatch }) => {
    try {
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, { password });
        customLogger.info("postSlice#resetPassword", "successfully..")
        dispatch(showSnackbar({ severity: "success", message: "Password Reset Successfull" }));
        return data;
    } catch (error) {
        customLogger.error("postSlice#resetPassword", "Error response", "", error)
        dispatch(showSnackbar({ severity: "error", message: "Something went wrong" }));
        throw new Error(error.message);
    }
});
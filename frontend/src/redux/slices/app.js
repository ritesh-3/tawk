import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tab: 0,
    snackbar: {
        open: null,
        severity: null,
        message: null,
    }
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        openSnackBar(state, action) {
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackBar(state) {
            state.snackbar.open = false;
            state.snackbar.message = null;
        },
        updateTab(state, action) {
            state.tab = action.payload.tab;
        },
    }
})
export default appSlice.reducer;

export const closeSnackBar = () => async (dispatch, getState) => {
    dispatch(appSlice.actions.closeSnackBar());
};

export const showSnackbar = ({ severity, message }) =>
    async (dispatch, getState) => {
        dispatch(
            appSlice.actions.openSnackBar({
                message,
                severity,
            })
        );

        setTimeout(() => {
            dispatch(appSlice.actions.closeSnackBar());
        }, 4000);
    };

export function UpdateTab(tab) {
    return async (dispatch, getState) => {
        dispatch(appSlice.actions.updateTab(tab));
    };
}

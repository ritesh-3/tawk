import { combineReducers } from 'redux'
import appReducer from "./slices/app"
import userReducer from "./slices/userSlice"
import postsReducer from "./slices/postSlice"
import inboxReducer from "./slices/inbox"

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    posts: postsReducer,
    inbox: inboxReducer
})

export { rootReducer }
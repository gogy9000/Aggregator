import {combineReducers, createStore} from "redux";
import {messagePageReducer} from "./MessagePage/messagePageReducer";
import ProfilePageReducer from "./ProfilePage/ProfilePageReducer";
import {authReducer} from "./Auth";


let rootReducer;

rootReducer = combineReducers({
    messagePage: messagePageReducer,
    profilePage: ProfilePageReducer,
    auth: authReducer
});

export let store = createStore(rootReducer)
window.store = store
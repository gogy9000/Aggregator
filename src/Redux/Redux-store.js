import {combineReducers, createStore} from "redux";
import {messagePageReducer} from "./MessagePage/messagePageReducer";
import ProfilePageReducer from "./ProfilePage/ProfilePageReducer";


let rootReducer = combineReducers({messagePage: messagePageReducer, profilePage: ProfilePageReducer
})

export let store = createStore(rootReducer)

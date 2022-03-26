import {combineReducers, createStore} from "redux";
import {messagePageReducer} from "./MessagePage/messagePageReducer";
import ProfilePageReducer from "./ProfilePage/ProfilePage";


let rootReducer = combineReducers({messagePage: messagePageReducer, profilePage: ProfilePageReducer
})

export let store = createStore(rootReducer)

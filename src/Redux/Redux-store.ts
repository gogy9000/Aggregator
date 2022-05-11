import {combineReducers, createStore} from "redux";
import {messagePageReducer} from "./MessagePage/messagePageReducer";
import {ProfilePageReducer} from "./ProfilePage/ProfilePageReducer";
import {authReducer} from "./Auth";


const rootReducer = combineReducers({
    messagePage: messagePageReducer,
    profilePage: ProfilePageReducer,
    auth: authReducer
});

type rootReducerType = typeof rootReducer
export type AppStateType=ReturnType<rootReducerType>
export type InferActionsTypes <T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export let store = createStore(rootReducer)
// window.store = store
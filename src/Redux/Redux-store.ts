import {combineReducers, createStore} from "redux";
import {messagePageReducer} from "./MessagePage/messagePageReducer";
import {ProfilePageReducer} from "./ProfilePage/ProfilePageReducer";
import {authReducer} from "./Auth/Auth";
import {AppReducer} from "./App/AppReducer";


const rootReducer = combineReducers({
    messagePage: messagePageReducer,
    profilePage: ProfilePageReducer,
    auth: authReducer,
    AppReducer:AppReducer
});

type rootReducerType = typeof rootReducer
export type AppStateType=ReturnType<rootReducerType>
export type InferActionsTypes <T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export let store = createStore(rootReducer)
// window.store = store
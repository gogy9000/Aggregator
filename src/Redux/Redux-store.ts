import {applyMiddleware, combineReducers, createStore} from "redux";
import {messagePageReducer} from "./MessagePage/messagePageReducer";
import {ActionsType, ProfilePageReducer} from "./ProfilePage/ProfilePageReducer";
import {ActionsAuthType, authReducer} from "./Auth/Auth";
import {ActionsAppType, AppReducer} from "./AppReducer/AppReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    messagePage: messagePageReducer,
    profilePage: ProfilePageReducer,
    auth: authReducer,
    AppReducer:AppReducer
});

type rootReducerType = typeof rootReducer
export type AppStateType=ReturnType<rootReducerType>
export type InferActionsTypes <T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type UnionActionsType=ActionsType|ActionsAppType|ActionsAuthType
export let store = createStore(rootReducer,applyMiddleware(thunk))
// @ts-ignore
window.store = store
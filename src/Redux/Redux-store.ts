import {applyMiddleware, combineReducers, createStore} from "redux";
import {messagePageReducer} from "./MessagePage/messagePageReducer";
import {ActionsType, ProfilePageReducer} from "./ProfilePage/ProfilePageReducer";
import {ActionsAuthType, authReducer} from "./Auth/Auth";
import {ActionsAppType, AppReducer} from "./AppReducer/AppReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {loadState, saveState} from "../utils/Local-storage-utils";


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
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, UnionActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, UnionActionsType>


export let store = createStore(rootReducer,loadState(),applyMiddleware(thunk))

store.subscribe(() => {
    saveState(store.getState());
});
// @ts-ignore
window.store = store
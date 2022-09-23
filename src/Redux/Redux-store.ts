import {applyMiddleware, combineReducers, createStore} from "redux";
import {
    ActionsMessageType,
    messagePageReducer,
    messagePageWatcher,
    messagePageWorkers
} from "./MessagePage/MessagePageReducer";
import {ActionsType, ProfilePageReducer, profileWatcher} from "./ProfilePage/ProfilePageReducer";
import {ActionsAuthType, authReducer, authWatcher} from "./Auth/Auth";
import {ActionsAppType, AppReducer, appWatcher} from "./AppReducer/AppReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import {all, spawn, call, put} from 'redux-saga/effects'
import {errorLog} from "./ErrorLog";
import {errorsInterceptor} from "../utils/ErrorsInterceptor/ErrorsInterceptor";
import {composeWithDevTools} from "@redux-devtools/extension";
import {fork} from "child_process";


type rootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<rootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type UnionActionsType = ActionsType | ActionsAppType | ActionsAuthType | ActionsMessageType
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnionActionsType>
export type AppThunk<ReturnType = any> = ThunkAction<ReturnType, AppRootStateType, unknown, UnionActionsType>

const rootReducer = combineReducers({
    messagePage: messagePageReducer,
    profilePage: ProfilePageReducer,
    auth: authReducer,
    AppReducer: AppReducer,
    errorLog
});



const sagaMiddleware = createSagaMiddleware()

export let store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)))

function* rootSaga() {
    const sagas = [authWatcher, appWatcher, profileWatcher,messagePageWatcher]
    yield all(sagas.map(saga =>
        spawn(function* () {
            while (true) {
                try {
                   yield call(saga)
                    break
                } catch (e) {
                    console.log(e)
                   yield call(errorsInterceptor,e)
                }
            }
        })
    ))
}

sagaMiddleware.run(rootSaga)


store.subscribe(() => {
    // saveState(store.getState());
});
// @ts-ignore
window.store = store
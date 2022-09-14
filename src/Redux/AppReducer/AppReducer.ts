import {AppDispatchType, AppThunk, InferActionsTypes} from "../Redux-store";
import {APIProfile, authApi, AuthDataType, DataType} from "../../Api/Api";
import {actionsAuth, authWorkers, sagasAuthActions} from "../Auth/Auth";
import {actionsProfile, thunkProfile} from "../ProfilePage/ProfilePageReducer";
import {put, takeEvery,call,take} from "redux-saga/effects";
import {AxiosResponse} from "axios";

export type initStateType = {
    isFetching: boolean
    isInitializedApp: boolean
}
const initState: initStateType = {
    isFetching: false,
    isInitializedApp: false

}

export type ActionsAppType = InferActionsTypes<typeof actionsApp|typeof sagasAppActions>

export const AppReducer = (state: initStateType = initState, action: ActionsAppType): initStateType => {
    switch (action.type) {
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE-IS-INITIALIZE-APP":
            return {...state, isInitializedApp: action.isInitializedApp}

        default:
            return state
    }
}

enum appConstants {
    initializeApp="APP_INITIALIZE_APP"
}

export const actionsApp = {
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const),
    initializeApp: (isInitializedApp: boolean) => ({type: 'TOGGLE-IS-INITIALIZE-APP', isInitializedApp} as const)
}
export const sagasAppActions={
    initializeApp:()=>({type:appConstants.initializeApp})
}


export const appWorkers = {
    initializeApp: function* ()  {
        try {
            yield put(actionsApp.initializeApp(true))
            yield put(actionsApp.toggleIsFetching(true))
            const res:AxiosResponse<DataType<AuthDataType>> = yield call(authWorkers.authMe)
                        yield call(thunkProfile.getProfile,res.data.data.id)
                        yield call(thunkProfile.getProfileStatus,res.data.data.id)
                        yield call(thunkProfile.getUser)
        } catch (e) {
            console.log(e)
        } finally {
            yield put(actionsApp.toggleIsFetching(false))
            yield put(actionsApp.initializeApp(false))
        }
    }
}
export function* appWatcher(){
    yield takeEvery(appConstants.initializeApp,appWorkers.initializeApp)
}

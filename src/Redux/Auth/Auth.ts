import {AppDispatchType, AppThunk, InferActionsTypes} from "../Redux-store";
import {authApi, AuthDataType, DataType, loginDataType} from "../../Api/Api";
import {actionsApp, appWorkers, appActivators} from "../AppReducer/AppReducer";
import {call, put, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {AxiosResponse, AxiosError} from "axios";
import {errorsInterceptor} from "../../utils/ErrorsInterceptor/ErrorsInterceptor";


export type   authStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    errorLog: { [key: string]: string } | null


}
let initialState: authStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    errorLog: null

}

export const authReducer = (state: authStateType = initialState, action: ActionsAuthType): authStateType => {
    switch (action.type) {

        case 'GET-AUTH-DATA':
            return {
                ...state,
                id: Number(action.id),
                login: action.login,
                email: action.email,
                isAuth: action.isAuth,
            }
        case "SET-ERROR-LOG":
            return {
                ...state,
                errorLog: action.error
            }

        default:
            return state
    }
}


export type ActionsAuthType = InferActionsTypes<typeof actionsAuth | typeof sagasAuthActions>

export const actionsAuth = {
    setAuthData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => (
        {type: 'GET-AUTH-DATA', id, login, email, isAuth} as const),
    setErrorLog: (error: authStateType["errorLog"]) => ({type: 'SET-ERROR-LOG', error} as const)
}

export const authWorkers = {

    authMe:  function* () {
        try {
            const response: AxiosResponse<DataType<AuthDataType>> = yield call(authApi.getAuthApi)
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                yield put(actionsAuth.setAuthData(id, login, email, true))
                yield put(actionsApp.toggleIsFetching(false))
                return response
            } else {
                yield call(errorsInterceptor,response.data.messages)
            }
        }catch (e) {
            yield call(errorsInterceptor,e)
        }

    },

    login: function* (actions: ReturnType<typeof sagasAuthActions.login>) {
        try {
            const res: AxiosResponse<DataType<{ userId: string }>> = yield call(authApi.logIn, actions.loginData)
            if (res.data.resultCode === 0) {
                yield put(appActivators.initializeApp())
            } else {
                yield call(errorsInterceptor,res.data.messages)
            }
        } catch (e) {
            yield call(errorsInterceptor,e)
        }
    },

    logout: function* () {
        try {
            const res: AxiosResponse<DataType<{}>> = yield call(authApi.logOut)
            if (res.data.resultCode === 0) {
                yield put(actionsAuth.setAuthData(null, null, null, false))
            } else {
                yield call(errorsInterceptor,res.data.messages)
            }
        } catch (e) {
            yield call(errorsInterceptor,e)
        }
    }

}

enum authConstants {
    authMe = "AUTH_AUTH_ME",
    logout = "AUTH_FETCH_LOGOUT",
    login = "AUTH_FETCH_LOGIN"
}

export const sagasAuthActions = {
    authMe: () => ({type: authConstants.authMe} as const),
    logout: () => ({type: authConstants.logout} as const),
    login: (loginData: loginDataType) => ({type: authConstants.login, loginData} as const)
}

export function* authWatcher() {
    yield takeEvery(authConstants.authMe,authWorkers.authMe)
    yield takeEvery(authConstants.logout, authWorkers.logout)
    yield takeEvery(authConstants.login, authWorkers.login)
}




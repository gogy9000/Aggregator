import {AppDispatchType, AppThunk, InferActionsTypes} from "../Redux-store";
import {authApi, AuthDataType, DataType, loginDataType} from "../../Api/Api";
import {actionsApp, appWorkers, sagasAppActions} from "../AppReducer/AppReducer";
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {AxiosResponse, AxiosError} from "axios";


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

    getAuth: (): AppThunk => async (dispatch: AppDispatchType) => {
        return authApi.getAuthApi().then((response) => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                dispatch(actionsAuth.setAuthData(id, login, email, true))
                dispatch(actionsApp.toggleIsFetching(false))
                return response.data.data
            } else {
                console.log(response.data.messages)
            }

        })

    },

    login: function* (actions: ReturnType<typeof sagasAuthActions.login>) {
        try {
            const res: AxiosResponse<DataType<{ userId: string }>> = yield call(authApi.logIn, actions.loginData)
            if (res.data.resultCode === 0) {
                yield put(sagasAppActions.initializeApp())
            } else {
                yield Promise.resolve(res.data.messages)
            }
        } catch (e) {
            console.log(e)
        }
    },

    logout: function* () {
        try {
            debugger
            const res: AxiosResponse<DataType<{}>> = yield call(authApi.logOut)
            if (res.data.resultCode === 0) {
                yield put(actionsAuth.setAuthData(null, null, null, false))
            } else {
                console.log(res.data.messages)
                yield put(actionsAuth.setErrorLog({["error"]: res.data.messages[0]}))
            }
        } catch (e) {
            let err = e as AxiosError
            yield put(actionsAuth.setErrorLog({["error"]: err.message}))
        }
    }

}

enum sagasConstants {
    logout = "AUTH_FETCH_LOGOUT",
    login = "AUTH-FETCH_LOGIN"

}

export const sagasAuthActions = {
    logout: () => ({type: sagasConstants.logout} as const),
    login:(loginData: loginDataType)=>({type:sagasConstants.login,loginData}as const)
}

export function* authWatcher() {
    yield takeEvery(sagasConstants.logout, authWorkers.logout)
    yield takeEvery(sagasConstants.login,authWorkers.login)
}




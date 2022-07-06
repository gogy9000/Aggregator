import {AppDispatchType, AppThunk, InferActionsTypes} from "../Redux-store";
import {authApi, loginDataType} from "../../Api/Api";
import {actionsApp, thunkApp} from "../AppReducer/AppReducer";


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


export type ActionsAuthType = InferActionsTypes<typeof actionsAuth>

export const actionsAuth = {
    setAuthData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => (
        {type: 'GET-AUTH-DATA', id, login, email, isAuth} as const),
    setErrorLog: (error: authStateType["errorLog"]) => ({type: 'SET-ERROR-LOG', error} as const)
}
export const thunkAuth = {
    getAuth: (): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const response = await authApi.getAuthApi()
            if (response.data.resultCode !== 0) {
                return
            }
            let {id, login, email} = response.data.data
            dispatch(actionsAuth.setAuthData(id, login, email, true))
            dispatch(actionsApp.toggleIsFetching(false))
            return response
        } catch (e) {
            throw e
        }


    },
    login: (loginData: loginDataType): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const res = await authApi.logIn({...loginData})
            if (res.data.resultCode === 0) {
                dispatch(thunkApp.initializeApp())
            } else {
                return res.data.messages
            }

        } catch (e) {
            console.log(e)
        }

    },
    logout: (): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const res = await authApi.logOut()
            console.log(res)
            dispatch(actionsAuth.setAuthData(null, null, null, false))

        } catch (e) {
            console.log(e)
        }
    }
}




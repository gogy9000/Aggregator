import {AppDispatchType, AppThunk, InferActionsTypes} from "../Redux-store";
import {APIProfile, authApi} from "../../Api/Api";
import {actionsAuth, thunkAuth} from "../Auth/Auth";
import {actionsProfile, thunkProfile} from "../ProfilePage/ProfilePageReducer";

export type initStateType = {
    isFetching: boolean
    isInitializedApp: boolean
}
const initState: initStateType = {
    isFetching: false,
    isInitializedApp: false

}

export type ActionsAppType = InferActionsTypes<typeof actionsApp>

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

export const actionsApp = {
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const),
    initializeApp: (isInitializedApp: boolean) => ({type: 'TOGGLE-IS-INITIALIZE-APP', isInitializedApp} as const)
}

export const thunkApp = {

    initializeApp: (): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            dispatch(actionsApp.initializeApp(true))
            dispatch(actionsApp.toggleIsFetching(true))
            let authData = await authApi.getAuthApi()
            console.log(authData)
            if (authData.data.resultCode === 0) {
                const {email, login, id} = authData.data.data
                dispatch(actionsAuth.setAuthData(id, login, email, true))
                dispatch(thunkProfile.getProfile(id))
                dispatch(thunkProfile.getProfileStatus(id))
                dispatch(thunkProfile.getUser())

            } else {
                console.log(authData)
            }

        } catch (e) {
            console.log(e)
        } finally {
            dispatch(actionsApp.toggleIsFetching(false))
            dispatch(actionsApp.initializeApp(false))
        }
    }
}

import {AppDispatchType, AppThunk, InferActionsTypes} from "../Redux-store";
import {APIProfile, authApi, AuthDataType} from "../../Api/Api";
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
            dispatch(thunkAuth.getAuth()).then((res: AuthDataType) => {
                    console.log(res)
                    if (res) {
                        dispatch(thunkProfile.getProfile(res.id))
                        dispatch(thunkProfile.getProfileStatus(res.id))
                        dispatch(thunkProfile.getUser())
                    }
                }
            )

        } catch (e) {
            console.log(e)
        } finally {
            dispatch(actionsApp.toggleIsFetching(false))
            dispatch(actionsApp.initializeApp(false))
        }
    }
}

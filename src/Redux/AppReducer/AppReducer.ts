import {AppDispatchType, AppThunk, InferActionsTypes} from "../Redux-store";
import {APIProfile, authApi} from "../../Api/Api";
import {actionsAuth, thunkAuth} from "../Auth/Auth";
import {actionsProfile} from "../ProfilePage/ProfilePageReducer";

export type initStateType = {
    isFetching: boolean
}
const initState: initStateType = {
    isFetching: false
}

export type ActionsAppType = InferActionsTypes<typeof actionsApp>

export const AppReducer = (state: initStateType = initState, action: ActionsAppType): initStateType => {
    switch (action.type) {
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const actionsApp = {

    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)
}

export const thunkApp = {

    initializeApp: (): AppThunk => async (dispatch: AppDispatchType) => {
        try {

            dispatch(actionsApp.toggleIsFetching(true))
            let authData = await authApi.getAuthApi()
            console.log(authData)
            if (authData.data.resultCode === 0) {
                const {email,login, id}= authData.data.data
                dispatch(actionsAuth.setAuthData(id,login, email))
                let authProfile = await APIProfile.getProfile(authData.data.data.id)
                if(authProfile.status===200){
                    dispatch(actionsProfile.getProfile(authProfile.data))
                }else {console.log(authProfile.statusText)}
                console.log(authProfile)
            } else {
                console.log(authData)
            }

        } catch (e) {
            console.log(e)
        }
    }
}

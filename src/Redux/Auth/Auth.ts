import {InferActionsTypes, UnionActionsType} from "../Redux-store";
import {authApi} from "../../Api/Api";
import {actionsApp} from "../AppReducer/AppReducer";

export type   authStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean

}
let initialState: authStateType = {
    id: 2,
    login: null,
    email: null,
    isAuth: false
}

export const authReducer = (state: authStateType = initialState, action: ActionsAuthType): authStateType => {
    switch (action.type) {

        case 'GET-AUTH-DATA':
            return {
                ...state,
                id: Number(action.id),
                login: action.login,
                email: action.email,
                isAuth: true
            }

        default:
            return state
    }
}


export type ActionsAuthType = InferActionsTypes<typeof actions>

export const actions = {
    getAuth: (id: string, login: string, email: string) => ({type: 'GET-AUTH-DATA', id, login, email} as const)
}

export const getAuthTC = () => (dispatch:(ac:UnionActionsType)=>void)=>{
    authApi.getAuthApi().then(
        (data:any)=>{
            if (data.resultCode!==0){return}
            let {id, login, email}=data.data
            dispatch(actions.getAuth(id, login, email))
            dispatch(actionsApp.toggleIsFetching(false))
        }
    )
}



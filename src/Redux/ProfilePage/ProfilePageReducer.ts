import {InferActionsTypes, UnionActionsType} from "../Redux-store";
import {actionsApp} from "../AppReducer/AppReducer";
import {followApi, profileApi, userApi} from "../../Api/Api";


export type PhotosObjectType = {
    small: string | null | undefined
    large: string | undefined
}
export type UserObjectType = {
    followed: boolean
    id: string
    uniqueUrlName: string | null
    name: string | null
    photos: PhotosObjectType
    status: string | null
}
export type stateProfilePageType = {
    users: Array<UserObjectType>
    profile: ApiProfileType
    currentPage: number
}
export type ApiProfileType = {
    aboutMe?: string | null
    contacts?: { facebook: string | null, website: string | null, vk: string | null, twitter: string | null, instagram: string | null }
    fullName?: string | null
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    photos?: { small: string | null, large: string | null }
    userId?: number
} | null

let initialState: stateProfilePageType = {
    users: [] as Array<UserObjectType>,
    profile: null as ApiProfileType | null,
    currentPage: 1 as number
}

export type ActionsType = InferActionsTypes<typeof actions>

export const ProfilePageReducer = (state: stateProfilePageType = initialState, action: ActionsType): stateProfilePageType => {

    switch (action.type) {

        case 'GET-PROFILE':
            console.log(action.profile)
            return {
                ...state,
                profile: {...action.profile}
            }

        case 'GET-USERS':
            console.log(state.users)
            return {...state, users: action.usersApi, currentPage: action.page}

        case 'FOLLOW':

            return {
                ...state,
                users: [...state.users.map((user: UserObjectType) => user.id === action.id ? {
                    ...user,
                    followed: true
                } : user)]
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((user: UserObjectType) => user.id === action.id ? {
                    ...user,
                    followed: false
                } : user)
            }
        default:
            return state
    }
}


export const actions = {
    getProfileAC: (profile: ApiProfileType) => ({type: 'GET-PROFILE', profile} as const),
    getUsersAC: (usersApi: Array<UserObjectType>, page: number) => ({
        type: 'GET-USERS',
        usersApi,
        page
    } as const),
    followAC: (id: string) => ({type: 'FOLLOW', id} as const),
    unfollowAC: (id: string) => ({type: 'UNFOLLOW', id} as const)
}

export const getUserTC=(
    page: number, userName?: string, isFollow?: string, count?: number)=>(
        dispatch:(action:UnionActionsType)=>void)=>{
    userApi.getAllUsersApi(page, userName, isFollow, count)
        .then((response: any) => {
        dispatch(actions.getUsersAC(response.data.items, page));
        dispatch(actionsApp.toggleIsFetching(false))
    })
}

export const getProfileTC = (userID:number|null) => (dispatch:(action:UnionActionsType)=>void)=>{
    dispatch(actionsApp.toggleIsFetching(true))
    profileApi.getProfileApi(userID)
        .then((response: any) => {
            dispatch(actions.getProfileAC(response.data))
            dispatch(actionsApp.toggleIsFetching(false))
        })
}

export const followTC = (userId:string,setDisabledButton:any) =>(dispatch:(action:UnionActionsType)=>void)=>{
    setDisabledButton(true)
    followApi.getFollowUsersApi(userId).then((response: any) => {
        if (response.data.resultCode === 0) {
            dispatch(actions.followAC(userId))
            setDisabledButton(false)
        }
    })
}

export const unFollowTC = (userId:string,setDisabledButton:any) =>(dispatch:(action:UnionActionsType)=>void)=>{
    setDisabledButton(true)
    followApi.getUnFollowUsersApi(userId).then((response: any) => {
        if (response.data.resultCode === 0) {
            dispatch(actions.unfollowAC(userId))
            setDisabledButton(false)
        }
    })
}



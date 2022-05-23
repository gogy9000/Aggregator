import {InferActionsTypes} from "../Redux-store";
import {actionsApp, ActionsAppType} from "../AppReducer/AppReducer";
import {userApi} from "../../Api/Api";


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

export const getUserThunk=(page: number, userName: string, isFollow: string, count: number)=>(dispatch:(ac:ActionsType|ActionsAppType)=>void)=>{
    dispatch(actionsApp.toggleIsFetching(false))
    userApi.getAllUsersApi(page, userName, isFollow, count).then((data: any) => {
        dispatch(actions.getUsersAC(data.items, page));
        dispatch(actionsApp.toggleIsFetching(false))
    })
}
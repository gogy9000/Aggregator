import {InferActionsTypes} from "../Redux-store";


export type PhotosObjectType = {
    small: string | null | undefined
    large: string | undefined
}
export type UserObjectType = {
    followed: boolean
    id: string | null
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
    aboutMe: string | null
    contacts: { facebook: string | null, website: string | null, vk: string | null, twitter: string | null, instagram: string | null }
    fullName: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: { small: string | null, large: string | null }
    userId: number
} | null

let initialState: stateProfilePageType = {
    users: [] as Array<UserObjectType>,
    profile: null as ApiProfileType | null,
    currentPage: 1 as number
}

export type ActionsType = InferActionsTypes<typeof actions>

export const ProfilePageReducer = (state: any = initialState, action: ActionsType) => {

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


// export type getProfileACType = { type: typeof GET_PROFILE, profile: ApiProfileType }
// const GET_PROFILE = 'GET-PROFILE'
// export const getProfileAC = (profile: ApiProfileType): getProfileACType => ({type: GET_PROFILE, profile})
//
// export type getUsersACType = { type: typeof GET_USERS, usersApi: Array<UserObjectType>, page: number }
// const GET_USERS = 'GET-USERS'
// export const getUsersAC = (usersApi: Array<UserObjectType>, page: number): getUsersACType => ({
//     type: GET_USERS,
//     usersApi,
//     page
// })
//
// type getUserACType = { type: typeof GET_USER }
// const GET_USER = 'GET-USER'
// export const getUserAC = (): getUserACType => ({type: GET_USER})
//
// type followACType = { type: typeof FOLLOW, id: number }
// const FOLLOW = 'FOLLOW'
// export const followAC = (id: number): followACType => ({type: FOLLOW, id})
//
// type unfollowACType = { type: typeof UNFOLLOW, id: number }
// const UNFOLLOW = 'UNFOLLOW'
// export const unfollowAC = (id: number): unfollowACType => ({type: UNFOLLOW, id})


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
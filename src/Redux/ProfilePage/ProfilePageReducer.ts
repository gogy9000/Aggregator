import {AppDispatchType, AppStateType, AppThunk, InferActionsTypes, UnionActionsType} from "../Redux-store";
import {actionsApp} from "../AppReducer/AppReducer";
import {followApi, APIProfile, userApi, ProfileType, UsersDataType, UserDataType} from "../../Api/Api";

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
    users: Array<UserDataType>
    profile: ProfileType
    currentPage: number
    profileStatus: string
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
    users: [] as Array<UserDataType>,
    profile: {} as ProfileType ,
    currentPage: 1 as number,
    profileStatus: 'zasd' as string

}

export type ActionsType = InferActionsTypes<typeof actionsProfile>

export const ProfilePageReducer = (state: stateProfilePageType = initialState, action: ActionsType): stateProfilePageType => {

    switch (action.type) {

        case EnumProfile.getProfile:
            return {
                ...state,
                profile: action.profile
            }

        case EnumProfile.getUsers:
            return {...state, users: action.usersApi, currentPage: action.page}

        case EnumProfile.follow:

            return {
                ...state,
                users: [...state.users.map((user: UserDataType) => user.id === action.id
                    ? {...user, followed: true} : user)]
            }

        case EnumProfile.unfollow:
            return {
                ...state,
                users: state.users.map((user: UserDataType) => user.id === action.id ? {
                    ...user,
                    followed: false
                } : user)
            }
        case EnumProfile.updateProfileStatus:
            return {...state, profileStatus: action.newStatus}
        default:
            return state
    }
}

export enum EnumProfile {
    getProfile = 'GET-PROFILE',
    getUsers = 'GET-USERS',
    follow = 'FOLLOW',
    unfollow = 'UNFOLLOW',
    updateProfileStatus = 'UPDATE-PROFILE-STATUS'
}


export const actionsProfile = {
    getProfile: (profile: ProfileType) => ({type: EnumProfile.getProfile, profile} as const),
    getUsers: (usersApi: Array<UserDataType>, page: number=1) => ({
        type: EnumProfile.getUsers,
        usersApi,
        page
    } as const),
    follow: (id: number) => ({type: EnumProfile.follow, id} as const),
    unfollow: (id: number) => ({type: EnumProfile.unfollow, id} as const),
    updateProfileStatus: (newStatus: string) => ({type: EnumProfile.updateProfileStatus, newStatus} as const)
}
export const thunkProfile = {
    getProfileStatus: (userId: number):AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const res = await APIProfile.getProfileStatus(userId)
            if(res.status===200){
                dispatch(actionsProfile.updateProfileStatus(res.data))
                console.log(res)

            }else {
                console.log(res.statusText)}

        } catch (e) {
            throw e
        }
    },
    updateProfileStatus: (newStatus: string): AppThunk => async (dispatch: AppDispatchType) => {
        try {

            const res = await APIProfile.updateProfileStatus(newStatus)
            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(actionsProfile.updateProfileStatus(newStatus))
            } else {
                console.log(res.data.messages)
            }
        } catch (e) {
            throw e
        }
    },

    getUser: (
        page?: number, userName?: string, isFollow?: string, count?: number):AppThunk => async (
        dispatch: AppDispatchType) => {
        userApi.getUsersApi(page, userName, isFollow, count)
            .then((response) => {
                dispatch(actionsProfile.getUsers(response.data.items, page));
                dispatch(actionsApp.toggleIsFetching(false))
            })
    },
    getProfile: (userID: number) => (dispatch: (action: UnionActionsType) => void) => {
        dispatch(actionsApp.toggleIsFetching(true))
        APIProfile.getProfile(userID)
            .then((response: any) => {
                dispatch(actionsProfile.getProfile(response.data))
                dispatch(actionsApp.toggleIsFetching(false))
            })
    },
    follow: (userId: number, setDisabledButton: any) => (dispatch: (action: UnionActionsType) => void) => {
        setDisabledButton(true)
        followApi.getFollowUsers(userId).then((response: any) => {
            if (response.data.resultCode === 0) {
                dispatch(actionsProfile.follow(userId))
                setDisabledButton(false)
            }
        })
    },
    unFollow: (userId: number, setDisabledButton: any) => (dispatch: (action: UnionActionsType) => void) => {
        setDisabledButton(true)
        followApi.getUnFollowUsers(userId).then((response: any) => {
            if (response.data.resultCode === 0) {
                dispatch(actionsProfile.unfollow(userId))
                setDisabledButton(false)
            }
        })
    },

}










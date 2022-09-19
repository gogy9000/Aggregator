import {AppDispatchType, AppStateType, AppThunk, InferActionsTypes, UnionActionsType} from "../Redux-store";
import {actionsApp} from "../AppReducer/AppReducer";
import {followApi, APIProfile, userApi, ProfileType, UsersDataType, UserDataType, DataType} from "../../Api/Api";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosError, AxiosResponse} from "axios";
import {errorsInterceptor} from "../../utils/ErrorsInterceptor/ErrorsInterceptor";
import {errorsLogActions} from "../ErrorLog";

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
    profile: {} as ProfileType,
    currentPage: 1 as number,
    profileStatus: 'zasd' as string

}

export type ActionsType = InferActionsTypes<typeof actionsProfile | typeof profileActivators>

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
    getUsers: (usersApi: Array<UserDataType>, page: number = 1) => ({
        type: EnumProfile.getUsers,
        usersApi,
        page
    } as const),
    follow: (id: number) => ({type: EnumProfile.follow, id} as const),
    unfollow: (id: number) => ({type: EnumProfile.unfollow, id} as const),
    updateProfileStatus: (newStatus: string) => ({type: EnumProfile.updateProfileStatus, newStatus} as const)
}

export enum profileConst {
    getProfileStatus = "PROFILE/GET_PROFILE_STATUS",
    updateProfileStatus = "PROFILE/UPDATE_PROFILE_STATUS",
    getUser = "PROFILE/GET_USER",
    getProfile = "PROFILE/GET_PROFILE",
    follow = "PROFILE/FOLLOW",
    unFollow = "PROFILE/UNFOLLOW"
}

export const profileActivators = {
    getProfileStatus: (userId: number) => ({type: profileConst.getProfileStatus, userId} as const),
    updateProfileStatus: (newStatus: string) => ({type: profileConst.updateProfileStatus, newStatus} as const),
    getUser: (payload?: { page?: number, userName?: string, isFollow?: string, count?: number }) => (
        {type: profileConst.getUser, payload} as const),
    getProfile: (userID: number) => ({type: profileConst.getProfile, userID} as const),
    follow: (payload: { userId: number, setDisabledButton: any }) => ({type: profileConst.follow, payload} as const),
    unFollow: (payload: { userId: number, setDisabledButton: any }) => ({
        type: profileConst.unFollow,
        payload
    } as const),
}

export const profileWorkers = {
    getProfileStatus: function* (action: ReturnType<typeof profileActivators.getProfileStatus>) {
        try {
            const res: AxiosResponse<string> = yield call(APIProfile.getProfileStatus, action.userId)
            if (res.status === 200) {
                yield put(actionsProfile.updateProfileStatus(res.data))
            } else {
             yield  call(errorsInterceptor,res.statusText)
            }
        } catch (e) {
           yield call(errorsInterceptor,e)
        }
    },
    updateProfileStatus: function* (action: ReturnType<typeof profileActivators.updateProfileStatus>) {
        try {
            const res: AxiosResponse<DataType<{}>> = yield call(APIProfile.updateProfileStatus, action.newStatus)
            if (res.data.resultCode === 0) {
                yield put(actionsProfile.updateProfileStatus(action.newStatus))
            } else {
                yield  call(errorsInterceptor,res.data.messages)
            }
        } catch (e) {
            yield call(errorsInterceptor,e)
        }
    },

    getUsers: function* (action: ReturnType<typeof profileActivators.getUser>) {
        const response: AxiosResponse<UsersDataType> = yield call(userApi.getUsersApi, action.payload)
        yield put(actionsProfile.getUsers(response.data.items, action.payload?.page));
        yield put(actionsApp.toggleIsFetching(false))
    },
    getProfile: function* (action: ReturnType<typeof profileActivators.getProfile>) {
        yield put(actionsApp.toggleIsFetching(true))
        const response: AxiosResponse<ProfileType> = yield call(APIProfile.getProfile, action.userID)
        yield put(actionsProfile.getProfile(response.data))
        yield put(actionsApp.toggleIsFetching(false))
    },
    follow: function* (action: ReturnType<typeof profileActivators.follow>) {
        action.payload.setDisabledButton(true)
       try {
           const response: AxiosResponse = yield call(followApi.followUser, action.payload.userId)
           console.log(response)
           if (response.data.resultCode === 0) {
               yield put(actionsProfile.follow(action.payload.userId))
           }
       }catch (e) {
            const err =e as AxiosError
           console.log(err.response)
           action.payload.setDisabledButton(false)
       }

    },
    unFollow: function* (action: ReturnType<typeof profileActivators.unFollow>) {
        action.payload.setDisabledButton(true)
        const response: AxiosResponse = yield call(followApi.unfollowUser, action.payload.userId)
        if (response.data.resultCode === 0) {
            yield put(actionsProfile.unfollow(action.payload.userId))
            action.payload.setDisabledButton(false)
        }
    },

}

export function* profileWatcher() {
    yield takeEvery(profileConst.getProfileStatus, profileWorkers.getProfileStatus)
    yield takeEvery(profileConst.updateProfileStatus, profileWorkers.updateProfileStatus)
    yield takeEvery(profileConst.getUser, profileWorkers.getUsers)
    yield takeEvery(profileConst.getProfile, profileWorkers.getProfile)
    yield takeEvery(profileConst.follow, profileWorkers.follow)
    yield takeEvery(profileConst.unFollow, profileWorkers.unFollow)
}










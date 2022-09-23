import {AppDispatchType, AppRootStateType, AppThunk, InferActionsTypes, UnionActionsType} from "../Redux-store";
import {actionsApp} from "../AppReducer/AppReducer";
import {followApi, APIProfile, userApi, ProfileType, UsersDataType, UserDataType, DataType} from "../../Api/Api";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {errorsInterceptor} from "../../utils/ErrorsInterceptor/ErrorsInterceptor";


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
    fetchingList: { [id: string]: boolean }
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
    users: [],
    profile: {} as ProfileType,
    currentPage: 1,
    profileStatus: '' as string,
    fetchingList: {}

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
        case EnumProfile.addIdInFetchingList:
            return {
                ...state,
                fetchingList: {...state.fetchingList, [action.id]: true}
            }
        case EnumProfile.removeIdInFetchingList:
            const newFetchingList = {...state.fetchingList}
            delete newFetchingList[action.id]
            return {
                ...state,
                fetchingList: newFetchingList
            }
        default:
            return state
    }
}

export enum EnumProfile {
    getProfile = 'PROFILE/GET-PROFILE/ACTION',
    getUsers = 'PROFILE/GET-USERS/ACTION',
    follow = 'PROFILE/FOLLOW/ACTION',
    unfollow = 'PROFILE/UNFOLLOW/ACTION',
    updateProfileStatus = 'PROFILE/UPDATE-PROFILE-STATUS/ACTION',
    addIdInFetchingList = 'PROFILE/ADD-ID-IN-FETCHING-LIST/ACTION',
    removeIdInFetchingList = 'PROFILE/REMOVE-ID-IN-FETCHING-LIST/ACTION'
}
export enum ProfileConst {
    getProfileStatus = "PROFILE/GET_PROFILE_STATUS/ACTIVATOR",
    updateProfileStatus = "PROFILE/UPDATE_PROFILE_STATUS/ACTIVATOR",
    getUser = "PROFILE/GET_USER/ACTIVATOR",
    getProfile = "PROFILE/GET_PROFILE/ACTIVATOR",
    follow = "PROFILE/FOLLOW/ACTIVATOR",
    unFollow = "PROFILE/UNFOLLOW/ACTIVATOR"
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
    updateProfileStatus: (newStatus: string) => ({type: EnumProfile.updateProfileStatus, newStatus} as const),
    addIdInFetchingList: (id: number) => ({type: EnumProfile.addIdInFetchingList, id} as const),
    removeIdInFetchingList: (id: number) => ({type: EnumProfile.removeIdInFetchingList, id} as const)
}



export const profileActivators = {
    getProfileStatus: (userId: number) => ({type: ProfileConst.getProfileStatus, userId} as const),
    updateProfileStatus: (newStatus: string) => ({type: ProfileConst.updateProfileStatus, newStatus} as const),
    getUser: (payload?: { page?: number, userName?: string, isFollow?: string, count?: number }) => (
        {type: ProfileConst.getUser, payload} as const),
    getProfile: (userID: number) => ({type: ProfileConst.getProfile, userID} as const),
    follow: (payload: { userId: number }) => ({type: ProfileConst.follow, payload} as const),
    unFollow: (payload: { userId: number }) => ({
        type: ProfileConst.unFollow,
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
                yield  call(errorsInterceptor, res.statusText)
            }
        } catch (e) {
            yield call(errorsInterceptor, e)
        }
    },
    updateProfileStatus: function* (action: ReturnType<typeof profileActivators.updateProfileStatus>) {
        try {
            const res: AxiosResponse<DataType<{}>> = yield call(APIProfile.updateProfileStatus, action.newStatus)
            if (res.data.resultCode === 0) {
                yield put(actionsProfile.updateProfileStatus(action.newStatus))
            } else {
                yield  call(errorsInterceptor, res.data.messages)
            }
        } catch (e) {
            yield call(errorsInterceptor, e)
        }
    },
    getUsers: function* (action: ReturnType<typeof profileActivators.getUser>) {
        try {
            yield put(actionsApp.toggleIsFetching(true))
            const response: AxiosResponse<UsersDataType> = yield call(userApi.getUsersApi, action.payload)
            if (response.status === 200) {
                yield put(actionsProfile.getUsers(response.data.items, action.payload?.page));
            } else {
                yield  call(errorsInterceptor, response.data.error)
            }
        } catch (e) {
            yield call(errorsInterceptor, e)
        } finally {
            yield put(actionsApp.toggleIsFetching(false))
        }

    },
    getProfile: function* (action: ReturnType<typeof profileActivators.getProfile>) {
        try {
            yield put(actionsApp.toggleIsFetching(true))
            const response: AxiosResponse<ProfileType> = yield call(APIProfile.getProfile, action.userID)
            yield put(actionsProfile.getProfile(response.data))
        } catch (e) {
            yield call(errorsInterceptor, e)
        } finally {
            yield put(actionsApp.toggleIsFetching(false))
        }
    },
    follow: function* (action: ReturnType<typeof profileActivators.follow>) {
        try {
            yield put(actionsProfile.addIdInFetchingList(action.payload.userId))
            const response: AxiosResponse<DataType<{}>> = yield call(followApi.followUser, action.payload.userId)
            if (response.data.resultCode === 0) {
                yield put(actionsProfile.follow(action.payload.userId))
            } else {
                yield call(errorsInterceptor, response.data.messages)
            }
        } catch (e) {
            yield call(errorsInterceptor, e)
        } finally {
            yield put(actionsProfile.removeIdInFetchingList(action.payload.userId))
        }

    },
    unFollow: function* (action: ReturnType<typeof profileActivators.unFollow>) {
        try {
            yield put(actionsProfile.addIdInFetchingList(action.payload.userId))
            const response: AxiosResponse = yield call(followApi.unfollowUser, action.payload.userId)
            if (response.data.resultCode === 0) {
                yield put(actionsProfile.unfollow(action.payload.userId))
            } else {
                yield call(errorsInterceptor, response.data.messages)
            }
        } catch (e) {
            yield call(errorsInterceptor, e)
        } finally {
            yield put(actionsProfile.removeIdInFetchingList(action.payload.userId))
        }

    },

}

export function* profileWatcher() {
    yield takeEvery(ProfileConst.getProfileStatus, profileWorkers.getProfileStatus)
    yield takeEvery(ProfileConst.updateProfileStatus, profileWorkers.updateProfileStatus)
    yield takeEvery(ProfileConst.getUser, profileWorkers.getUsers)
    yield takeEvery(ProfileConst.getProfile, profileWorkers.getProfile)
    yield takeEvery(ProfileConst.follow, profileWorkers.follow)
    yield takeEvery(ProfileConst.unFollow, profileWorkers.unFollow)
}










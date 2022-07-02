import {AppDispatchType, AppStateType, AppThunk, InferActionsTypes, UnionActionsType} from "../Redux-store";
import {actionsApp} from "../AppReducer/AppReducer";
import {followApi, APIProfile, userApi} from "../../Api/Api";

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
    users: [] as Array<UserObjectType>,
    profile: null as ApiProfileType | null,
    currentPage: 1 as number,
    profileStatus: 'zasd' as string

}

export type ActionsType = InferActionsTypes<typeof actionsProfile>

export const ProfilePageReducer = (state: stateProfilePageType = initialState, action: ActionsType): stateProfilePageType => {

    switch (action.type) {

        case EnumProfile.getProfile:
            return {
                ...state,
                profile: {...action.profile}
            }

        case EnumProfile.getUsers:
            return {...state, users: action.usersApi, currentPage: action.page}

        case EnumProfile.follow:

            return {
                ...state,
                users: [...state.users.map((user: UserObjectType) => user.id === action.id ? {
                    ...user,
                    followed: true
                } : user)]
            }

        case EnumProfile.unfollow:
            return {
                ...state,
                users: state.users.map((user: UserObjectType) => user.id === action.id ? {
                    ...user,
                    followed: false
                } : user)
            }
        case EnumProfile.updateProfileStatus:
            return {...state, profileStatus:action.newStatus}
        default:
            return state
    }
}

export enum EnumProfile {
    getProfile='GET-PROFILE',
    getUsers='GET-USERS',
    follow='FOLLOW',
    unfollow='UNFOLLOW',
    updateProfileStatus='UPDATE-PROFILE-STATUS'
}



export const actionsProfile = {
    getProfile: (profile: ApiProfileType) => ({type: EnumProfile.getProfile, profile} as const),
    getUsers: (usersApi: Array<UserObjectType>, page: number) => ({
        type: EnumProfile.getUsers,
        usersApi,
        page
    } as const),
    follow: (id: string) => ({type: EnumProfile.follow, id} as const),
    unfollow: (id: string) => ({type: EnumProfile.unfollow, id} as const),
    updateProfileStatus: (newStatus: string) => ({type: EnumProfile.updateProfileStatus, newStatus} as const)
}
export const thunkProfile={
    getProfileStatus:(userId:number)=>async (dispatch:AppDispatchType, getState:AppStateType)=>{
       try{

           const res=await APIProfile.getProfileStatus(userId)
           dispatch(actionsProfile.updateProfileStatus(res.data))
           console.log(res)
       } catch (e) {
           throw e
       }
    },
    updateProfileStatus:(newStatus:string):AppThunk=>async (dispatch:AppDispatchType)=>{
        try{
          const res=await APIProfile.updateProfileStatus(newStatus)
            console.dir(res)
            if (res.data.resultCode===0){
                dispatch(actionsProfile.updateProfileStatus(newStatus))
            }
        }catch (e) {
            throw e
        }
    },

     getUser : (
        page: number, userName?: string, isFollow?: string, count?: number) =>async (
        dispatch: (action: UnionActionsType) => void) => {
        userApi.getAllUsersApi(page, userName, isFollow, count)
            .then((response: any) => {
                dispatch(actionsProfile.getUsers(response.data.items, page));
                dispatch(actionsApp.toggleIsFetching(false))
            })
    },
     getProfile : (userID: number ) => (dispatch: (action: UnionActionsType) => void) => {
        dispatch(actionsApp.toggleIsFetching(true))
        APIProfile.getProfile(userID)
            .then((response: any) => {
                dispatch(actionsProfile.getProfile(response.data))
                dispatch(actionsApp.toggleIsFetching(false))
            })
    },
     follow : (userId: string, setDisabledButton: any) => (dispatch: (action: UnionActionsType) => void) => {
        setDisabledButton(true)
        followApi.getFollowUsers(userId).then((response: any) => {
            if (response.data.resultCode === 0) {
                dispatch(actionsProfile.follow(userId))
                setDisabledButton(false)
            }
        })
    },
     unFollow : (userId: string, setDisabledButton: any) => (dispatch: (action: UnionActionsType) => void) => {
        setDisabledButton(true)
        followApi.getUnFollowUsers(userId).then((response: any) => {
            if (response.data.resultCode === 0) {
                dispatch(actionsProfile.unfollow(userId))
                setDisabledButton(false)
            }
        })
    }


}










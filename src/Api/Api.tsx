import axios, {AxiosResponse} from 'axios'
import {ApiProfileType} from "../Redux/ProfilePage/ProfilePageReducer";

export type loginDataType={
    email:string
    password:string
    rememberMe?:boolean
    captcha?:boolean
}
export type UsersDataType={
    error: string|null
    items: UserDataType[],
totalCount: number
}

export type UserDataType={
    followed: boolean
    id: number
    name: string
    photos: {small: string|null, large: string|null}
    status: string|null
    uniqueUrlName: string|null
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "1fb0efe7-1c1f-46ce-bb74-74ed02f7875f"}
})

export const userApi = {
    getUsersApi: (payload?:{page?: number , term?: string , friend?: string , count?: number }) => instance.get(
        `users`,{params:payload}).then((res:AxiosResponse<UsersDataType>)=> res)}

export const followApi = {
    followUser:(userId: number ) => instance.post<DataType<{}>>(`/follow/${userId}`),
    unfollowUser: (userId: number) => instance.delete<DataType<{}>>(`follow/${userId}`),
    isFollowUser:(userId: number)=>instance.get<boolean>(`follow/${userId}`)
}

export const APIProfile = {
    getProfile: (userId: number ) => instance.get(`profile/${userId}`).then((res:AxiosResponse<ProfileType>)=>res),
    updateProfile:(updatingProfile:ApiProfileType)=>instance.put(`profile`,{updatingProfile}),
    getProfileStatus:(userId:number)=>instance.get(`profile/status/${userId}`).then((res:AxiosResponse<string>)=>res),
    updateProfileStatus:(newStatus:string)=>instance.put(`profile/status`,{status:newStatus})
        .then((res:AxiosResponse<DataType<{}>>)=>res),
    updateProfilePhoto:(newImage:File)=>instance.put(`profile/photo`,{image:newImage}),
}

export const authApi={
    getAuthApi:()=>instance.get(`auth/me`).then((res:AxiosResponse<DataType<AuthDataType>>)=>res),

    logIn:(loginData:loginDataType)=>instance.post(`/auth/login`,{...loginData})
        .then((res:AxiosResponse<DataType<{userId:string}>>)=>res),

    logOut:()=>instance.delete(`/auth/login`).then((res:AxiosResponse<DataType<{}>>)=>res)
}

export type AuthDataType={
    email: string
    id: number
    login: string
}
export type DataType<D=any>={
    data:D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type ProfileType ={
    aboutMe: string|null
    contacts: {
        facebook: string|null,
        website: string|null,
        vk: string|null,
        twitter: string|null,
        instagram: string|null,
        mainLink: string|null,
        youtube: string|null
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string|null
    photos: {small: string|null, large: string|null}
    userId: number
}

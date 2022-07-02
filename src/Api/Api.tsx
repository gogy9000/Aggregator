import  axios from 'axios'
import {ApiProfileType} from "../Redux/ProfilePage/ProfilePageReducer";

export type loginDataType={
    email:string
    password:string
    rememberMe?:boolean
    captcha?:boolean
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "c73c3d73-c86d-4ccb-b780-4d18cdc9edd5"}
})

export const userApi = {
    getAllUsersApi: (page: number = 1, term: string = '', friend: string = '', count: number = 10) => instance.get(
        `users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
}

export const followApi = {
    getFollowUsers: (userId: string ) => instance.post(`follow/${userId}`),
    getUnFollowUsers: (userId: string) => instance.delete(`follow/${userId}`),
    isFollowUser:(userId: string)=>instance.get(`follow/${userId}`)
}

export const profileApi = {
    getProfile: (userId: number ) => instance.get(`profile/${userId}`),
    updateProfile:(updatingProfile:ApiProfileType)=>instance.put(`profile`,{updatingProfile}),
    getProfileStatus:(userId:number)=>instance.get(`profile/status/${userId}`),
    updateProfileStatus:(newStatus:number)=>instance.put(`profile/status`,{status:newStatus}),
    updateProfilePhoto:(newImage:File)=>instance.put(`profile/photo`,{image:newImage}),
}

export const authApi={
    getAuthApi:()=>instance.get(`auth/me`),
    logIn:(loginData:loginDataType)=>instance.post(`/auth/login`,{loginData}),
    logOut:()=>instance.delete(`/auth/login`)

}


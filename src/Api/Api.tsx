import * as axios from 'axios'
import {actions, ActionsType} from "../Redux/ProfilePage/ProfilePageReducer";
import {actionsApp, ActionsAppType} from "../Redux/AppReducer/AppReducer";

// @ts-ignore
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "c73c3d73-c86d-4ccb-b780-4d18cdc9edd5"}

})

export const userApi = {
    getAllUsersApi: (page: number = 1, term: string = '', friend: string = '', count: number = 10) => instance.get(
        `users?count=${count}&page=${page}&term=${term}&friend=${friend}`).then((response: any) => response.data)
}

export const followApi = {
    getFollowUsersApi: (userId: string | null) => instance.post(`follow/${userId}`).then(
        (response: any) => response.data),

    getUnFollowUsersApi: (userId: string) => instance.delete(`follow/${userId}`).then(
        (response: any) => response.data)
}

export const profileApi = {
    getProfileApi: (userId: number | null) => instance.get(`profile/${userId}`).then(
        (response: any) => response.data
    )
}
export const authApi={
    getAuthApi:()=>instance.get(`auth/me`).then(
        (response:any)=>response.data
    )
}


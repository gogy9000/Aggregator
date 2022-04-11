import * as axios from 'axios'
import {getUsersAC, getUsersACType} from "../Redux/ProfilePage/ProfilePageReducer";
import React from "react";

type getUsersApiType={
    dispatch:(getUsersAC:getUsersACType)=>void
    page?: number
    count?:number
    friend?:boolean
    term?:string

}

export const getAllUsersApi =(dispatch:(getUsersAC:getUsersACType)=>void, page:number=1):getUsersApiType => {
    // @ts-ignore
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}`).then(
        (response: any) => {
            dispatch(getUsersAC(response.data.items,page));
        }
    );
}

export const getFollowUsersApi=(dispatch:(getUsersAC:getUsersACType)=>void,page: number =1,count:number,friend:boolean,term:string) => {

    // @ts-ignore
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}`).then(
        (response: any) => {
            dispatch(getUsersAC(response.data.items,page));
        }
    );
}

export const getUnFollowUsersApi=(dispatch:(getUsersAC:getUsersACType)=>void,page: number =1,count:number,friend:boolean,term:string) => {

    // @ts-ignore
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}`).then(
        (response: any) => {
            dispatch(getUsersAC(response.data.items,page));
        }
    );
}
import * as axios from 'axios'
import {getProfileAC, getProfileACType, getUsersAC, getUsersACType} from "../Redux/ProfilePage/ProfilePageReducer";
import React from "react";


type getUsersApiType={
    dispatch?:(getUsersAC:getUsersACType)=>void
    page?: number
    count?:number
    friend?:string
    term?:string

}



export const getAllUsersApi =(
    dispatch:(getUsersAC:getUsersACType)=>void,
    page:number=1,term:string='',
    friend:string=''):getUsersApiType => {
    // @ts-ignore
    return axios.get(
        `https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}&term=${term}&friend=${friend}`
    )
        .then(
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
            console.log(response)
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

export const getProfileApi=( dispatch:(getProfileAC:getProfileACType)=>void, userId:number=2) => {

    // @ts-ignore
    return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/16495`).then(
        (response: any) => {

            dispatch(getProfileAC(response.data))
        }
    );
}
import * as axios from 'axios'
import {actions, ActionsType} from "../Redux/ProfilePage/ProfilePageReducer";
import React from "react";


type getUsersApiType={
    dispatch?:(getUsersAC:ActionsType)=>void
    page?: number
    count?:number
    friend?:string
    term?:string
    userId?:number

}



export const getAllUsersApi =(
    dispatch:(getUsersAC:ActionsType)=>void,
    page:number=1,term:string='',
    friend:string=''):getUsersApiType => {
    // @ts-ignore
    return axios.get(
        `https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}&term=${term}&friend=${friend}`
    )
        .then(
        (response: any) => {
            dispatch(actions.getUsersAC(response.data.items,page));
        }
    );
}

export const getFollowUsersApi=(dispatch:(getUsersAC:ActionsType)=>void,page: number =1,count:number,friend:boolean,term:string) => {

    // @ts-ignore
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}`).then(
        (response: any) => {

            dispatch(actions.getUsersAC(response.data.items,page));
            console.log(response)
        }
    );
}

export const getUnFollowUsersApi=(dispatch:(getUsersAC:ActionsType)=>void,page: number =1,count:number,friend:boolean,term:string) => {

    // @ts-ignore
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}`).then(
        (response: any) => {
            dispatch(actions.getUsersAC(response.data.items,page));
        }
    );
}


export const getProfileApi=( dispatch:(getProfileAC:ActionsType)=>void, userId:number=16495):getUsersApiType => {
    // console.log(userId)
    // @ts-ignore
    return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(
        (response: any) => {

            dispatch(actions.getProfileAC(response.data))
        }
    );
}
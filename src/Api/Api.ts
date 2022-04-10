import * as axios from 'axios'
import {getUsersAC, getUsersACType} from "../Redux/ProfilePage/ProfilePageReducer";
import React from "react";


export const getUsersApi=(dispatch:(getUsersAC:getUsersACType)=>void,page: number =1) => {

    // @ts-ignore
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}`).then(
        (response: any) => {
            dispatch(getUsersAC(response.data.items,page));
        }
    );
}
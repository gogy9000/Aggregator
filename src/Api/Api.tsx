import * as axios from 'axios'
import {actions, ActionsType} from "../Redux/ProfilePage/ProfilePageReducer";
import {actionsApp,ActionsAppType} from "../Redux/App/AppReducer";

    // @ts-ignore
const instance= axios.create({
        withCredentials:true,
        baseURL:'https://social-network.samuraijs.com/api/1.0/',
        headers: {"API-KEY": "9998b652-b16b-4b0d-b784-98bbaf34a6e7"}

    })

export const getAllUsersApi =(page:number=1,term:string='', friend:string=''):any => {

  return   instance.get(`users?count=9&page=${page}&term=${term}&friend=${friend}`)
        .then(
        (response: any) => {
            return response.data
        }
    );
}

export const getFollowUsersApi=(userId:string|null) => {


    return instance.post(`follow/${userId}`).then(
        (response: any) => {
            return response.data
        }
    );
}

export const getUnFollowUsersApi=(userId:string) => {

    return instance.delete(`follow/${userId}`).then((response: any) => response.data);
}



export const getProfileApi= ( userId: number|null) => {

    return  instance.get(`profile/${userId}`).then(
        (response: any) => response.data

    );
}
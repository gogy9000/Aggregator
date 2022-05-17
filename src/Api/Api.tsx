import * as axios from 'axios'
import {actions, ActionsType} from "../Redux/ProfilePage/ProfilePageReducer";
import {actionsApp,ActionsAppType} from "../Redux/App/AppReducer";



type getUsersApiType={
    dispatch?:(actions:ActionsType)=>void
    page?: number
    count?:number
    friend?:string
    term?:string
    userId?:number

}



export const getAllUsersApi =(
    dispatch:(getUsersAC:ActionsType|ActionsAppType)=>void,
    page:number=1,term:string='',
    friend:string='') => {

    dispatch(actionsApp.toggleIsFetching(true))
    // @ts-ignore
    axios.get(
        `https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}&term=${term}&friend=${friend}`,{withCredentials:true}
    )
        .then(
        (response: any) => {

            dispatch(actions.getUsersAC(response.data.items,page));
            dispatch(actionsApp.toggleIsFetching(false))
        }
    );
}

export const getFollowUsersApi=(dispatch:(actions:ActionsType)=>void,userId:string) => {

    // @ts-ignore
    return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,{},{
        withCredentials:true,
        headers: {"API-KEY": "9998b652-b16b-4b0d-b784-98bbaf34a6e7"}
    }).then(
        (response: any) => {
            if(response.data.resultCode===0){dispatch(actions.followAC(userId))}
        }
    );
}

export const getUnFollowUsersApi=(dispatch:(actions:ActionsType)=>void,userId:string) => {

    // @ts-ignore
    return axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,{
        withCredentials:true,
        headers: {"API-KEY": "9998b652-b16b-4b0d-b784-98bbaf34a6e7"}
    }).then(
        (response: any) => {
            if(response.data.resultCode===0){dispatch(actions.unfollowAC(userId))}
        }
    );
}



export const getProfileApi= (dispatch: (getProfileAC: ActionsType|ActionsAppType) => void, userId: number|null) => {
    dispatch(actionsApp.toggleIsFetching(true))
    // @ts-ignore
     axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`,{withCredentials:true}).then(
        (response: any) => {

            dispatch(actions.getProfileAC(response.data))
            dispatch(actionsApp.toggleIsFetching(false))
        }
    );
}
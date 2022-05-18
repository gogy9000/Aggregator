import * as axios from 'axios'
import {actions, ActionsType} from "../Redux/ProfilePage/ProfilePageReducer";
import {actionsApp,ActionsAppType} from "../Redux/App/AppReducer";



export const getAllUsersApi =(page:number=1,term:string='', friend:string=''):any => {
    // @ts-ignore
  return   axios.get(
        `https://social-network.samuraijs.com/api/1.0/users?count=9&page=${page}&term=${term}&friend=${friend}`,
        {withCredentials:true}
    )
        .then(
        (response: any) => {
            return response.data
        }
    );
}

export const getFollowUsersApi=(userId:string) => {

    // @ts-ignore
    return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,{},{
        withCredentials:true,
        headers: {"API-KEY": "9998b652-b16b-4b0d-b784-98bbaf34a6e7"}
    }).then(
        (response: any) => {
            return response.data
        }
    );
}

export const getUnFollowUsersApi=(userId:string) => {

    // @ts-ignore
    return axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,{
        withCredentials:true,
        headers: {"API-KEY": "9998b652-b16b-4b0d-b784-98bbaf34a6e7"}
    }).then(
        (response: any) => {
            return response.data
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
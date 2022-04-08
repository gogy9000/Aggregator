import React from "react";

type PhotosObjectType={
    small: string|null
    large: string|null
}

type UserObjectType={
    followed: boolean
    id: number
    uniqueUrlName: string|null
    name: string|null
    photos: PhotosObjectType
    status: string|null
}
type stateProfilePageType={
    users: Array<UserObjectType>
}

let initialState: stateProfilePageType = {
    users: [
        {
            followed: false,
            id: 23318,
            uniqueUrlName: null,
            name: "StanisLOVE",
            photos: {small: null, large: null},
            status: null,
        }
    ]
}
type actionCreatorType={
    action:getUsersACType|getUserACType|followACType|unfollowACType
}

type ProfilePageReducerType={
    state:Array<UserObjectType>|undefined
    action:actionCreatorType|undefined

}

const ProfilePageReducer = (state: any= initialState, action:any) => {

    switch (action.type) {

        case 'GET-USERS':
            console.log(action.usersApi)
            return {...state,users:action.usersApi}

        case 'GET-USER':

            return {...state.filter((user: UserObjectType) => user.name === action.name)}

        case 'FOLLOW':


            return {
                ...state,
                users: [...state.users.map((user: any) => user.id === action.id ? {...user, followed: true} : user)]
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((user: any) => user.id === action.id ? {...user, followed: false} : user)
            }
        default:
            return state
    }
}



export type getUsersACType={type:typeof GET_USERS,usersApi:Array<UserObjectType> }
const GET_USERS = 'GET-USERS'
export const getUsersAC = (usersApi:Array<UserObjectType>):getUsersACType=> ({type: GET_USERS, usersApi})

type getUserACType={type:typeof GET_USER }
const GET_USER = 'GET-USER'
export const getUserAC = ():getUserACType => ({type: GET_USER})

type followACType={type:typeof FOLLOW, id:number }
const FOLLOW = 'FOLLOW'
export const followAC = (id: number):followACType => ({type: FOLLOW, id})

type unfollowACType={type:typeof UNFOLLOW, id:number }
const UNFOLLOW = 'UNFOLLOW'
export const unfollowAC = (id: number):unfollowACType => ({type: UNFOLLOW, id})

export default ProfilePageReducer
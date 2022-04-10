import React from "react";

export type PhotosObjectType={
    small: string|null
    large: string|null
}

 export type UserObjectType={
    followed: boolean
    id: number|null
    uniqueUrlName: string|null
    name: string|null
    photos: PhotosObjectType
    status: string|null
}
export type stateProfilePageType={
    users: Array<UserObjectType>
    currentPage: number
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
    ],
    currentPage: 1
}


const ProfilePageReducer = (state: any= initialState, action:any) => {

    switch (action.type) {

        case 'GET-USERS':
            // console.log(action.usersApi)
            return {...state,users:action.usersApi,currentPage:action.page}

        case 'GET-USER':

            return {...state.filter((user: UserObjectType) => user.name === action.name)}

        case 'FOLLOW':

            return {
                ...state,
                users: [...state.users.map((user: UserObjectType) => user.id === action.id ? {...user, followed: true} : user)]
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((user: UserObjectType) => user.id === action.id ? {...user, followed: false} : user)
            }
        default:
            return state
    }
}



export type getUsersACType={type:typeof GET_USERS,usersApi:Array<UserObjectType>,page:number }
const GET_USERS = 'GET-USERS'
export const getUsersAC = (usersApi:Array<UserObjectType>,page:number):getUsersACType=> ({type: GET_USERS, usersApi,page})

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
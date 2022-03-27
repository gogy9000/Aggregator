import {avaPhoto} from "../../photo/photo";

let initialState: any = {
    users: [
        {id: 0, name: 'sasha', photo: avaPhoto, isFollow: false, status: 'fuck!'},
        {id: 0, name: 'sasha', photo: 'src', isFollow: false, status: 'fuck!'},
        {id: 0, name: 'sasha', photo: 'src', isFollow: false, status: 'fuck!'},
        {id: 0, name: 'sasha', photo: 'src', isFollow: false, status: 'fuck!'},
        {id: 0, name: 'sasha', photo: 'src', isFollow: false, status: 'fuck!'},
        {id: 0, name: 'sasha', photo: 'src', isFollow: false, status: 'fuck!'},
        {id: 0, name: 'sasha', photo: 'src', isFollow: false, status: 'fuck!'},
        {id: 0, name: 'sasha', photo: 'src', isFollow: false, status: 'fuck!'},
        {id: 0, name: 'sasha', photo: 'src', isFollow: false, status: 'fuck!'},
    ]
}

const ProfilePageReducer = (state: any = initialState, action: any) => {
    switch (action.type) {

        case 'GET-USERS':
            return {...state}

        case 'GET-USER':
            return {...state.filter((user: any) => user.name === action.name)}

        case 'FOLlOW':
            return {
                ...state,
                users: state.users.map((user: any) => user.id === action.id ? {...user, isFollow: true} : user)
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((user: any) => user.id === action.id ? {...user, isFollow: false} : user)
            }
        default:
            return state
    }
}

const GET_USERS = 'GET-USERS'
export const getUsersAC = () => ({type: GET_USERS})

const GET_USER = 'GET-USER'
export const getUserAC = () => ({type: GET_USER})

const FOLLOW = 'FOLLOW'
export const followAC = (id: number) => ({type: FOLLOW, id})

const UNFOLLOW = 'UNFOLLOW'
export const unfollowAC = (id: number) => ({type: UNFOLLOW, id})

export default ProfilePageReducer
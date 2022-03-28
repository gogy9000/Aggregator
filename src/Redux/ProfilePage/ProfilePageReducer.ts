import {avaPhoto} from "../../photo/photo";

let initialState: any = {
    users: [
        {id: 0, Follow: true, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},
        {id: 1, Follow: false, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},
        {id: 2, Follow: false, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},
        {id: 3, Follow: false, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},
        {id: 4, Follow: false, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},
        {id: 5, Follow: false, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},
        {id: 6, Follow: false, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},
        {id: 7, Follow: false, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},
        {id: 8, Follow: false, name: 'simpson', photo: avaPhoto,  status: 'fuck!'},


    ]
}

const ProfilePageReducer = (state: any = initialState, action: any) => {
    debugger
    switch (action.type) {

        case 'GET-USERS':
            return {...state}

        case 'GET-USER':
            return {...state.filter((user: any) => user.name === action.name)}

        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map((user: any) => user.id === action.id ? {...user, Follow: true} : user)
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((user: any) => user.id === action.id ? {...user, Follow: false} : user)
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
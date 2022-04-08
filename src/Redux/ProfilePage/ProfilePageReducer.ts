


let initialState: any = {
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

const ProfilePageReducer = (state: any = initialState, action: any) => {

    switch (action.type) {

        case 'GET-USERS':
            console.log(action.usersApi)
            return {...state,users:action.usersApi}

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
export const getUsersAC = (usersApi: any) => ({type: GET_USERS, usersApi})

const GET_USER = 'GET-USER'
export const getUserAC = () => ({type: GET_USER})

const FOLLOW = 'FOLLOW'
export const followAC = (id: number) => ({type: FOLLOW, id})

const UNFOLLOW = 'UNFOLLOW'
export const unfollowAC = (id: number) => ({type: UNFOLLOW, id})

export default ProfilePageReducer
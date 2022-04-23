export type PhotosObjectType = {
    small: string | null
    large: string | null
}

export type UserObjectType = {
    followed: boolean
    id: string | null
    uniqueUrlName: string | null
    name: string | null
    photos: PhotosObjectType
    status: string | null
}
export type stateProfilePageType = {
    users: Array<UserObjectType>
    profile:profileType
    currentPage: number
}

let initialState: stateProfilePageType = {
    users: [] as Array<UserObjectType>,
    profile : null as profileType |null,
    currentPage: 1
}


const ProfilePageReducer = (state: any = initialState, action: any) => {

    switch (action.type) {

        case 'GET-PROFILE':
            console.log(action.profile)
            return {
                ...state,
                profile: action.profile
            }

        case 'GET-USERS':
            return {...state, users: action.usersApi, currentPage: action.page}

        case 'GET-USER':

            return {...state.filter((user: UserObjectType) => user.name === action.name)}

        case 'FOLLOW':

            return {
                ...state,
                users: [...state.users.map((user: UserObjectType) => user.id === action.id ? {
                    ...user,
                    followed: true
                } : user)]
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((user: UserObjectType) => user.id === action.id ? {
                    ...user,
                    followed: false
                } : user)
            }
        default:
            return state
    }
}

export type ActionCreatorType = getUsersACType | getUserACType | followACType | unfollowACType

export type profileType = {
    aboutMe: string|null
    contacts: { facebook: string | null, website: string | null, vk: string | null, twitter: string | null, instagram: string | null }
    fullName: string|null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: { small: string|null, large: string|null }
    userId: number
}|null

export type getProfileACType = { type: typeof GET_PROFILE, profile: profileType }
const GET_PROFILE = 'GET-PROFILE'
export const getProfileAC = (profile: profileType): getProfileACType => ({type: GET_PROFILE, profile})

export type getUsersACType = { type: typeof GET_USERS, usersApi: Array<UserObjectType>, page: number }
const GET_USERS = 'GET-USERS'
export const getUsersAC = (usersApi: Array<UserObjectType>, page: number): getUsersACType => ({
    type: GET_USERS,
    usersApi,
    page
})

type getUserACType = { type: typeof GET_USER }
const GET_USER = 'GET-USER'
export const getUserAC = (): getUserACType => ({type: GET_USER})

type followACType = { type: typeof FOLLOW, id: number }
const FOLLOW = 'FOLLOW'
export const followAC = (id: number): followACType => ({type: FOLLOW, id})

type unfollowACType = { type: typeof UNFOLLOW, id: number }
const UNFOLLOW = 'UNFOLLOW'
export const unfollowAC = (id: number): unfollowACType => ({type: UNFOLLOW, id})

export default ProfilePageReducer
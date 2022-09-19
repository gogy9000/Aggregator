import  {ProfilePageReducer,
    actionsProfile,
    stateProfilePageType,

} from "./ProfilePageReducer";

import {ProfileType, UserDataType} from "../../Api/Api";

let state:stateProfilePageType
let  users:Array<UserDataType>
let page:number

beforeEach(()=>{
    state={
        users: [
            {
                followed: true,
                id: 2,
                uniqueUrlName: null,
                name: "Stan",
                photos: {small: null, large: null},
                status: 'null'
            }
        ],
        profile:{} as ProfileType,
        currentPage: 1,
        profileStatus:''
    }

      users=[
        {
            followed: false,
            id: 45,
            uniqueUrlName: null,
            name: "StainsLOVE",
            photos: {small: null, large: null},
            status: null,
        }
    ]
    page=2
})


it('state should be update',()=>{
    let action= actionsProfile.getUsers(users,page)
    let newState=ProfilePageReducer(state,action)
    expect(newState.users.length).toBe(1)
})

it('page should be update',()=>{
    let page=3
    let action= actionsProfile.getUsers(users,page)
    let newState=ProfilePageReducer(state,action)
    expect(newState.currentPage).toBe(3)
})
test('followed should be true',()=>{
    let action= actionsProfile.follow(2)
    let newState=ProfilePageReducer(state,action)
    expect(newState.users[0].followed).toBeTruthy()
})
test('followed should be false',()=>{
    let action= actionsProfile.unfollow(2)
    let newState=ProfilePageReducer(state,action)
    expect(newState.users[0].followed).toBeFalsy()
})
import ProfilePageReducer, {
    followAC,
    getUsersAC,
    stateProfilePageType,
    unfollowAC,
    UserObjectType
} from "./ProfilePageReducer";
import React from "react";

let state:stateProfilePageType
let  users:Array<UserObjectType>
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
        currentPage: 1
    },
      users=[
        {
            followed: false,
            id: 3,
            uniqueUrlName: null,
            name: "StanisLOVE",
            photos: {small: null, large: null},
            status: null,
        }
    ],
    page=2
})


it('state should be update',()=>{
    let action= getUsersAC(users,page)
    let newState=ProfilePageReducer(state,action)
    expect(newState.users.length).toBe(1)
})

it('page should be update',()=>{
    let page=3
    let action= getUsersAC(users,page)
    let newState=ProfilePageReducer(state,action)
    expect(newState.currentPage).toBe(3)
})
test('followed should be true',()=>{
    let action= followAC(2)
    let newState=ProfilePageReducer(state,action)
    expect(newState.users[0].followed).toBeTruthy()
})
test('followed should be true',()=>{
    let action= unfollowAC(2)
    let newState=ProfilePageReducer(state,action)
    expect(newState.users[0].followed).toBeFalsy()
})
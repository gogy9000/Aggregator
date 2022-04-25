import ProfilePageReducer, {
    followAC,
    getUsersAC, profileType,
    stateProfilePageType,
    unfollowAC,
    UserObjectType
} from "./ProfilePageReducer";
import React from "react";
import {v1} from "uuid";

let state:stateProfilePageType
let  users:Array<UserObjectType>
let page:number

beforeEach(()=>{


    state={
        users: [
            {
                followed: true,
                id: v1(),
                uniqueUrlName: null,
                name: "Stan",
                // @ts-ignore
                photos: {small: null, large: null},
                status: 'null'
            }
        ],
        profile:{} as profileType,
        currentPage: 1
    },
      users=[
        {
            followed: false,
            id: v1(),
            uniqueUrlName: null,
            name: "StainsLOVE",
            // @ts-ignore
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
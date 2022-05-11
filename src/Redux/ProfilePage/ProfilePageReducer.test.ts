import  {ProfilePageReducer,
    actions, ApiProfileType,
    stateProfilePageType,
    UserObjectType
} from "./ProfilePageReducer";
import {v1} from "uuid";

let state:stateProfilePageType
let  users:Array<UserObjectType>
let page:number

beforeEach(()=>{


    state={
        users: [
            {
                followed: true,
                id: '2',
                uniqueUrlName: null,
                name: "Stan",
                // @ts-ignore
                photos: {small: null, large: null},
                status: 'null'
            }
        ],
        profile:{} as ApiProfileType,
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
    let action= actions.getUsersAC(users,page)
    let newState=ProfilePageReducer(state,action)
    expect(newState.users.length).toBe(1)
})

it('page should be update',()=>{
    let page=3
    let action= actions.getUsersAC(users,page)
    let newState=ProfilePageReducer(state,action)
    expect(newState.currentPage).toBe(3)
})
test('followed should be true',()=>{
    let action= actions.followAC('2')
    let newState=ProfilePageReducer(state,action)
    expect(newState.users[0].followed).toBeTruthy()
})
test('followed should be false',()=>{
    let action= actions.unfollowAC('2')
    let newState=ProfilePageReducer(state,action)
    expect(newState.users[0].followed).toBeFalsy()
})
import  {ProfilePageReducer,
    actionsProfile,
    stateProfilePageType,

} from "./ProfilePageReducer";

import {ProfileType, UserDataType} from "../../Api/Api";
describe("profilePage",()=>{
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
            profileStatus:'',
            fetchingList:{1:true}
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
    it('followed should be true',()=>{
        let action= actionsProfile.follow(2)
        let newState=ProfilePageReducer(state,action)
        expect(newState.users[0].followed).toBeTruthy()
    })
    it('followed should be false',()=>{
        let action= actionsProfile.unfollow(2)
        let newState=ProfilePageReducer(state,action)
        expect(newState.users[0].followed).toBeFalsy()
    })
    it("id should be added in fetching list",()=>{
        let action=actionsProfile.addIdInFetchingList(2)
        let newState=ProfilePageReducer(state,action)
        expect(newState.fetchingList[2]).toBeTruthy()
    })
    it("id should be removed in fetching list",()=>{
        let action=actionsProfile.removeIdInFetchingList(1)
        let newState=ProfilePageReducer(state,action)
        expect(newState.fetchingList[1]).toBeUndefined()
    })
})

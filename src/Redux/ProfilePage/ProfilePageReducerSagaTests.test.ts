import {actionsProfile, ProfileConst, profileWorkers} from "./ProfilePageReducer";
import {APIProfile, DataType, followApi, ProfileType, userApi, UsersDataType} from "../../Api/Api";
import {call, put} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {errorsInterceptor} from "../../utils/ErrorsInterceptor/ErrorsInterceptor";
import {actionsApp} from "../AppReducer/AppReducer";
describe("getProfileStatus",()=>{
    let getProfileStatusResponse: AxiosResponse<string>
    let getProfileStatusGenerator: Generator
    let newStatus: string
    let ok: string

    beforeEach(() => {
        ok = "OK"
        newStatus = "new status"
        getProfileStatusResponse = {data: newStatus, status: 200, statusText: ok} as AxiosResponse<string>
        getProfileStatusGenerator = profileWorkers.getProfileStatus({type: ProfileConst.getProfileStatus, userId: 0})
    })


    it("getProfileStatus should work in the case of a good answer", () => {
        expect(getProfileStatusGenerator.next().value).toEqual(call(APIProfile.getProfileStatus, 0))
        expect(getProfileStatusGenerator.next(getProfileStatusResponse).value)
            .toEqual(put(actionsProfile.updateProfileStatus(newStatus)))
    })

    it("getProfileStatus should work in the case of a no good answer", () => {
        let result = getProfileStatusGenerator.next()
        expect(result.value).toEqual(call(APIProfile.getProfileStatus, 0))
        result = getProfileStatusGenerator.next({...getProfileStatusResponse, status: 300, statusText: "no ok"})
        expect(result.value).not.toEqual(put(actionsProfile.updateProfileStatus(newStatus)))
        expect(result.value).toEqual(call(errorsInterceptor, "no ok"))
    })
    it("getProfileStatus should cached error", () => {
        let result = getProfileStatusGenerator.next()
        expect(result.value).toEqual(call(APIProfile.getProfileStatus, 0))
        result = getProfileStatusGenerator.throw({message: "no ok"})
        expect(result.value).toEqual(call(errorsInterceptor, {message: "no ok"}))
    })
})


describe("updateProfileStatus", () => {
    let gen: Generator
    let response: AxiosResponse<DataType<{}>>
    let newStatus: string
    beforeEach(() => {
        gen = profileWorkers.updateProfileStatus({type: ProfileConst.updateProfileStatus, newStatus: "new status"})
        response = {
            data: {
                data: {},
                messages: [],
                resultCode: 0,
                fieldsErrors: []
            }
        } as unknown as AxiosResponse<DataType<{}>>
    })

    it("getProfileStatus should work in the case of a good response", () => {
        expect(gen.next().value).toEqual(call(APIProfile.updateProfileStatus, newStatus))
        expect(gen.next(response).value).toEqual(put(actionsProfile.updateProfileStatus("new status")))
    })

    it("getProfileStatus should work in the case of a bad response",()=>{
        expect(gen.next().value).toEqual(call(APIProfile.updateProfileStatus, newStatus))
        response={...response,data:{...response.data,resultCode:1,messages:["no ok"]}}
        expect(gen.next(response).value).toEqual(call(errorsInterceptor, response.data.messages))
    })

    it("getProfileStatus should work in the case of a catch error",()=>{
        expect(gen.next().value).toEqual(call(APIProfile.updateProfileStatus, newStatus))
        let error = new Error("error");
        expect(gen.throw(error).value).toEqual(call(errorsInterceptor, error))
    })
})

describe("getUsers",()=>{
    let gen: Generator
    let response: AxiosResponse<UsersDataType>
    beforeEach(()=>{
        gen=profileWorkers.getUsers({type: ProfileConst.getUser,payload:{}})
        response={data:{items:[],error:"",totalCount:1},status:200} as unknown as  AxiosResponse<UsersDataType>
    })
    it("getUsers should work in the case of a good response",()=>{
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(true)))
        expect(gen.next().value).toEqual(call(userApi.getUsersApi, {}))
        expect(gen.next(response).value).toEqual(put(actionsProfile.getUsers(response.data.items)))
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(false)))
    })
    it("getUsers should work in the case of a no good response",()=>{
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(true)))
        expect(gen.next().value).toEqual(call(userApi.getUsersApi, {}))
        response.status=300
        response.data.error="some error"
        expect(gen.next(response).value).toEqual(call(errorsInterceptor,response.data.error))
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(false)))
    })
    it("getUsers should work in the case of a catch error",()=>{
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(true)))
        expect(gen.next().value).toEqual(call(userApi.getUsersApi, {}))
        let error = new Error("some error");
        expect(gen.throw(error).value).toEqual(call(errorsInterceptor,error))
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(false)))
    })
})
describe("getProfile",()=>{
    let gen:Generator
    let response:AxiosResponse<ProfileType>
    let userID:number
    beforeEach(()=>{
        userID=0
        gen=profileWorkers.getProfile({type: ProfileConst.getProfile, userID})
        response={data:{userId:userID}} as unknown as AxiosResponse<ProfileType>
    })
    it("getProfile should work in the case of a good response",()=>{
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(true)))
        expect(gen.next().value).toEqual(call(APIProfile.getProfile, userID))
        expect(gen.next(response).value).toEqual(put(actionsProfile.getProfile(response.data)))
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(false)))
    })
    it("getProfile should work in the case of a catch error",()=>{
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(true)))
        expect(gen.next().value).toEqual(call(APIProfile.getProfile, userID))
        let error = new Error("some error");
        expect(gen.throw(error).value).toEqual(call(errorsInterceptor,error))
        expect(gen.next().value).toEqual(put(actionsApp.toggleIsFetching(false)))
    })
})
describe("follow",()=>{
    let gen:Generator
    let response:AxiosResponse<DataType<{}>>
    let userId:number
    beforeEach(()=>{
        userId=0
        gen=profileWorkers.follow({type: ProfileConst.follow, payload: {userId}})
        response={data:{resultCode:0}} as unknown as AxiosResponse<DataType<{}>>
    })
    it("follow should work in the case of a good response",()=>{
        expect(gen.next().value).toEqual(put(actionsProfile.addIdInFetchingList(userId)))
        expect(gen.next().value).toEqual(call(followApi.followUser, userId))
        expect(gen.next(response).value).toEqual(put(actionsProfile.follow(userId)))
        expect(gen.next().value).toEqual(put(actionsProfile.removeIdInFetchingList(userId)))
    })
    it("follow should work in the case of a no good response",()=>{
        expect(gen.next().value).toEqual(put(actionsProfile.addIdInFetchingList(userId)))
        expect(gen.next().value).toEqual(call(followApi.followUser, userId))
        response.data.resultCode=1
        response.data.messages=["no good"]
        expect(gen.next(response).value).toEqual(call(errorsInterceptor, response.data.messages))
        expect(gen.next().value).toEqual(put(actionsProfile.removeIdInFetchingList(userId)))
    })

    it("follow should work in the case of a catch error",()=>{
        expect(gen.next().value).toEqual(put(actionsProfile.addIdInFetchingList(userId)))
        expect(gen.next().value).toEqual(call(followApi.followUser, userId))
        let error = new Error("some error");
        expect(gen.throw(error).value).toEqual(call(errorsInterceptor, error))
        expect(gen.next().value).toEqual(put(actionsProfile.removeIdInFetchingList(userId)))
    })
})

describe("unfollow",()=>{
    let gen:Generator
    let response:AxiosResponse<DataType<{}>>
    let userId:number
    beforeEach(()=>{
        userId=0
        gen=profileWorkers.unFollow({type: ProfileConst.unFollow, payload: {userId}})
        response={data:{resultCode:0}} as unknown as AxiosResponse<DataType<{}>>
    })
    it("unfollow should work in the case of a good response",()=>{
        expect(gen.next().value).toEqual(put(actionsProfile.addIdInFetchingList(userId)))
        expect(gen.next().value).toEqual(call(followApi.unfollowUser, userId))
        expect(gen.next(response).value).toEqual(put(actionsProfile.unfollow(userId)))
        expect(gen.next().value).toEqual(put(actionsProfile.removeIdInFetchingList(userId)))
    })
    it("follow should work in the case of a no good response",()=>{
        expect(gen.next().value).toEqual(put(actionsProfile.addIdInFetchingList(userId)))
        expect(gen.next().value).toEqual(call(followApi.unfollowUser, userId))
        response.data.resultCode=2
        response.data.messages=["no good"]
        expect(gen.next(response).value).toEqual(call(errorsInterceptor, response.data.messages))
        expect(gen.next().value).toEqual(put(actionsProfile.removeIdInFetchingList(userId)))
    })

    it("follow should work in the case of a catch error",()=>{
        expect(gen.next().value).toEqual(put(actionsProfile.addIdInFetchingList(userId)))
        expect(gen.next().value).toEqual(call(followApi.unfollowUser, userId))
        let error = new Error("some error");
        expect(gen.throw(error).value).toEqual(call(errorsInterceptor, error))
        expect(gen.next().value).toEqual(put(actionsProfile.removeIdInFetchingList(userId)))
    })
})
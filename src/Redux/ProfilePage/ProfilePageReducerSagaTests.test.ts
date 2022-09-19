import {actionsProfile, profileConst, profileWorkers} from "./ProfilePageReducer";
import {APIProfile} from "../../Api/Api";
import {call, put} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {errorsInterceptor} from "../../utils/ErrorsInterceptor/ErrorsInterceptor";

let getProfileStatusResponse:  AxiosResponse<string>
let getProfileStatusGenerator:Generator
let newStatus:string
let ok :string

beforeEach(()=>{
    ok = "OK"
    newStatus = "new status"
    getProfileStatusResponse={data: newStatus, status: 200, statusText: ok} as AxiosResponse<string>
    getProfileStatusGenerator=profileWorkers.getProfileStatus({type: profileConst.getProfileStatus, userId: 0})
})


test("getProfileStatus should work in the case of a good answer", () => {
    expect(getProfileStatusGenerator.next().value).toEqual(call(APIProfile.getProfileStatus, 0))
    expect(getProfileStatusGenerator.next(getProfileStatusResponse).value)
        .toEqual(put(actionsProfile.updateProfileStatus(newStatus)))
})
test("getProfileStatus should work in the case of a no good answer",()=>{
    let result = getProfileStatusGenerator.next()
    expect(result.value).toEqual(call(APIProfile.getProfileStatus, 0))
    result = getProfileStatusGenerator.next({...getProfileStatusResponse,status: 300,statusText:"no ok"})
    expect(result.value).not.toEqual(put(actionsProfile.updateProfileStatus(newStatus)))
    expect(result.value).toEqual(call(errorsInterceptor,"no ok"))
})
test("getProfileStatus should cached error",()=>{
    let result =getProfileStatusGenerator.next()
    expect(result.value).toEqual(call(APIProfile.getProfileStatus, 0))
    result=getProfileStatusGenerator.throw({message:"no ok"})
    expect(result.value).toEqual(call(errorsInterceptor,{message:"no ok"}))
})
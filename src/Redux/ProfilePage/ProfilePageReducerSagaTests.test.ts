import {actionsProfile, profileConst, profileWorkers} from "./ProfilePageReducer";
import {APIProfile} from "../../Api/Api";
import {call, put} from "redux-saga/effects";
import {AxiosResponse} from "axios";

let getProfileStatusResponse:  AxiosResponse<string>
let getProfileStatusGenerator:Generator

beforeEach(()=>{
    getProfileStatusResponse={data: "new status", status: 200, statusText: "OK"} as AxiosResponse<string>
    getProfileStatusGenerator=profileWorkers.getProfileStatus({type: profileConst.getProfileStatus, userId: 0})
})


test("getProfileStatus should work in the case of a good answer", () => {
    let result = getProfileStatusGenerator.next()
    expect(result.value).toEqual(call(APIProfile.getProfileStatus, 0))
    result = getProfileStatusGenerator.next(getProfileStatusResponse)
    expect(result.value).toEqual(put(actionsProfile.updateProfileStatus("new status")))
})
test("getProfileStatus should work in the case of a no good answer",()=>{
    let result = getProfileStatusGenerator.next()
    expect(result.value).toEqual(call(APIProfile.getProfileStatus, 0))
    result = getProfileStatusGenerator.next({...getProfileStatusResponse,status: 300})
    expect(result.value).not.toEqual(put(actionsProfile.updateProfileStatus("new status")))
})
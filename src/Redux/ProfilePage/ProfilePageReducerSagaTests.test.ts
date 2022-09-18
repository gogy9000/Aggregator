import {profileConst, profileWorkers} from "./ProfilePageReducer";
import {APIProfile} from "../../Api/Api";
import {call} from "redux-saga/effects";

test("getProfileStatus should be worked",()=>{
    const gen=profileWorkers.getProfileStatus({type:profileConst.getProfileStatus,userId: 0})
    const result=gen.next()
    expect(result.value).toEqual(call(APIProfile.getProfileStatus,0))
})
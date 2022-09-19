import {errorsInterceptor} from "./ErrorsInterceptor";
import {all, put} from "redux-saga/effects";
import {errorsLogActions} from "../../Redux/ErrorLog";

test("errorsInterceptor should call the action with {app: no ok}",()=>{
    let  gen=errorsInterceptor("no ok")
    expect(gen.next().value).toEqual(put(errorsLogActions.addError({app: "no ok"})))
})
test("errorsInterceptor should call the action with {[id]: no ok}",()=>{
    let  gen=errorsInterceptor("no ok","id")
    expect(gen.next().value).toEqual(put(errorsLogActions.addError({id: "no ok"})))
})

test("errorsInterceptor should call the action with new Error",()=>{
    let gen=errorsInterceptor(new Error("no good"))
    expect(gen.next().value).toEqual(put(errorsLogActions.addError({app: "no good"})))
})
test("errorsInterceptor should call the action with new Error and with id",()=>{
    let gen=errorsInterceptor(new Error("no good"),"id")
    expect(gen.next().value).toEqual(put(errorsLogActions.addError({id: "no good"})))
})

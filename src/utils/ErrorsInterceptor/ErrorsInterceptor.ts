import {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import {errorsLogActions} from "../../Redux/ErrorLog";
import {all, put, spawn} from "redux-saga/effects";

export class AxiosErrorClass<T = unknown, D = any> implements AxiosError {
    config!: AxiosRequestConfig<D>;
    code?: string;
    request?: any;
    response?: AxiosResponse<T, D>;
    isAxiosError!: boolean;
    toJSON!: () => object;
    message!: string;
    name!: string;
}


export function* errorsInterceptor  (error: unknown, id?: string)  {
    if (error instanceof Error) {
        if (id) {
          yield  put(errorsLogActions.addError({[id]: error.message}))
        } else {
           yield put(errorsLogActions.addError({app: error.message}))
        }

    } else if (typeof error === "string") {
        if (id) {
          yield  put(errorsLogActions.addError({[id]: error}))
        } else {
          yield  put(errorsLogActions.addError({app: error}))
        }
    } else if(Array.isArray(error)){
       yield all( error.map((item,index)=>spawn(function* (){
           while (true){
               yield  put(errorsLogActions.addError({[`app${index}`]: item}))
           }
        })))
    }else {throw error}

}
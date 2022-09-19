import {AxiosRequestConfig, AxiosResponse,AxiosError} from "axios";
import {errorsLogActions} from "../../Redux/ErrorLog";

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




export const errorsInterceptor = (error: unknown, callback: Function, id?: string) => {

    if (error instanceof AxiosErrorClass) {
        if (id) {
            callback(errorsLogActions.addError({[id]: error.message}))
        }
        callback(errorsLogActions.addError({app: error.message}))
    } else {
        throw error
    }
}
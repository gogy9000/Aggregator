import {useSelector} from "react-redux";
import {AppRootStateType} from "../Redux/Redux-store";
import {Navigate} from "react-router-dom";
import React from "react";

export const Redirect = (WrappedComponent: any) => {

    const Foo = (props: any) => {
        let isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)

        return (
            <>
                {
                    isAuth
                        ?
                        <WrappedComponent {...props}/>
                        :
                        <Navigate replace to='/login'/>
                }
            </>
        )
    }
    return Foo

}
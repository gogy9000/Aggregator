import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/Redux-store";
import {Navigate} from "react-router-dom";
import React from "react";

export const Redirect = (WrappedComponent: any) => {

    const Foo = (props: any) => {
        let fakeAuth = useSelector((state: AppStateType) => state.auth.fakeAuth)

        return (
            <>
                {
                    fakeAuth
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
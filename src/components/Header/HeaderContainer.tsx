import React from "react"
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {useDispatchApp} from "../../customHooks/CustomHooks";
import {sagasAuthActions} from "../../Redux/Auth/Auth";
import {Header} from "./Header";


export const HeaderContainer = () => {

    const dispatch = useDispatchApp()

    const state = useSelector((state: AppStateType) => state.auth)

    const logout = () => {
        dispatch(sagasAuthActions.logout())
    }

    return <Header login={state.login} isAuth={state.isAuth} logout={logout}/>
}



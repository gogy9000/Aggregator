import {ProfilePage} from "./ProfilePage";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {AppStateType} from "../../Redux/Redux-store";
import {Dispatch} from "redux";
import {actions} from "../../Redux/ProfilePage/ProfilePageReducer";
import {actionsApp} from "../../Redux/App/AppReducer";
import {profileApi, userApi} from "../../Api/Api";

export const ProfilePageContainerFC = () => {

    let state = useSelector((state: AppStateType) => state.profilePage)
    let auth = useSelector((state: AppStateType) => state.auth)
    let initApp = useSelector((state: AppStateType) => state.AppReducer)

    const dispatch:Dispatch = useDispatch()

    let params = useParams()

    let userID = params.userId ? Number(params.userId) : auth.id;

    useEffect(() => {
        dispatch(actionsApp.toggleIsFetching(true))
        profileApi.getProfileApi( userID).then((data:any)=>{
            dispatch(actions.getProfileAC(data))
            dispatch(actionsApp.toggleIsFetching(false))
        })
    }, [userID])

    useEffect(() => {
        dispatch(actionsApp.toggleIsFetching(true))
        userApi.getAllUsersApi(1).then((data:any)=>{
           dispatch(actions.getUsersAC(data.items, 1))
            dispatch(actionsApp.toggleIsFetching(false))
        })
    }, [state.profile])

    return (
        <>{initApp.isFetching ?
            <div>LOAD!!</div>
            : <ProfilePage callBack={() => {
            }}/>}

        </>
    )
}
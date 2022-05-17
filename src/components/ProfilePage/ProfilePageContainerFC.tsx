import {ProfilePage} from "./ProfilePage";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsersApi, getProfileApi} from "../../Api/Api";
import {AppStateType} from "../../Redux/Redux-store";
import {Dispatch} from "redux";

export const ProfilePageContainerFC = () => {

    let state = useSelector((state: AppStateType) => state.profilePage)
    let auth = useSelector((state: AppStateType) => state.auth)
    let initApp = useSelector((state: AppStateType) => state.AppReducer)

    const dispatch:Dispatch = useDispatch()

    let params = useParams()

    let userID = params.userId ? Number(params.userId) : auth.id;

    useEffect(() => {
        // debugger
        getProfileApi(dispatch, userID)
    }, [userID])
    useEffect(() => {
        getAllUsersApi(dispatch)
    }, [state.profile])

    return (
        <>{initApp.isFetching ?
            <div>LOAD!!</div>
            : <ProfilePage callBack={() => {
            }}/>}

        </>
    )
}
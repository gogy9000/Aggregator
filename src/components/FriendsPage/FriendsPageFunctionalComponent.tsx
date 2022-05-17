import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {FriendsPage} from "./FriendsPage";
import {getAllUsersApi} from "../../Api/Api";
import {ApiProfileType, stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";
import {AppStateType} from "../../Redux/Redux-store";


export const FriendsPageFunctionalComponent = () => {

    const state = useSelector((state: AppStateType) => state.profilePage)
    const initState = useSelector((state: AppStateType) => state.AppReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        getAllUsersApi(dispatch)
    }, [])

    const getUsersCallBack = (userName: string, isFollow: string) => {
        getAllUsersApi(dispatch, 1, userName, isFollow)
    }


    return (
        <>{initState.isFetching ?
            <div>load!!!</div>
            : <FriendsPage state={state} dispatch={dispatch} getUsersCallBack={getUsersCallBack}/>}

        </>
    )


}


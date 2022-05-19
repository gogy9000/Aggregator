import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {FriendsPage} from "./FriendsPage";
import {actions} from "../../Redux/ProfilePage/ProfilePageReducer";
import {AppStateType} from "../../Redux/Redux-store";
import {actionsApp} from "../../Redux/App/AppReducer";
import {userApi} from "../../Api/Api";


export const FriendsPageFunctionalComponent = () => {

    const state = useSelector((state: AppStateType) => state.profilePage)
    const initState = useSelector((state: AppStateType) => state.AppReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionsApp.toggleIsFetching(false))
        userApi.getAllUsersApi().then((data: any) => {
                dispatch(actions.getUsersAC(data.items, 1));
                dispatch(actionsApp.toggleIsFetching(false))
            }
        )
    }, [])

    const getUsersCallBack = (userName: string, isFollow: string) => {
        dispatch(actionsApp.toggleIsFetching(false))
        userApi.getAllUsersApi(1, userName, isFollow).then((data: any) => {
            dispatch(actions.getUsersAC(data.items, 1));
            dispatch(actionsApp.toggleIsFetching(false))
        })
    }


    return (
        <>{initState.isFetching ?
            <div>load!!!</div>
            : <FriendsPage state={state} dispatch={dispatch} getUsersCallBack={getUsersCallBack}/>}

        </>
    )


}


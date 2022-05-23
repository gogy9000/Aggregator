import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {FriendsPage} from "./FriendsPage";
import {actions, getUserThunk} from "../../Redux/ProfilePage/ProfilePageReducer";
import {AppStateType} from "../../Redux/Redux-store";
import {actionsApp} from "../../Redux/AppReducer/AppReducer";
import {userApi} from "../../Api/Api";


export const FriendsPageFunctionalComponent = () => {

    const state = useSelector((state: AppStateType) => state.profilePage)
    const initState = useSelector((state: AppStateType) => state.AppReducer)
    const dispatch = useDispatch()


    const getUsersCallBack = (page: number, userName: string, isFollow: string, count: number) => {
        dispatch(getUserThunk(page, userName, isFollow, count))
        // dispatch(actionsApp.toggleIsFetching(false))
        // userApi.getAllUsersApi(page, userName, isFollow, count).then((data: any) => {
        //     dispatch(actions.getUsersAC(data.items, page));
        //     dispatch(actionsApp.toggleIsFetching(false))
        // })
    }


    return (
        <>{initState.isFetching ?
            <div>load!!!</div>
            : <FriendsPage state={state} dispatch={dispatch} getUsersCallBack={getUsersCallBack}/>}

        </>
    )


}


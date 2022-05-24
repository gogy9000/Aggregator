import React from "react";

import {useDispatch, useSelector} from "react-redux";
import {FriendsPage} from "./FriendsPage";
import {getUserTC} from "../../Redux/ProfilePage/ProfilePageReducer";
import {AppStateType} from "../../Redux/Redux-store";



export const FriendsPageFunctionalComponent = () => {

    const state = useSelector((state: AppStateType) => state.profilePage)
    const initState = useSelector((state: AppStateType) => state.AppReducer)



    // const getUsersCallBack = (page: number, userName: string, isFollow: string, count: number) => {
    //     dispatch(getUserTC(page, userName, isFollow, count))
    // }


    return (
        <>{initState.isFetching ?
            <div>load!!!</div>
            : <FriendsPage state={state}  />}
        </>
    )


}


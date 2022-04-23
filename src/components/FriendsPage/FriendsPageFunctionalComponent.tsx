import React, {useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {FriendsPage} from "./FriendsPage";
import {getAllUsersApi} from "../../Api/Api";
import {stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";



export const FriendsPageFunctionalComponent = () => {

    const state = useSelector((state: any) => state.profilePage)
    const dispatch = useDispatch()

    if(state.users.length===0) {
        getAllUsersApi(dispatch)
    }

    return(
        <FriendsPage state={state} dispatch={dispatch}/>
    )


}


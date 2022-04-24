import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {FriendsPage} from "./FriendsPage";
import {getAllUsersApi} from "../../Api/Api";
import {stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";



export const FriendsPageFunctionalComponent = () => {

    const state = useSelector((state: any) => state.profilePage)
    const dispatch = useDispatch()

    // useEffect(()=>{getAllUsersApi(dispatch)})
debugger



    return(
        // @ts-ignore
        <FriendsPage state={state} dispatch={dispatch}  />
    )


}


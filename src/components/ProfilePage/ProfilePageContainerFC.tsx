import {ProfilePage} from "./ProfilePage";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsersApi, getProfileApi} from "../../Api/Api";

export const ProfilePageContainerFC = () => {

    let state=useSelector((state: any) => state.profilePage)

    let dispatch= useDispatch()

    let params= useParams()

    let userID = params.userId? Number(params.userId):2;

    useEffect(()=>{getProfileApi(dispatch,userID)},[userID])
    useEffect(()=> {getAllUsersApi(dispatch)},[state.profile.users])

    return (
        state.profile &&
    <ProfilePage callBack={() => {
    }}/>

    )
}
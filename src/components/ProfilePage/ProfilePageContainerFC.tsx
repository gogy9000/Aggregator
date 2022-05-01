import {ProfilePage} from "./ProfilePage";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsersApi, getProfileApi} from "../../Api/Api";

export const ProfilePageContainerFC = () => {

    let state=useSelector((state: any) => state.profilePage)
    let auth= useSelector((state:any)=>state.auth)

    let dispatch= useDispatch()

    let params= useParams()

    let userID = params.userId? Number(params.userId):auth.id;

    useEffect(()=>{getProfileApi(dispatch,userID)},[userID])
    useEffect(()=> {getAllUsersApi(dispatch)},[state.profile])

    return (
        state.profile &&
    <ProfilePage callBack={() => {
    }}/>

    )
}
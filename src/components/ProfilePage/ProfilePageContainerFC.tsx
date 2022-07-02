import {ProfilePage} from "./ProfilePage";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {getProfileTC, getUserTC} from "../../Redux/ProfilePage/ProfilePageReducer";


export const ProfilePageContainerFC =  () => {

    let state = useSelector((state: AppStateType) => state.profilePage)
    let auth = useSelector((state: AppStateType) => state.auth)
    let initApp = useSelector((state: AppStateType) => state.AppReducer)

    const dispatch = useDispatch()

    let params = useParams()

    useEffect(() => {
        let userID = params.userId ? Number(params.userId) : auth.id;
        if (!userID) {return}
        dispatch(getProfileTC(userID))
    }, [params.userId])

    useEffect(() => {
        dispatch(getUserTC(1))
    }, [state.profile])


    return (
        <>

            {
                initApp.isFetching
                    ?
                    <div>LOAD!!</div>
                    :
                    <ProfilePage/>
            }

        </>
    )
}



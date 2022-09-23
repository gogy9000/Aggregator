import {ProfilePage} from "./ProfilePage";
import React, {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";
import {profileActivators} from "../../Redux/ProfilePage/ProfilePageReducer";
import {useDispatchApp} from "../../customHooks/CustomHooks";


export const ProfilePageContainerFC =  React.memo( () => {

    let id = useSelector((state: AppRootStateType) => state.auth.id)
    let isFetching = useSelector((state: AppRootStateType) => state.AppReducer.isFetching)

    const dispatch = useDispatchApp()

    let params = useParams()

    useEffect(() => {
        let userID = params.userId? Number(params.userId):id
        if (!userID) {return}
        dispatch(profileActivators.getProfile(userID))
        dispatch(profileActivators.getProfileStatus(userID))
    }, [params.userId])




    return (
        <>
            {
                isFetching
                    ?
                    <div>LOAD!!</div>
                    :
                    <ProfilePage/>
            }

        </>
    )
}
)



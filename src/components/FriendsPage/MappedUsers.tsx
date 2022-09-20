import {UserDataType} from "../../Api/Api";
import React, {memo, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {profileActivators} from "../../Redux/ProfilePage/ProfilePageReducer";
import {FriendDescriptionBlock} from "./FriendDescriptionBlock";
import {AppStateType} from "../../Redux/Redux-store";

type MappedUsersPropsType = { user: UserDataType }
export const MappedUsers: React.FC<MappedUsersPropsType> = memo(({user}) => {

    const dispatch = useDispatch()
    const fetchingId=useSelector((state:AppStateType) => state.profilePage.fetchingList[user.id])

    const follow = useCallback(() => {
        dispatch(profileActivators.follow({userId: user.id}))
    }, [user.id])

    const unFollow = useCallback(() => {
        dispatch(profileActivators.unFollow({userId: user.id}))
    }, [user.id])

    return (
        <FriendDescriptionBlock
            user={user}
            isFetchingRequest={fetchingId}
            follow={follow}
            unfollow={unFollow}/>)
})
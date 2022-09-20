import {UserDataType} from "../../Api/Api";
import React, {memo, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {profileActivators} from "../../Redux/ProfilePage/ProfilePageReducer";
import {FriendDescriptionBlock} from "./FriendDescriptionBlock";

type MappedUsersPropsType = { user: UserDataType }
export const MappedUsers: React.FC<MappedUsersPropsType> = memo(({user}) => {

    const [isFetchingRequest, setIsFetchingRequest] = useState(false)
    const dispatch = useDispatch()

    const follow = useCallback(() => {
        dispatch(profileActivators.follow({userId: user.id, setDisabledButton: setIsFetchingRequest}))
    }, [user.id, setIsFetchingRequest])

    const unFollow = useCallback(() => {
        dispatch(profileActivators.unFollow({userId: user.id, setDisabledButton: setIsFetchingRequest}))
    }, [user.id, setIsFetchingRequest])

    return (
        <FriendDescriptionBlock
            user={user}
            isFetchingRequest={isFetchingRequest}
            follow={follow}
            unfollow={unFollow}/>)
})
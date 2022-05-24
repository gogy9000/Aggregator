import React, {useState} from "react";
import {FriendDescriptionBlock} from "./FriendDescriptionBlock";
import {stateProfilePageType, UserObjectType, followTC, unFollowTC,} from "../../Redux/ProfilePage/ProfilePageReducer";
import {useDispatch} from "react-redux";

type FriendListType = {
    state: stateProfilePageType
}

export const FriendList: React.FC<FriendListType> = ({state}) => {

    const mappedUsers = state.users.map((user: UserObjectType) => <MappedUsers key={user.id} user={user}/>)

    return <div>{mappedUsers}</div>
}


type MappedUsersPropsType = { user: UserObjectType }

export const MappedUsers: React.FC<MappedUsersPropsType> = ({user}) => {

    const [isFetchingRequest, setIsFetchingRequest] = useState(false)
    const dispatch=useDispatch()

    const follow = () => dispatch(followTC(user.id,setIsFetchingRequest))

    const unFollow = () => dispatch(unFollowTC(user.id,setIsFetchingRequest))

    return (
        <FriendDescriptionBlock key={user.id}
                                user={user}
                                isFetchingRequest={isFetchingRequest}
                                follow={follow}
                                unfollow={unFollow}/>)
}
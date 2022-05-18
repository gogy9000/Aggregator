import React, {useState} from "react";
import {FriendDescriptionBlock} from "./FriendDescriptionBlock";
import {
    ActionsType,
    actions,
    stateProfilePageType, UserObjectType,

} from "../../Redux/ProfilePage/ProfilePageReducer";
import {getFollowUsersApi, getUnFollowUsersApi} from "../../Api/Api";

type FriendListType = {
    state: stateProfilePageType
    dispatch: (action: ActionsType) => void
}

export const FriendList: React.FC<FriendListType> = ({state, dispatch}) => {


    const FriendDescriptionBlockMap = state.users.map((user: UserObjectType) => <MappedUsers key={user.id}
                                                                                             user={user}
                                                                                             dispatch={dispatch}/>
    )


    return <div>{FriendDescriptionBlockMap}</div>

}




type MappedUsersPropsType = {
    user: UserObjectType
    dispatch: (action: ActionsType) => void
}
export const MappedUsers: React.FC<MappedUsersPropsType> = ({user, dispatch}) => {
    const [isFetchingRequest, setIsFetchingRequest] = useState(false)

    const follow = () => {
        setIsFetchingRequest(true)
        getFollowUsersApi(user.id).then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(actions.followAC(user.id))
            }
            setIsFetchingRequest(false)
        })

    }

    const unFollow = () => {
        setIsFetchingRequest(true)
        getUnFollowUsersApi(user.id).then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(actions.unfollowAC(user.id))
            }
            setIsFetchingRequest(false)
        })

    }


    return (
        <FriendDescriptionBlock key={user.id}
                                user={user}
                                isFetchingRequest={isFetchingRequest}
                                follow={follow}
                                unfollow={unFollow}/>)
}
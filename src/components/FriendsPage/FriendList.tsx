import React from "react";
import {FriendDescriptionBlock} from "./FriendDescriptionBlock";
import {
    ActionCreatorType,
    followAC,
    stateProfilePageType,
    unfollowAC
} from "../../Redux/ProfilePage/ProfilePageReducer";

type FriendListType ={
    state:stateProfilePageType
    dispatch:(ac:ActionCreatorType)=>void
}

export const FriendList:React.FC<FriendListType> = ({state,dispatch}) => {


    const FriendDescriptionBlockMap = state.users.map(

        (user: any) => {
            const follow = () => {

                dispatch(followAC(user.id))
            }

            const unFollow = () => {
                dispatch(unfollowAC(user.id))
            }


            return(
            <FriendDescriptionBlock key={user.id}
                                    user={user}
                                    follow={follow}
                                    unfollow={unFollow}/>)
        })



    return <div>{FriendDescriptionBlockMap}</div>

}
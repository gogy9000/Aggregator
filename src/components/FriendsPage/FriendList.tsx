import React from "react";
import {FriendDescriptionBlock} from "./FriendDescriptionBlock";
import {
    ActionsType,
    actions,
    stateProfilePageType,

} from "../../Redux/ProfilePage/ProfilePageReducer";
import {getFollowUsersApi, getUnFollowUsersApi} from "../../Api/Api";

type FriendListType ={
    state:stateProfilePageType
    dispatch:(ac:ActionsType)=>void
}

export const FriendList:React.FC<FriendListType> = ({state,dispatch}) => {


    const FriendDescriptionBlockMap = state.users.map(

        (user: any) => {
            const follow = () => {
                getFollowUsersApi(user.id).then((data:any)=>{
                    if(data.resultCode===0){dispatch(actions.followAC(user.id))}
                })

            }

            const unFollow = () => {
                getUnFollowUsersApi(user.id).then((data:any)=>{
                    if(data.resultCode===0){dispatch(actions.unfollowAC(user.id))}
                })

            }


            return(
            <FriendDescriptionBlock key={user.id}
                                    user={user}
                                    follow={follow}
                                    unfollow={unFollow}/>)
        })



    return <div>{FriendDescriptionBlockMap}</div>

}
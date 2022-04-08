import React from "react";
import {FriendDescriptionBlock} from "./FriendDescriptionBlock";
import {followAC, getUsersAC, unfollowAC} from "../../Redux/ProfilePage/ProfilePageReducer";
import {log} from "util";


export const FriendList = (props: any) => {


    const FriendDescriptionBlockMap = props.state.users.map(

        (user: any) => {
            const follow = () => {

                props.dispatch(followAC(user.id))
            }

            const unFollow = () => {
                props.dispatch(unfollowAC(user.id))
            }


            return(
            <FriendDescriptionBlock key={user.id}
                                    user={user}
                                    follow={follow}
                                    unfollow={unFollow}/>)
        })



    return <div>{FriendDescriptionBlockMap}</div>

}
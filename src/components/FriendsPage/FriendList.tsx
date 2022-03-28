import React from "react";
import {FriendDescriptionBlock} from "./FriendDescriptionBlock";
import {followAC, unfollowAC} from "../../Redux/ProfilePage/ProfilePageReducer";


export const FriendList = (props: any) => {
    console.log(props)



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
import {stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React from "react";
import s from "./FriendsPage.module.css";
import Paginator from "../Paginator/Paginator";
import {FriendList} from "./FriendList";

type FriendsPagePropsType = {
    state: stateProfilePageType
    dispatch: () => void
}
export const FriendsPage: React.FC<FriendsPagePropsType> = ({state, dispatch}) => {
    return (
        <div className={s.friendsPage}>

            <div className={s.onlineOfflineFriendsBlock}>

                <Paginator state={state} dispatch={dispatch}/>

            </div>

            <div className={s.searchFriends}>search friends</div>

            <div className={s.friendList}><FriendList state={state} dispatch={dispatch}/>

            </div>
        </div>
    )
}
import React, {useState} from "react";
import s from './FriendsPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {FriendList} from "./FriendList";
import {getUsersApi} from "../../Api/Api";


export const FriendsPage = () => {

    const state = useSelector((state: any) => state.profilePage)
    const dispatch = useDispatch()



    return (
        <div className={s.friendsPage}>
            <div
                className={s.onlineOfflineFriendsBlock}>online/offline friends block</div>
            <div className={s.searchFriends}>search friends</div>
            <div className={s.friendList}><FriendList  state={state} dispatch={dispatch}/></div>
        </div>
    )
}


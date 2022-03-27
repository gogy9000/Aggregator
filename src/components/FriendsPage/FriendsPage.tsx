import React from "react";
import s from './FriendsPage.module.css'
import {useDispatch, useSelector} from "react-redux";


export const FriendsPage = () => {
    const state= useSelector((state:any )=>state.profilePage )
    const dispatch= useDispatch()
    return (

        <div className={s.friendsPage}>
            <div className={s.onlineOfflineFriendsBlock}>online/offline friends block</div>
            <div className={s.searchFriends}>search friends</div>
            <FriendList state={state} dispatch={dispatch} />
        </div>
    )
}

const FriendList = (props:any) => {
    console.log(props)
  return(
      <div className={s.friendList}> friends list</div>
  )
}
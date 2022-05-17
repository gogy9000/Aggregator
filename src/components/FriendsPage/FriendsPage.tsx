import {ActionsType, stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React, {ChangeEvent, useState} from "react";
import s from "./FriendsPage.module.css";
import Paginator from "../Paginator/Paginator";
import {FriendList} from "./FriendList";
import {ActionsAppType} from "../../Redux/App/AppReducer";

type FriendsPagePropsType = {
    state: stateProfilePageType
    dispatch: (actions:ActionsType|ActionsAppType)=>void
    getUsersCallBack:(userName:string, isFollow:string)=>void
    getFollowUsers?:(isFollow:string)=>void
}
export const FriendsPage: React.FC<FriendsPagePropsType> = ({state, dispatch,getUsersCallBack}) => {

    const [userName, setUserName]=useState<string>('')


    const changeUserName = (e:ChangeEvent<HTMLInputElement>) => {
      setUserName(e.currentTarget.value)
    }

    const getUsers = (isFollow:string) => {
    getUsersCallBack(userName,isFollow)
}

    return (
        <div className={s.friendsPage}>

            <div className={s.onlineOfflineFriendsBlock}>
                <Paginator state={state} dispatch={dispatch}/>
            </div>

            <div className={s.searchFriends}>
                <button onClick={()=>{getUsers('true')}} > follow</button>
                <button onClick={()=>{getUsers('false')}} > unfollow</button>
                <button onClick={()=>{getUsers('')}} > all</button>


                <input onChange={changeUserName} type="text" value={userName}/>
                    <button onClick={()=>{getUsers('')}} > search</button>
            </div>

            <div className={s.friendList}><FriendList state={state} dispatch={dispatch}/>

            </div>
        </div>
    )
}
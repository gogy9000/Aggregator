import {ActionsType, stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./FriendsPage.module.css";
import Paginator from "../Paginator/Paginator";
import {FriendList} from "./FriendList";
import {ActionsAppType} from "../../Redux/AppReducer/AppReducer";

type FriendsPagePropsType = {
    state: stateProfilePageType
    dispatch: (actions: ActionsType | ActionsAppType) => void
    getUsersCallBack: (page: number, userName: string, isFollow: string, count: number) => void
    getFollowUsers?: (isFollow: string) => void
}
export const FriendsPage: React.FC<FriendsPagePropsType> = ({state, dispatch, getUsersCallBack}) => {

    const [userName, setUserName] = useState<string>('')
    const [isFollowers, setIsFollowers] = useState<string>('')
    const [count, setCount] = useState<number>(10)
    const [page, setPage] = useState<number>(1)

    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }
    useEffect(() => {
        getUsersCallBack(page, userName, isFollowers, count)
    }, [userName, isFollowers, page])


    return (
        <div className={s.friendsPage}>

            <div className={s.onlineOfflineFriendsBlock}>
                <Paginator clickPageCallBack={setPage}
                           page={page}
                           count={count}
                           state={state}
                           dispatch={dispatch}
                           userName={userName}
                           isFollowers={isFollowers}/>
            </div>

            <div className={s.searchFriends}>
                <button onClick={() => {
                    setIsFollowers('true')

                }}> follow
                </button>
                <button onClick={() => {
                    setIsFollowers('false')

                }}> unfollow
                </button>
                <button onClick={() => {
                    setIsFollowers('')

                }}> all
                </button>


                <input onChange={changeUserName} type="text" value={userName}/>
                <button onClick={() => {
                    setCount(20)
                }}> search
                </button>
            </div>

            <div className={s.friendList}><FriendList state={state} dispatch={dispatch}/>

            </div>
        </div>
    )
}
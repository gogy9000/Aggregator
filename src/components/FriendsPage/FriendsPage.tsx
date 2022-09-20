import {profileActivators, stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./FriendsPage.module.css";
import {PaginatorWrapper} from "../Paginator/PaginatorWrapper";
import {FriendList} from "./FriendList";
import {useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {Redirect} from "../../hoc/Redirect";
import {AppStateType} from "../../Redux/Redux-store";



export const FriendsPage =compose(Redirect, React.memo)( () => {

    const [userName, setUserName] = useState<string>('')
    const [isFollow, setIsFollowers] = useState<string>('')
    const [count, setCount] = useState<number>(3)
    const [page, setPage] = useState<number>(1)

    const users=useSelector((state:AppStateType) => state.profilePage.users)
    const currentPage=useSelector((state:AppStateType) => state.profilePage.currentPage)

    const dispatch = useDispatch()

    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }
    // useEffect(() => {
    //     dispatch(profileActivators.getUser({page, userName,  isFollow, count}))
    // }, [userName, isFollow, count, page])

    return (
        <div className={s.friendsPage}>

            <div className={s.onlineOfflineFriendsBlock}>
                <PaginatorWrapper clickPageCallBack={setPage}
                                  page={page}
                                  count={count}
                                  users={users}
                                  currentPage={currentPage}

                />
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
                    setUserName('')
                }}> clear
                </button>

            </div>

            <div className={s.friendList}><FriendList users={users}/>

            </div>
        </div>
    )
})
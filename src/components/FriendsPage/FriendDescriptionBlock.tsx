import s from "./FriendList.module.css";
import {defaultPhoto} from "../../photo/photo";
import React, {FC, memo} from "react";
import {NavLink} from "react-router-dom";
import {UserDataType} from "../../Api/Api";

type FriendDescriptionBlockPropsType = {
    user: UserDataType
    isFetchingRequest?: boolean
    follow: () => void
    unfollow: () => void
}
export const FriendDescriptionBlock: FC<FriendDescriptionBlockPropsType> = memo((props) => {
    const {user, follow, unfollow, isFetchingRequest} = props

    return (
        <div className={s.FriendDescriptionBlock}>
            <div className={s.FriendPhoto}>
                <img className={s.FriendPhotoImg}
                     src={user.photos.small === null ? defaultPhoto : user.photos.small}
                     alt={'logo'}/>
            </div>
            <div>
                <div className={s.FriendName}>
                    <NavLink to={`/profile/${user.id}`}>{user.name}</NavLink>

                </div>
                <div className={s.ButtonFollowUnFollow}>
                    {user.followed
                        ? <button onClick={unfollow} disabled={isFetchingRequest}>
                            unfollow
                        </button>
                        : <button onClick={follow} disabled={isFetchingRequest}>
                            follow
                        </button>
                    }
                </div>
            </div>
        </div>
    )
})
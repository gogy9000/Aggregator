import s from "./FriendList.module.css";
import {defaultPhoto} from "../../photo/photo";
import React from "react";
import {NavLink} from "react-router-dom";

export const FriendDescriptionBlock = (props: any) => {

    return (
        <div className={s.FriendDescriptionBlock}>
            <div className={s.FriendPhoto}>
                <img className={s.FriendPhotoImg}
                     src={props.user.photos.small === null ? defaultPhoto : props.user.photos.small}
                     alt={'logo'}/>
            </div>
            <div>
                <div className={s.FriendName}>
                    <NavLink to={`/profile/${props.user.id}`}>{props.user.name}</NavLink>

                </div>
                <div className={s.ButtonFollowUnFollow}>
                    {props.user.followed
                        ? <button onClick={props.unfollow} disabled={props.isFetchingRequest}>
                            unfollow
                        </button>
                        : <button onClick={props.follow} disabled={props.isFetchingRequest}>
                            follow
                        </button>
                    }
                </div>
            </div>
        </div>

    )
}
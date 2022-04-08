import s from "./FriendList.module.css";
import {defaultPhoto} from "../../photo/photo";
import React from "react";
import {NavItem} from "../NavBar/NavItem/NavItem";

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
                    {props.user.name}
                </div>
                <div className={s.ButtonFollowUnFollow}>
                    {props.user.followed
                        ? <div onClick={props.unfollow}>
                            <NavItem elementName={'unfollow'} to={''}/>
                        </div>
                        : <div onClick={props.follow}>
                            <NavItem elementName={'follow'} to={''}/>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}
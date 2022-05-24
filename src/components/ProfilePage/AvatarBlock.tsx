import s from "./ProfilePage.module.css";
import {defaultPhoto} from "../../photo/photo";
import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";

type AvatarBlockPropsType={
}

export const AvatarBlock:React.FC<AvatarBlockPropsType> = () => {

    const state = useSelector((state: AppStateType) => state.profilePage)

    return (
        <div>
            <div className={s.Avatar}>
                 <img src={!!state.profile?.photos?.large?state.profile.photos.large:defaultPhoto} />
            </div>
        </div>
    )
}


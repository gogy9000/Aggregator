import s from "./ProfilePage.module.css";
import {avaPhoto, defaultPhoto} from "../../photo/photo";
import {stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";

type AvatarBlockPropsType={
    state:stateProfilePageType
}

export const AvatarBlock:React.FC<AvatarBlockPropsType> = ({state}) => {



    return (
        <div>
            <div className={s.Avatar}>
                 <img src={!!state.profile?.photos?.large?state.profile.photos.large:defaultPhoto} />




            </div>
        </div>
    )
}


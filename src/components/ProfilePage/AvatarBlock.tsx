import s from "./ProfilePage.module.css";
import {avaPhoto, defaultPhoto} from "../../photo/photo";
import {stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React from "react";

type AvatarBlockPropsType={
    state:stateProfilePageType
}

export const AvatarBlock:React.FC<AvatarBlockPropsType> = ({state}) => {




    return (
        <div>
            <div className={s.Avatar}>
                {/*// @ts-ignore*/}
                {state.profile.photos.large && <img src={state.profile.photos.large} alt={defaultPhoto}/>}
                {/*// @ts-ignore*/}
                { state.profile.photos.large===null && <img src={defaultPhoto} alt={defaultPhoto}/>}

            </div>
        </div>
    )
}


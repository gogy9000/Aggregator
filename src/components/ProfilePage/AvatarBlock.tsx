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

                {state.profile? <img  // @ts-ignore
                     src={state.profile.photos.large} alt={defaultPhoto}/>:
                    <img src={defaultPhoto} alt={defaultPhoto}/> }
            </div>
        </div>
    )
}


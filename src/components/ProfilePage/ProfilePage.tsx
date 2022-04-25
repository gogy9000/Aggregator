import s from "./ProfilePage.module.css";
import {ProfileSidebar} from "./ProfileSidebar";
import {ProfileContent} from "./ProfileContent";
import React from "react";

type ProfilePage ={
    callBack:()=>void
}

export const ProfilePage:React.FC<ProfilePage> = ({callBack}) => {
    return (
        <div className={s.ProfilePage}>
            <div className={s.ProfileSidebar}>
                <ProfileSidebar callBack={callBack}/>
            </div>
            < div
                className={s.ProfileContent}>
                <ProfileContent/>
            </div>

        </div>
    )

}
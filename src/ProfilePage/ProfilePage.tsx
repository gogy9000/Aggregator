import {ProfileSidebar} from "./ProfileSidebar";
import s from './ProfilePage.module.css'
import {ProfileContent} from "./ProfileContent";
import React from "react";



const ProfilePage = () => {


    return (
        <div className={s.ProfilePage}>
            <div className={s.ProfileSidebar}>
                <ProfileSidebar/>
            </div>
            < div
                className={s.ProfileContent}>
                <ProfileContent/>
            </div>

        </div>
    )
}


export default ProfilePage


import {ProfileSidebar} from "./ProfileSidebar";
import s from './ProfilePage.module.css'
import {ProfileContent} from "./ProfileContent";
import React from "react";
import {useDispatch, useSelector} from "react-redux";


const ProfilePageContainer = (props: any) => {

    const users =useSelector((state:any)=>state.profilePage)
    const dispatch= useDispatch()
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


export default ProfilePageContainer


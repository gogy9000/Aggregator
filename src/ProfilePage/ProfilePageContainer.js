import {ProfileSidebar} from "./ProfileSidebar";
import s from './ProfilePage.module.css'
import {ProfileContent} from "./ProfileContent";

 const ProfilePageContainer = (props) => {
    return (
        <div className={s.ProfilePage}>
            <div className={s.ProfileSidebar}>
                <ProfileSidebar />
            </div>
            <div className={s.ProfileContent}>
                <ProfileContent/>
            </div>

        </div>
    )

}

export default ProfilePageContainer


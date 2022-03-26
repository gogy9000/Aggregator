import {NavItem} from "../components/NavBar/NavItem/NavItem";
import {FriendsBar} from "./FriendsBar";
import s from './ProfilePage.module.css'
import {PhotoBar} from "./PhotoBar";


export const ProfileSidebar = (props:any) => {
    return (
        <div>
            <AvatarBlock/>
            <NavItem elementName={'settings'} to={'/settings'}/> {/*it's settings*/}
            <FriendsBar/>
            <PhotoBar/>

        </div>
    )
}

const AvatarBlock =()=>{
    return(
        <div>
            <div className={s.Avatar}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyg6D46rycYNRiLV7xW_1Dt_pOBie445Pgjg&usqp=CAU"
                    alt="patrick"/>
            </div>
        </div>
    )
}
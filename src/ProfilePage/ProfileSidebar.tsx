import {NavItem} from "../components/NavBar/NavItem/NavItem";
import {FriendsBar} from "./FriendsBar";
import {PhotoBar} from "./PhotoBar";
import {useDispatch, useSelector} from "react-redux";
import {AvatarBlock} from "./AvatarBlock";


export const ProfileSidebar = () => {

    const state =useSelector((state:any)=>state.profilePage)
    const dispatch= useDispatch()


    return (
        <div>
            <AvatarBlock state={state}/>
            <NavItem elementName={'settings'} to={'/settings'}/> {/*it's settings*/}
            <FriendsBar state={state} dispatch={dispatch}/>
            <PhotoBar/>

        </div>
    )
}


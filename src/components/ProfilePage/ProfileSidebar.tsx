import {NavItem} from "../NavBar/NavItem/NavItem";
import {FriendsBar} from "./FriendsBar";
import {PhotoBar} from "./PhotoBar";
import {useDispatch, useSelector} from "react-redux";
import {AvatarBlock} from "./AvatarBlock";
import React from "react";
import {AppStateType} from "../../Redux/Redux-store";

type ProfileSidebarPropsType = {}
export const ProfileSidebar: React.FC<ProfileSidebarPropsType> = (props) => {

    const state = useSelector((state: AppStateType) => state.profilePage)
    const initState = useSelector((state: AppStateType) => state.AppReducer)

    return (

        initState.isFetching ?
            <div>loading</div>
            : <div>
                <NavItem to={'/profile/'}>
                    <div>{state.profile === null ?
                        'loading name...'
                        : state.profile.fullName}
                    </div>
                </NavItem>
                <AvatarBlock/>
                <NavItem elementName={'settings'} to={'/settings'}/>
                <FriendsBar/>
                <PhotoBar/>
            </div>

    )
}


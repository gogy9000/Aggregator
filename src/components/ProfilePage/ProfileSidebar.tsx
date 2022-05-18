import {NavItem} from "../NavBar/NavItem/NavItem";
import {FriendsBar} from "./FriendsBar";
import {PhotoBar} from "./PhotoBar";
import {useDispatch, useSelector} from "react-redux";
import {AvatarBlock} from "./AvatarBlock";
import React from "react";
import {AppStateType} from "../../Redux/Redux-store";

type ProfileSidebarPropsType={
    callBack:()=>void
}
export const ProfileSidebar:React.FC<ProfileSidebarPropsType> = (props) => {

    const state = useSelector((state: any) => state.profilePage)
    const initState= useSelector((state:AppStateType)=>state.AppReducer)
    const dispatch = useDispatch()


    return (

        initState.isFetching?<div>loading</div>: <div>

                <NavItem to={'/profile/'}>
                    <div>{state.profile=== null ? 'state.profile.fullName' : state.profile.fullName}</div>
                </NavItem>
                <AvatarBlock state={state}/>
                <NavItem elementName={'settings'} to={'/settings'}/> {/*it's settings*/}
                <FriendsBar state={state} dispatch={dispatch} callBack={props.callBack}/>
                <PhotoBar/>


            </div>

    )
}


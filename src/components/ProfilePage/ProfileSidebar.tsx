import {NavItem} from "../NavBar/NavItem/NavItem";
import {FriendsBar} from "./FriendsBar";
import {PhotoBar} from "./PhotoBar";
import {connect, useDispatch, useSelector} from "react-redux";
import {AvatarBlock} from "./AvatarBlock";
import React from "react";
import {AppStateType} from "../../Redux/Redux-store";
import {compose} from "redux";
import {initStateType} from "../../Redux/AppReducer/AppReducer";
import {stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";

type ProfileSidebarType={
    state:AppStateType
}

export class ProfileSidebar extends React.Component< ProfileSidebarType , any> {




    render() {
        console.log(this.props)
        return (

            this.props.state.AppReducer.isFetching ?
                <div>loading</div>
                : <div>
                    <NavItem to={'/profile/'}>
                        <div>{this.props.state.profilePage.profile === null ?
                            'loading name...'
                            : this.props.state.profilePage.profile.fullName}
                        </div>
                    </NavItem>
                    <AvatarBlock/>
                    <NavItem elementName={'settings'} to={'/settings'}/>
                    <FriendsBar/>
                    <PhotoBar/>
                </div>

        )
    }
}

const mapStateToProps = (state:AppStateType) => {

    return{
        state:state
    }

}

export const ProfileSidebarCompose=compose(
    connect(mapStateToProps))(ProfileSidebar)


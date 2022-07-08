import {NavItem} from "../NavBar/NavItem/NavItem";
import {FriendsBar} from "./FriendsBar";
import {PhotoBar} from "./PhotoBar";
import {connect} from "react-redux";
import {AvatarBlock} from "./AvatarBlock";
import React from "react";
import {AppStateType} from "../../Redux/Redux-store";
import {compose} from "redux";
import {ProfileStatus} from "./ProfileStatus";
import {getIsFetching, getProfile} from "../../Redux/Selectors";
import {ProfileType} from "../../Api/Api";


type ProfileSidebarType = {
    isFetching: boolean
    profile:ProfileType
}

 class ProfileSidebar extends React.Component<ProfileSidebarType, any> {



    render() {

        return (

            this.props.isFetching ?
                <div>loading</div>
                : <div>
                    <NavItem to={'/profile/'}>
                        <div>{this.props.profile === null ?
                            'loading name...'
                            : this.props.profile.fullName}
                        </div>
                    </NavItem>
                    <AvatarBlock/>
                    <ProfileStatus/>
                    <NavItem elementName={'settings'} to={'/settings'}/>
                    <FriendsBar/>
                    <PhotoBar/>
                </div>

        )
    }
}

const mapStateToProps = (state: AppStateType) => {

    return {
        isFetching: getIsFetching(state),
        profile:getProfile(state)
    }

}

export const ProfileSidebarCompose = compose(
    connect(mapStateToProps))(ProfileSidebar)



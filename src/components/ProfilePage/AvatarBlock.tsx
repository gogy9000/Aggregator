import s from "./ProfilePage.module.css";
import {defaultPhoto} from "../../photo/photo";
import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";

import {getProfile} from "../../Redux/Selectors";
import {ProfileType} from "../../Api/Api";
import {compose} from "redux";

type AvatarBlockPropsType={
profile:ProfileType
}

class AvatarBlockClass extends React.Component<AvatarBlockPropsType,any> {

    render() {
        return (
            <div>
                <div className={s.Avatar}>
                    <img src={!!this.props.profile?.photos?.large ? this.props.profile.photos.large : defaultPhoto}/>
                </div>
            </div>
        )
    }
}
export const mapStateToProps = (state:AppRootStateType) => ({
  profile:getProfile(state)
})

export const AvatarBlock = compose(connect(mapStateToProps))(AvatarBlockClass)



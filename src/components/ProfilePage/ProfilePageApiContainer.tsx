import React from "react";
import {ProfilePage} from "./ProfilePage";
import {getAllUsersApi, getFollowUsersApi, getProfileApi, getUnFollowUsersApi} from "../../Api/Api";
import {connect, useDispatch} from "react-redux";




const ProfilePageContainer = () => {


}





class ProfilePageApiContainer extends React.Component<any, any>{


componentDidMount() {
    getProfileApi(this.props.dispatch,2)

}

    render() {
    return (
        <ProfilePage />
    )
}

}
const mapStateToProps = (state: any) => (

    {state: state.profilePage})

export default connect(mapStateToProps)(ProfilePageApiContainer)


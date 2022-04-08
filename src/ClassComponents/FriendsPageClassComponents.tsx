import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {getUsersApi} from "../Api/Api";
import s from "../components/FriendsPage/FriendsPage.module.css";
import {FriendList} from "../components/FriendsPage/FriendList";

 class FriendsPageClassComponents extends React.Component<any, any>{

        constructor(props:any) {

            super(props);

        }
    componentDidMount() {
            getUsersApi(this.props.dispatch)
    }

     render() {
        console.log(this.props)
        return (
            <div className={s.friendsPage}>
                <div
                    className={s.onlineOfflineFriendsBlock}>online/offline friends block</div>
                <div className={s.searchFriends}>search friends</div>
                <div className={s.friendList}><FriendList  state={this.props.state} dispatch={this.props.dispatch}/></div>
            </div>
        )
    }

}

const mapStateToProps = (state:any) => (

    { state: state.profilePage})

export default connect(mapStateToProps)(FriendsPageClassComponents)
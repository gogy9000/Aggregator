import s from "./ProfilePage.module.css";
import {NavItem} from "../NavBar/NavItem/NavItem";
import {NavLink} from "react-router-dom";
import {avaPhoto} from "../../photo/photo";
import {connect} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";
import {Component} from "react";

import {UserDataType} from "../../Api/Api";
import {getUsers} from "../../Redux/Selectors";

type FriendsBarClassPropsType = {
    users: UserDataType[]
}

export class FriendsBarClass extends Component<FriendsBarClassPropsType> {

    render() {

        return (
            <div className={s.FriendsBar}>
                <NavItem elementName={'friends'} to={'/friends'}/>
                <div className={s.FriendsBarContent}>
                    <>{this.props.users.map(user => <div key={user.id} className={s.avaBlock}>
                        <img className={s.img}
                             src={avaPhoto}
                             alt="gamer"/>
                        <NavLink to={`/profile/${user.id}`}>
                            <div className={s.nickName}>{user.name}</div>
                        </NavLink>
                    </div>)}</>
                </div>
            </div>)

    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    users: getUsers(state)
})

export const FriendsBar = connect(mapStateToProps)(FriendsBarClass)
import s from "./MessagePage.module.css";
import logo from "../../logo.svg";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";


export const MassageList = (props) => {
    return (
        props.state.messagePage.messagePage.map(
            (el) => {
                return (
                    <MessageBlock id={el.id}

                                  name={el.name}
                                  old={el.old}
                                  message={el.message}
                                  key={el.id}/>
                )
            }
        )
    )
}

const MessageBlock = (props) => {
    let [onOf, setOnOff] = useState(true)
    return (
        <div className={s.MessageBlock}>
            <div className={s.Avatar}>
                <img src={logo} alt="logo"/>
            </div>
            <div className={s.BodyMess}>
                <NavLink to={'/profile'}>
                    <div onMouseEnter={() => setOnOff(onOf ? onOf = false : onOf = true)}
                         onMouseLeave={() => setOnOff(onOf ? onOf = false : onOf = true)}
                         className={onOf ? s.NickName : s.onNickName}>{props.name}:
                    </div>
                </NavLink>
                <div className={s.MessageBody}>{props.message}</div>
            </div>
        </div>
    )
}
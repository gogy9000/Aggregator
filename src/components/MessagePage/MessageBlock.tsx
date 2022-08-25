import React, {useState} from "react";
import s from "./MessagePage.module.css";
import logo from "../../logo.svg";
import {NavLink} from "react-router-dom";

type MessageBlockPropsType = {
    message: {message: string }
    name: string
    avatar:string|null
}
export const MessageBlock: React.FC<MessageBlockPropsType> = ({name, message,avatar}) => {
    let [onOf, setOnOff] = useState(true)
    return (
        <div className={s.MessageBlock}>

            <div className={s.Avatar}>
                <img src={!!avatar?avatar:logo} alt="logo"/>
            </div>

            <div className={s.BodyMess}>

                <NavLink to={'/profile'}>
                    <div onMouseEnter={() => setOnOff(onOf ? onOf = false : onOf = true)}
                         onMouseLeave={() => setOnOff(onOf ? onOf = false : onOf = true)}
                         className={onOf ? s.NickName : s.onNickName}>{name}:
                    </div>
                </NavLink>

                <div className={s.MessageBody}>{message.message}</div>

            </div>

        </div>
    )
}
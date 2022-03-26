import React, {useState} from "react";
import s from "../NavBar.module.css";
import {NavLink} from "react-router-dom";

export const NavItem = (props) => {
    let [onOf, setOnOff] = useState(true)

    return (
        <div onMouseEnter={() => setOnOff(onOf ? onOf = false : onOf = true)}
             onMouseLeave={() => setOnOff(onOf ? onOf = false : onOf = true)}
             className={onOf ? s.elemBlock  : s.backGroundColor}
             >

            <NavLink to={props.to}>{props.elementName}</NavLink>
        </div>
    )
}
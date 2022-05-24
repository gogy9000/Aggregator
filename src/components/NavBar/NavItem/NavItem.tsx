import React, {useState} from "react";
import s from "../NavBar.module.css";
import {NavLink} from "react-router-dom";

type NavItemPropsType={

    to:string
    elementName?:string
}
export const NavItem:React.FC<NavItemPropsType> = ({children,to,elementName}) => {
    let [onOf, setOnOff] = useState(true)

    return (
        <div onMouseEnter={() => setOnOff(onOf ? onOf = false : onOf = true)}
             onMouseLeave={() => setOnOff(onOf ? onOf = false : onOf = true)}
             className={onOf ? s.elemBlock  : s.backGroundColor}
             >
            {children}
            <NavLink to={to}>{elementName}</NavLink>
        </div>
    )
}
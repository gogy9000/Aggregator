import React, {useState} from "react";
import s from "./Header.module.css";
import logo from "./logo.svg";
import {NavItem} from "../NavBar/NavItem/NavItem";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}
export const Header: React.FC<HeaderPropsType> = ({login, isAuth, logout}) => {
    const [editMod, setEditMod] = useState(false)
    const onClickCallback = () => {
        logout()
        setEditMod(false)
    }
    return (
        <div className={s.Header}>
            <div className={s.imgLogoWrapper}>
                <img src={logo} className={s.imgLogo} alt="logo"/>
            </div>
            <div className={s.LogoTip}>Aggregator</div>
            <div className={s.LogoEmpty}>
                <div>
                    {isAuth
                        ? <div onMouseEnter={() => {
                            setEditMod(true)
                        }}>{login}</div>
                        : <NavItem to={'/login'} elementName={'Sign in'}/>}
                </div>
                {
                    editMod &&
                    <button onClick={onClickCallback}
                            onMouseLeave={() => {
                                setEditMod(false)
                            }}>logout
                    </button>
                }
            </div>
        </div>
    )
}
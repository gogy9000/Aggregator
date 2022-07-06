import React, {useEffect, useState} from "react"
import logo from "./logo.svg"
import s from "./Header.module.css"
import {useSelector} from "react-redux";
import {NavItem} from "../NavBar/NavItem/NavItem";
import {AppStateType} from "../../Redux/Redux-store";
import {Redirect} from "../../hoc/Redirect";
import {useDispatchApp} from "../../customHooks/CustomHooks";
import {thunkAuth} from "../../Redux/Auth/Auth";


export const HeaderContainer = () => {

    const dispatch = useDispatchApp()

    const state = useSelector((state: AppStateType) => state.auth)

    const logout = () => {
        dispatch(thunkAuth.logout())
    }


    return <Header login={state.login} isAuth={state.isAuth} logout={logout}/>
}


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

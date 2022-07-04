import React, {useEffect} from "react"
import logo from "./logo.svg"
import s from "./Header.module.css"
import { useSelector} from "react-redux";
import {NavItem} from "../NavBar/NavItem/NavItem";
import {AppStateType} from "../../Redux/Redux-store";





export const HeaderContainer = () => {

   const state=useSelector((state:AppStateType)=>state.auth)



    return <Header login={state.login} isAuth={state.isAuth} />
}


type HeaderPropsType={
    login:string|null
    isAuth:boolean
}

export const Header:React.FC<HeaderPropsType> = ({login,isAuth}) => {
  return(
      <div className={s.Header}>
          <div className={s.imgLogoWrapper}>
              <img src={logo} className={s.imgLogo} alt="logo" />
          </div>
          <div className={s.LogoTip}>Aggregator</div>
          <div className={s.LogoEmpty}>
              <div>
                  {isAuth
                      ?login
                      :<NavItem to={'/login'} elementName={'Sign in'} />}
              </div>
          </div>
      </div>
  )
}
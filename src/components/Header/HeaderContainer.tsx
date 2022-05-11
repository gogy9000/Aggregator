import React, {useEffect} from "react"
import logo from "./logo.svg"
import s from "./Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import * as axios from 'axios'
import {actions} from "../../Redux/Auth/Auth";
import {NavItem} from "../NavBar/NavItem/NavItem";




const HeaderContainer = () => {
   const state=useSelector((state:any)=>state.auth)
  const dispatch= useDispatch()

 useEffect(()=>{

    // @ts-ignore
    return  axios.get('https://social-network.samuraijs.com/api/1.0/auth/me',{withCredentials:true}
     ).then((response:any)=>{
         if (response.data.resultCode!==0){return}
      let {id, login, email}=response.data.data
         dispatch(actions.getAuth(id, login, email))
    })
 },[])


    return (

        <Header login={state.login} isAuth={state.isAuth} />
    )
}

export default HeaderContainer


type HeaderPropsType={
    login:string
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
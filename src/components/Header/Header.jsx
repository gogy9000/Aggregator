import react from "react"
import logo from "./logo.svg"
import s from "./Header.module.css"


const Header = () => {
    return (
        <div className={s.Header}>
            <div className={s.imgLogoWrapper}>
                <img src={logo} className={s.imgLogo} alt="logo" />
            </div>
            <div className={s.LogoTip}>Aggregator</div>
            <div className={s.LogoEmpty}></div>
        </div>
    )
}

export default Header
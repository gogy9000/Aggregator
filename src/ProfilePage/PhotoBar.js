import s from "./ProfilePage.module.css";
import {NavItem} from "../components/NavBar/NavItem/NavItem";

export const PhotoBar = (props) => {
    return (
        <div className={s.PhotoBar}>
            <NavItem elementName={'Photo'} to={'/Photo'}/>
            <div className={s.albumContent}>
                <div className={s.image}>
                    <img className={s.img}
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8YpMSL5_QMtgp07Zw11NoR81dBrvRq4SgA&usqp=CAU"
                         alt="photo"/>
                </div>
                <div className={s.image}>
                    <img className={s.img}
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8YpMSL5_QMtgp07Zw11NoR81dBrvRq4SgA&usqp=CAU"
                         alt="photo"/>
                </div>
                <div className={s.image}>
                    <img className={s.img}
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8YpMSL5_QMtgp07Zw11NoR81dBrvRq4SgA&usqp=CAU"
                         alt="photo"/>
                </div>
                <div className={s.image}>
                    <img className={s.img}
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8YpMSL5_QMtgp07Zw11NoR81dBrvRq4SgA&usqp=CAU"
                         alt="photo"/>
                </div>


            </div>
        </div>
    )

}
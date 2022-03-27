import s from "./ProfilePage.module.css";
import {avaPhoto} from "../../photo/photo";

export const AvatarBlock = (props: any) => {
    return (
        <div>
            <div className={s.Avatar}>
                <img
                    src={avaPhoto} alt="patrick"/>

            </div>
        </div>
    )
}
import s from "./MessagePage.module.css";
import React, {useState} from "react";

export const MessageInputPanel = (props) => {

    let [onOf, setOnOff] = useState(true)

    return (
        <>
            <div className={s.textarea}>
                    <textarea onChange={props.changeMessageValue}
                              value={props.newPost}/>
            </div>

                <button onMouseEnter={() => setOnOff(onOf ? onOf = false : onOf = true)}
                        onMouseLeave={() => setOnOff(onOf ? onOf = false : onOf = true)}
                        className={onOf ? s.onButton : s.button} onClick={props.addText}>Send</button>


        </>
    )
}
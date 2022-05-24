import s from "./MessagePage.module.css";
import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {actions} from "../../Redux/MessagePage/messagePageReducer";

export const MessageInputPanel = () => {

    const state = useSelector((state: AppStateType) => state.messagePage)
    let [onOf, setOnOff] = useState(true)
    const dispatch = useDispatch()

    let addText = () => dispatch(actions.addTextAC())

    let changeMessageValue = (e:ChangeEvent<HTMLInputElement>) => {
        let text =e.currentTarget.value
        dispatch(actions.onChangeAC(text))
    }

    return (
        <>
            <div className={s.textarea}>
                    <input onChange={changeMessageValue} value={state.newPost}/>
            </div>

            <button onMouseEnter={() => setOnOff(onOf ? onOf = false : onOf = true)}
                    onMouseLeave={() => setOnOff(onOf ? onOf = false : onOf = true)}
                    className={onOf ? s.onButton : s.button} onClick={addText}>Send
            </button>


        </>
    )
}
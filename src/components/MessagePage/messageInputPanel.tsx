import s from "./MessagePage.module.css";
import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {actions} from "../../Redux/MessagePage/messagePageReducer";
import { Form, Field } from 'react-final-form'
import {useDispatchApp} from "../../customHooks/CustomHooks";
import {FormApi} from "final-form";

export const MessageInputPanel = () => {

    let [onOf, setOnOff] = useState(true)
    const dispatch = useDispatchApp()

    let addText = (values:{message:string},form: FormApi<{message: string}>) => {
        dispatch(actions.addTextAC(values))
        form.reset()
    }



    return (
        <>
            <div className={s.textarea}>
                <Form onSubmit={addText}
                render={({handleSubmit,submitting,pristine,form})=>{

                    return <form onSubmit={handleSubmit}>
                       <div>

                           <Field
                               name="message"
                               component="input"
                               type="text"
                               placeholder="message"
                           />
                       </div>
                       <button onMouseEnter={() => setOnOff(onOf ? onOf = false : onOf = true)}
                               onMouseLeave={() => setOnOff(onOf ? onOf = false : onOf = true)}
                               type="submit" disabled={submitting}
                               className={onOf ? s.onButton : s.button}>Send
                       </button>
                   </form>
                }}/>


            </div>




        </>
    )
}
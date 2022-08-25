import s from "./MessagePage.module.css";
import React, {FC, useState} from "react";
import { Form, Field } from 'react-final-form'
import {FormApi} from "final-form";
import {required} from "../../utils/validators/Validators";

type MessageInputPanelPropsType={
    sendMessage:(value:string)=>void
}
export const MessageInputPanel:FC<MessageInputPanelPropsType> = (props) => {
    const {sendMessage}=props

    let [onOf, setOnOff] = useState(true)

    let addText = (values:{message:string},form: FormApi<{message: string}>) => {
        sendMessage(values.message)
        form.reset()
    }



    return (
        <>
            <div className={s.textarea}>
                <Form onSubmit={addText}
                render={({handleSubmit,submitting,pristine})=>{

                    return <form onSubmit={handleSubmit}>
                       <div>

                           <Field
                               name="message"
                               validate={required}
                           >{({ input, meta ,pristine}) => (
                               <div>
                                   <input {...input} type="text" placeholder={meta.touched && meta.error? meta.error:'message'}/>
                               </div>
                           )}

                           </Field>
                       </div>
                       <button onMouseEnter={() => setOnOff(onOf ? onOf = false : onOf = true)}
                               onMouseLeave={() => setOnOff(onOf ? onOf = false : onOf = true)}
                               type="submit" disabled={submitting||pristine}
                               className={onOf ? s.onButton : s.button}>Send
                       </button>
                   </form>
                }}/>


            </div>




        </>
    )
}
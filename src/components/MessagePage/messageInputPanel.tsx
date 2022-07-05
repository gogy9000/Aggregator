import s from "./MessagePage.module.css";
import React, { useState} from "react";

import {actions} from "../../Redux/MessagePage/messagePageReducer";
import { Form, Field } from 'react-final-form'
import {useDispatchApp} from "../../customHooks/CustomHooks";
import {FormApi} from "final-form";
import {composeValidators, required} from "../../utils/validators/Validators";

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
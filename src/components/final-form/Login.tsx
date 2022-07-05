import React from 'react'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import {useDispatchApp} from "../../customHooks/CustomHooks";
import {thunkAuth} from "../../Redux/Auth/Auth";
import {composeValidators, minValue, mustBeNumber, required} from "../../utils/validators/Validators";

// const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))




 export const Login = () => {

    const dispatch=useDispatchApp()

     const onSubmit =  (values:any) => {
            dispatch(thunkAuth.login(values))
     }


    return (
         <Styles>
             <h1>Login</h1>

             <Form
                 onSubmit={onSubmit}
                 initialValues={{ rememberMe:false }}
                 render={({handleSubmit, form, submitting, pristine, values}) => (
                     <form onSubmit={handleSubmit}>
                         <div>

                             <Field
                                 validate={required}
                                 name="email"
                             >{({ input, meta }) => (
                                 <div>
                                     <label>email</label>
                                     <input {...input} type="text" placeholder="email" />
                                     {meta.error && meta.touched && <span>{meta.error}</span>}
                                 </div>
                             )}</Field>
                         </div>
                         <div>
                             <Field
                                 name="password"
                                 validate={composeValidators(required)}
                             >{({ input, meta }) => (
                                 <div>
                                     <label>password</label>
                                     <input {...input} type="password" placeholder="password" />
                                     {meta.error && meta.touched && <span>{meta.error}</span>}
                                 </div>
                             )}

                             </Field>
                         </div>
                         <div>
                             <label>Remember me</label>
                             <Field name="rememberMe" component="input" type="checkbox"/>
                         </div>
                         <div className="buttons">
                             <button type="submit" disabled={submitting || pristine}>
                                 Submit
                             </button>

                         </div>
                     </form>
                 )}
             />
         </Styles>
     )
 }
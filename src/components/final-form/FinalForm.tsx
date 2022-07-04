import React from 'react'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import {useDispatchApp} from "../../customHooks/CustomHooks";
import {thunkAuth} from "../../Redux/Auth/Auth";

// const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))




 export const FinalForm = () => {
    const dispatch=useDispatchApp()
     const onSubmit =  (values:any) => {
            dispatch(thunkAuth.login(values))
         // @ts-ignore
         window.alert(JSON.stringify(values, 0 , 2))
     }

    return (
         <Styles>
             <h1>Login</h1>
             {/*<a*/}
             {/*    href="https://final-form.org/react"*/}
             {/*    target="_blank"*/}
             {/*    rel="noopener noreferrer"*/}
             {/*qq0075129@gmail.com*/}
             {/*>*/}
             {/*    Read Docs*/}
             {/*</a>*/}
             <Form
                 onSubmit={onSubmit}
                 initialValues={{ rememberMe:true }}
                 render={({handleSubmit, form, submitting, pristine, values}) => (
                     <form onSubmit={handleSubmit}>
                         <div>

                             <Field
                                 name="email"
                                 component="input"
                                 type="text"
                                 placeholder="email"
                             />
                         </div>
                         <div>

                             <Field
                                 name="password"
                                 component="input"
                                 type="text"
                                 placeholder="password"
                             />
                         </div>
                         <div>
                             <label>Remember me</label>
                             <Field name="rememberMe" component="input" type="checkbox"/>
                         </div>
                         {/*<div>*/}
                         {/*    <label>Favorite Color</label>*/}
                         {/*    <Field name="favoriteColor" component="select">*/}
                         {/*        <option />*/}
                         {/*        <option value="#ff0000">❤️ Red</option>*/}
                         {/*        <option value="#00ff00">💚 Green</option>*/}
                         {/*        <option value="#0000ff">💙 Blue</option>*/}
                         {/*    </Field>*/}
                         {/*</div>*/}
                         {/*<div>*/}
                         {/*    <label>Toppings</label>*/}
                         {/*    <Field name="toppings" component="select" multiple>*/}
                         {/*        <option value="chicken">🐓 Chicken</option>*/}
                         {/*        <option value="ham">🐷 Ham</option>*/}
                         {/*        <option value="mushrooms">🍄 Mushrooms</option>*/}
                         {/*        <option value="cheese">🧀 Cheese</option>*/}
                         {/*        <option value="tuna">🐟 Tuna</option>*/}
                         {/*        <option value="pineapple">🍍 Pineapple</option>*/}
                         {/*    </Field>*/}
                         {/*</div>*/}
                         {/*<div>*/}
                         {/*    <label>Sauces</label>*/}
                         {/*    <div>*/}
                         {/*        <label>*/}
                         {/*            <Field*/}
                         {/*                name="sauces"*/}
                         {/*                component="input"*/}
                         {/*                type="checkbox"*/}
                         {/*                value="ketchup"*/}
                         {/*            />{' '}*/}
                         {/*            Ketchup*/}
                         {/*        </label>*/}
                         {/*        <label>*/}
                         {/*            <Field*/}
                         {/*                name="sauces"*/}
                         {/*                component="input"*/}
                         {/*                type="checkbox"*/}
                         {/*                value="mustard"*/}
                         {/*            />{' '}*/}
                         {/*            Mustard*/}
                         {/*        </label>*/}
                         {/*        <label>*/}
                         {/*            <Field*/}
                         {/*                name="sauces"*/}
                         {/*                component="input"*/}
                         {/*                type="checkbox"*/}
                         {/*                value="mayonnaise"*/}
                         {/*            />{' '}*/}
                         {/*            Mayonnaise*/}
                         {/*        </label>*/}
                         {/*        <label>*/}
                         {/*            <Field*/}
                         {/*                name="sauces"*/}
                         {/*                component="input"*/}
                         {/*                type="checkbox"*/}
                         {/*                value="guacamole"*/}
                         {/*            />{' '}*/}
                         {/*            Guacamole 🥑*/}
                         {/*        </label>*/}
                         {/*    </div>*/}
                         {/*</div>*/}
                         {/*<div>*/}
                         {/*    <label>Best Stooge</label>*/}
                         {/*    <div>*/}
                         {/*        <label>*/}
                         {/*            <Field*/}
                         {/*                name="stooge"*/}
                         {/*                component="input"*/}
                         {/*                type="radio"*/}
                         {/*                value="larry"*/}
                         {/*            />{' '}*/}
                         {/*            Larry*/}
                         {/*        </label>*/}
                         {/*        <label>*/}
                         {/*            <Field*/}
                         {/*                name="stooge"*/}
                         {/*                component="input"*/}
                         {/*                type="radio"*/}
                         {/*                value="moe"*/}
                         {/*            />{' '}*/}
                         {/*            Moe*/}
                         {/*        </label>*/}
                         {/*        <label>*/}
                         {/*            <Field*/}
                         {/*                name="stooge"*/}
                         {/*                component="input"*/}
                         {/*                type="radio"*/}
                         {/*                value="curly"*/}
                         {/*            />{' '}*/}
                         {/*            Curly*/}
                         {/*        </label>*/}
                         {/*    </div>*/}
                         {/*</div>*/}
                         {/*<div>*/}
                         {/*    <label>Notes</label>*/}
                         {/*    <Field name="notes" component="textarea" placeholder="Notes" />*/}
                         {/*</div>*/}
                         <div className="buttons">
                             <button type="submit" disabled={submitting || pristine}>
                                 Submit
                             </button>
                             {/*<button*/}
                             {/*    type="button"*/}
                             {/*    onClick={form.reset}*/}
                             {/*    disabled={submitting || pristine}*/}
                             {/*>*/}
                             {/*    Reset*/}
                             {/*</button>*/}
                         </div>
                         {/*@ts-ignore*/}
                         {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
                     </form>
                 )}
             />
         </Styles>
     )
 }
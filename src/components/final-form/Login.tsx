import React from 'react'
import Styles from './Styles'
import {Form, Field} from 'react-final-form'
import {useDispatchApp} from "../../customHooks/CustomHooks";
import {authWorkers, sagasAuthActions} from "../../Redux/Auth/Auth";
import {composeValidators, minValue, mustBeNumber, required} from "../../utils/validators/Validators";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {Navigate} from 'react-router-dom';
import {FORM_ERROR} from "final-form";

// const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))


export const Login = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const errorLog = useSelector((state: AppStateType) => state.auth.errorLog)

    const dispatch = useDispatchApp()

    const onSubmit = async (values: any) => {
        dispatch(sagasAuthActions.login(values))
        // if (res != undefined) {
        //     return {[FORM_ERROR]: res}
        // }
    }

    if (isAuth) {
        return <Navigate replace to='/profile'/>
    }

    return (
        <Styles>

            <h1>Login</h1>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, form, submitError, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <div>

                            <Field
                                validate={required}
                                name="email"
                            >{({input, meta}) => (
                                <div>
                                    <label>email</label>
                                    <input {...input} type="text" placeholder="email"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    {errorLog && errorLog['email'] && <span>{errorLog['email']}</span>}
                                </div>
                            )}</Field>
                        </div>
                        <div>
                            <Field
                                name="password"
                                validate={composeValidators(required)}
                            >{({input, meta}) => (
                                <div>
                                    <label>password</label>
                                    <input {...input} type="password" placeholder="password"/>
                                    {(meta.error || meta.submitError) && meta.touched &&
                                        <span>{meta.error || meta.submitError}</span>}
                                </div>
                            )}

                            </Field>
                        </div>
                        <div>
                            <label>Remember me</label>
                            <Field name="rememberMe" component="input" type="checkbox"/>
                        </div>
                        {submitError && <div className="error">{submitError}</div>}
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
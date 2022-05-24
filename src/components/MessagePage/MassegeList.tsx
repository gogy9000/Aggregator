import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {MessageBlock} from "./MessageBlock";


export const MassageList = () => {

    const state = useSelector((state: AppStateType) => state.messagePage)

    return (
        <>
            {
                state.messagePage.map(
                    (el) => {
                        return (
                            <MessageBlock name={el.name} message={el.message} key={el.id}/>
                        )
                    }
                )
            }
        </>
    )
}



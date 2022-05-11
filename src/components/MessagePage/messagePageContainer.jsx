import {actions} from "../../Redux/MessagePage/messagePageReducer";
import React from "react";
import MessagePage from "./messagePage";
import {useDispatch, useSelector} from "react-redux";




export const MessagePageContainer = () => {
    const state =useSelector((state)=>state)
    const dispatch= useDispatch()


    let addText = () => {
        dispatch(actions.addTextAC())
    }

    let changeMessageValue = (e) => {
        let text = e.target.value
        dispatch(actions.onChangeAC(text))

    }

    return (
        <div>
            <MessagePage state={state}
                         dispatch={dispatch}
                         addText={addText}
                         changeMessageValue={changeMessageValue}/>
        </div>
    )
}




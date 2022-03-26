import React from "react";

import s from './MessagePage.module.css'
import {MassageList} from "./MassegeList";
import {MessageInputPanel} from "./messageInputPanel";


const MessagePage = (props) => {


    return (
        <div className={s.content}>
            <div className={s.messageBox}>
                <MassageList state={props.state}/>
            </div>
            <div className={s.entryWindow}>
                <MessageInputPanel changeMessageValue={props.changeMessageValue}
                                   newPost={props.state.messagePage.newPost}
                                   addText={props.addText}/>
            </div>

        </div>
    )
}
export default MessagePage



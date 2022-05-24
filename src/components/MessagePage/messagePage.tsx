import React from "react";
import s from './MessagePage.module.css'
import {MassageList} from "./MassegeList";
import {MessageInputPanel} from "./messageInputPanel";


export const MessagePage = () => {

    return (
        <div className={s.content}>

            <div className={s.messageBox}>
                <MassageList/>
            </div>

            <div className={s.entryWindow}>
                <MessageInputPanel/>
            </div>

        </div>
    )
}




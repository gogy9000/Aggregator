import React, {useEffect, useRef, useState} from "react";
import s from './MessagePage.module.css'
import {MassageList} from "./MassegeList";
import {MessageInputPanel} from "./messageInputPanel";

export type MessagesData = {
    "userId": number
    "userName": string
    "message": string
    "photo": string | null
}

export const MessagePage = () => {

    let [ws, setWs] = useState<WebSocket | null>(null)
    const [messagesData, setMessagesData] = useState<MessagesData[]>([])
    const messageList = useRef<HTMLDivElement>(null)
    useEffect(() => {
        setWs(new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"))
        return () => {
            ws && ws.close()
        }
    }, [])

    if (ws) {
        ws.onmessage = (messageEvent: MessageEvent) => {
            const newMessages = JSON.parse(messageEvent.data)
            setMessagesData((state) => [...state, ...newMessages])
            messageList.current?.scrollTo(0, messageList.current.scrollHeight)
        }
    }

    const sendMessage = (value: string) => {
        ws && ws.send(value)
    }
    return (
        <div className={s.content}>
            <div className={s.messageBox} ref={messageList}>
                <MassageList messagesData={messagesData}/>
            </div>
            <div className={s.entryWindow}>
                <MessageInputPanel sendMessage={sendMessage}/>
            </div>
        </div>
    )
}




import React, {useEffect, useRef, useState} from "react";
import s from './MessagePage.module.css'
import {MassageList} from "./MassegeList";
import {MessageInputPanel} from "./messageInputPanel";
import {MessageEntity} from "../../Api/WebSocketAPI";
import {useDispatchApp, useSelectorApp} from "../../customHooks/CustomHooks";
import {messagePageActions, messagePageActivators} from "../../Redux/MessagePage/MessagePageReducer";



export const MessagePage = () => {

    // let [ws, setWs] = useState<WebSocket | null>(null)
    // const [messagesData, setMessagesData] = useState<MessageEntity[]>([])
    const messageList = useRef<HTMLDivElement>(null)
    const messagesData=useSelectorApp(state => state.messagePage.messagesData)
    const dispatch=useDispatchApp()
    useEffect(() => {
        // setWs(new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"))
       dispatch(messagePageActivators.getMessages())

        return () => {
            dispatch(messagePageActivators.closeChanel())
            dispatch(messagePageActions.clearMessages())
        }
    }, [])

    useEffect(()=>{
        messageList.current?.scrollTo(0, messageList.current.scrollHeight)
    },[messagesData])

    // if (ws) {
    //     ws.onmessage = (messageEvent: MessageEvent) => {
    //         const newMessages = JSON.parse(messageEvent.data)
    //         setMessagesData((state) => [...state, ...newMessages])
    //         messageList.current?.scrollTo(0, messageList.current.scrollHeight)
    //     }
    // }
    const sendMessage = (value: string) => {
        dispatch(messagePageActivators.sendMessage(value))
        // ws && ws.send(value)
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




import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/Redux-store";
import {MessageBlock} from "./MessageBlock";
import {MessageEntity} from "../../Api/WebSocketAPI";


type MassageListPropsType={
    messagesData:MessageEntity[]
}
export const MassageList:FC<MassageListPropsType> = ({messagesData}) => {

    return (
        <>
            {
                messagesData.map(
                    (item,index) => <MessageBlock
                        name={item.userName}
                        avatar={item.photo}
                        message={{message: item.message}}
                        key={index+item.userName}/>
                )
            }
        </>
    )
}



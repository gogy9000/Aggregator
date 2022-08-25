import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {MessageBlock} from "./MessageBlock";
import {MessagesData} from "./messagePage";

type MassageListPropsType={
    messagesData:MessagesData[]
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



import {InferActionsTypes} from "../Redux-store";


export type MessagesType ={
    "userId": number
    "userName": string
    "message": string
    "photo": string | null
}


export type stateMessagePageType={
    messagesData: Array<MessagesType>
}

let initialState:stateMessagePageType = {
    messagesData: [],
}

enum Message {
    getMessages="getMessages"
}

export const messagePageReducer = (state:stateMessagePageType = initialState, action:ActionsMessageType):stateMessagePageType => {


    switch (action.type) {
        case Message.getMessages:
            return {
                ...state,messagesData:action.payload
            }

        default:
            return state

    }

}


export type ActionsMessageType = InferActionsTypes<typeof actions>

export const actions = {
    getMessages:(payload:MessagesType[])=>({type:Message.getMessages, payload})
}



import {v1} from "uuid";
import {InferActionsTypes} from "../Redux-store";


type messagePageType={
    id: string
    name: string
    old: number
    message: {message: string }
}


export type stateMessagePageType={
    messagePage: Array<messagePageType>
    newPost:string
}

let initialState:stateMessagePageType = {
    messagePage: [
        {id: v1(), name: 'sasha', old: 56, message: {message:'да я с твоей мамкой  танцевал!'}},
    ],
    newPost: '',
}



export const messagePageReducer = (state:stateMessagePageType = initialState, action:ActionsMessageType):stateMessagePageType => {


    switch (action.type) {

        case 'ADD-TEXT':

            let newText = {
                id: v1(),
                name: 'Pasha',
                old: Math.round(Math.random() * 100),
                message: action.payload
            }

            return {...state, messagePage:[...state.messagePage, newText],newPost:''}

        case 'ON-CHANGE':

            return {...state,newPost:action.newText}

        default:
            return state

    }

}


export type ActionsMessageType = InferActionsTypes<typeof actions>

export const actions = {
    addTextAC:(payload:{message:string}) => ({type: 'ADD-TEXT',payload} as const),
    onChangeAC:(text:string) => ({type: 'ON-CHANGE', newText: text} as const)
}

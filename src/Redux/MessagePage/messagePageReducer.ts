import {v1} from "uuid";
import {InferActionsTypes} from "../Redux-store";


type messagePageType={
    id: string
    name: string
    old: number
    message: string
}


export type stateMessagePageType={
    messagePage: Array<messagePageType>
    newPost:string
}

let initialState:stateMessagePageType = {
    messagePage: [
        {id: v1(), name: 'sasha', old: 56, message: 'да я с твоей мамкой  танцевал!'},
    ],
    newPost: '',
}



export const messagePageReducer = (state = initialState, action:ActionsType) => {


    switch (action.type) {

        case 'ADD-TEXT':

            let newText = {
                id: v1(),
                name: 'Pasha',
                old: Math.round(Math.random() * 100),
                message: state.newPost
            }

            return {...state, messagePage:[...state.messagePage, newText],newPost:''}

        case 'ON-CHANGE':

            return {...state,newPost:action.newText}

        default:
            return state

    }

}
// type addTextACType={type: typeof ADD_TEXT}
// const ADD_TEXT = 'ADD-TEXT'
// export const addTextAC = ():addTextACType => ({type: ADD_TEXT})
//
// type onChangeACType={type: typeof ON_CHANGE, newText:string}
// const ON_CHANGE = 'ON-CHANGE'
// export const onChangeAC = (text:string):onChangeACType => ({type: ON_CHANGE, newText: text})

type ActionsType= InferActionsTypes<typeof actions>

export const actions = {
    addTextAC:() => ({type: 'ADD-TEXT'} as const),
    onChangeAC:(text:string) => ({type: 'ON-CHANGE', newText: text} as const)
}

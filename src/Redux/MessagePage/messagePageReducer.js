let initialState = {
    messagePage: [
        {id: 1, name: 'sasha', old: 56, message: 'да я с твоей мамкой  танцевал!'},

    ],
    newPost: '',
}


export const messagePageReducer = (state = initialState, action) => {
debugger

    switch (action.type) {

        case 'ADD-TEXT':

            let newText = {
                id: Math.round(state.messagePage.length * Math.random() * 10000000),
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
const ADD_TEXT = 'ADD-TEXT'
export const addTextAC = () => ({type: ADD_TEXT})
const ON_CHANGE = 'ON-CHANGE'
export const onChangeAC = (text) => ({type: ON_CHANGE, newText: text})



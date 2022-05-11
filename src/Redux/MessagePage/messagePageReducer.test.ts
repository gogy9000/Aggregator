import {actions, messagePageReducer, stateMessagePageType} from "./messagePageReducer";



let state: stateMessagePageType

beforeEach(()=>{
    state={
        messagePage: [
            {id: '1', name: 'sasha', old: 56, message: 'да я с твоей мамкой  танцевал!'},
        ],
        newPost: '',
    }
})
test('newPost should be changed',()=>{
    let action= actions.onChangeAC('!!!')
    let newState=messagePageReducer(state,action)
    expect(newState.newPost).toBe('!!!')
})
test('new message should be created',()=>{
    let action=actions.addTextAC()
    let newState=messagePageReducer(state,action)
    expect(newState.messagePage.length).toBe(2)
})
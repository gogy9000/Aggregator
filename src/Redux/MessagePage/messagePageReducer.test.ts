import {actions, messagePageReducer, stateMessagePageType} from "./messagePageReducer";



let state: stateMessagePageType

beforeEach(()=>{
    // state={
    //     messagesData: [
    //         {id: '1', name: 'sasha', old: 56, message: {message:'да я с твоей мамкой  танцевал!'}},
    //     ],
    //     newPost: '',
    // }
})
// test('newPost should be changed',()=>{
//     let action= actions.onChangeAC('!!!')
//     let newState=messagePageReducer(state,action)
//     expect(newState.newPost).toBe('!!!')
// })
// test('new message should be created',()=>{
//     let action=actions.addTextAC({message:'a'})
//     let newState=messagePageReducer(state,action)
//     expect(newState.messagesData.length).toBe(2)
// })
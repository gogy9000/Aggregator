import {messagePageActions, messagePageWorkers, StateMessagePageType} from "./MessagePageReducer";
import {MessageEntity} from "../../Api/WebSocketAPI";
import {call, put} from "redux-saga/effects";

describe("MessagePageReducerSagaTests",()=>{
    let state: StateMessagePageType
    let message: MessageEntity
    let gen:Generator
    beforeEach(()=>{
        // gen=messagePageWorkers.getMessages()
        state={
            messagesData:[]
        }
        message={message:"",photo:"",userId: 2,userName:""}
    })
    // it("getMessage should be worked of a good response",()=>{
    //     expect(gen.next().value).toEqual(call(socket.createNewSocket))
    //     expect(gen.next().value).toEqual(call(socket.subscribeOnEvent,()=>{return}))
    //     expect(gen.next([message]).value).toEqual(put(messagePageActions.getMessages([message])))
    // })
})
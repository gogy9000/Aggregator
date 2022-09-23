import {messagePageActions, messagePageReducer, StateMessagePageType} from "./MessagePageReducer";
import {MessageEntity} from "../../Api/WebSocketAPI";


describe("messagePageActions",()=>{
    let state: StateMessagePageType
    let message: MessageEntity
    beforeEach(()=>{
        state={
            messagesData:[]
        }
        message={message:"",photo:"",userId: 2,userName:""}
    })
   it("messages should be loaded in state",()=>{
       let action=messagePageActions.getMessages([message])
       let newState=messagePageReducer(state,action)
       expect(newState.messagesData.length).toBe(1)
   })
})


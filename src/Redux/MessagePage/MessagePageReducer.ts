import {InferActionsTypes} from "../Redux-store";
import {MessageEntity, socket} from "../../Api/WebSocketAPI";
import {actionChannel, ActionChannelEffect, call, cancel, put, take, takeEvery} from "redux-saga/effects";
import {fork} from "child_process";
import {EventChannel} from "redux-saga";

export type StateMessagePageType = {
    messagesData: Array<MessageEntity>
}

let initialState: StateMessagePageType = {
    messagesData: [],
}


export const messagePageReducer = (state: StateMessagePageType = initialState, action: ActionsMessageType): StateMessagePageType => {
    switch (action.type) {
        case MessageActionsConst.getMessages:
            return {
                ...state, messagesData:[...state.messagesData,...action.payload]
            }
        case MessageActionsConst.clearMessages:
            return {
                ...state, messagesData:[]
            }
        default:
            return state
    }
}

export type ActionsMessageType = InferActionsTypes<typeof messagePageActions | typeof messagePageActivators>

enum MessageActionsConst {
    getMessages = "MESSAGE-PAGE/GET-MESSAGES/ACTION",
    clearMessages="MESSAGE-PAGE/CLEAR-MESSAGES/ACTION"
}
enum MessagePageActivatorsConst {
    getMessages="MESSAGE-PAGE/GET-MESSAGES/ACTIVATOR",
    sendMessage="MESSAGE-PAGE/SEND-MESSAGE/ACTIVATOR",
    closeChannel="MESSAGE-PAGE/CLOSE-CHANNEL/ACTIVATOR"
}

export const messagePageActions = {
    getMessages: (payload: MessageEntity[]) => ({type: MessageActionsConst.getMessages, payload}as const),
    clearMessages:()=>({type:MessageActionsConst.clearMessages}as const)
}
export const messagePageActivators = {
    getMessages: () => ({type: MessagePageActivatorsConst.getMessages} as const),
    sendMessage:(message:string)=>({type:MessagePageActivatorsConst.sendMessage,message} as const),
    closeChanel:()=>({type:MessagePageActivatorsConst.closeChannel}as const)
}

export const messagePageWorkers = {
    getMessages: function* () {
        yield call(socket.createNewSocket.bind(socket))
        const channel: EventChannel<any> =yield call(socket.subscribeOnEvent.bind(socket))
        console.log(channel)
        while (true){
            const messageEvent:MessageEntity[]=yield take(channel)
            console.log(messageEvent)
            yield put(messagePageActions.getMessages(messageEvent))
        }
    },
    sendMessage:function* (action: ReturnType<typeof messagePageActivators.sendMessage>) {
        yield call(socket.sendMessage.bind(socket),action.message)
    },
    closeChanel:function* () {
        yield call(socket.closeSocket.bind(socket))
    }

    // listenForSocketMessages: function* () {
    //     let socket;
    //     let socketChannel;
    //
    //     try {
    //         socket:WebSocket = yield call(createWebSocketConnection);
    //         // @ts-ignore
    //         socketChannel = yield call(createSocketChannel, socket);
    //
    //         // // tell the application that we have a connection
    //         // yield dispatch(LiveDataActions.connectionSuccess());
    //
    //         while (true) {
    //             // wait for a message from the channel
    //             const payload:MessageEntity[] = yield take(socketChannel);
    //
    //             // a message has been received, dispatch an action with the message payload
    //             yield put(messagePageActions.getMessages(payload));
    //         }
    //     } catch (error) {
    //         // yield dispatch(LiveDataActions.connectionError('Error while connecting to the WebSocket'));
    //     } finally {
    //         // if (yield cancelled()) {
    //         //     // close the channel
    //         //     socketChannel.close();
    //         //
    //         //     // close the WebSocket connection
    //         //     socket.close();
    //         // } else {
    //         //     // yield dispatch(LiveDataActions.connectionError('WebSocket disconnected'));
    //         // }
    //     }
    // }
}

export function* messagePageWatcher(){
    yield takeEvery(MessagePageActivatorsConst.getMessages,messagePageWorkers.getMessages)
    yield takeEvery(MessagePageActivatorsConst.sendMessage,messagePageWorkers.sendMessage)
    yield takeEvery(MessagePageActivatorsConst.closeChannel,messagePageWorkers.closeChanel)

    // yield t(messagePageWorkers.getMessages)
}



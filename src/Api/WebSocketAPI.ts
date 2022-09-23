import {END, eventChannel} from "redux-saga";

export type MessageEntity = {
    "userId": number
    "userName": string
    "message": string
    "photo": string | null
}

export const socket = {
    webSocket:null  as null | WebSocket,

    createNewSocket() {
        return new Promise((resolve, reject) => {
            this.webSocket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

            this.webSocket.onopen = function () {
                    resolve(socket);
                };

            this.webSocket.onerror = function (evt) {
                    reject(evt);
                }
            }
        );

    },
    subscribeOnEvent() {
        return eventChannel(emit => {
            this.webSocket!.onmessage = (event) => {
                let messages=JSON.parse(event.data)
                    emit(messages)
                }
            this.webSocket!.onclose = () => {
                    emit(END);
                }
            return () => this.webSocket!.onmessage = null;

            }

        )
    },
    sendMessage(message:string){
        this.webSocket?.send(message)
    },
    closeSocket(){
        this.webSocket?.close()
    }
}





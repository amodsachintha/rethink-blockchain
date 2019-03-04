"use strict";

class Message{

    constructor(messageType,payload){
        this.messageType = messageType;
        this.payload = payload;
    }

    print(){
        console.log('messageType :' + this.messageType);
        console.log('payload :' + this.payload);
    }
}

module.exports = {
    Message
};
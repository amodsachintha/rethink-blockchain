const sha256 = require('crypto-js/sha256');
const server = require('./util/server');
const client = require('./util/client');
const chain = require('./blockchain');

server.on('connection', (socket) => {
    console.log('Connection: ' + socket.id);
    socket.on('vault', (data) => {
        console.log('vault ' + JSON.stringify(data))
    });
});

let block = chain.Block;

block.data = {

};

client.socket.emit('vault', {
    type: "PEER_DISCOVERY",
    data: {
        id: sha256('ddgdvdvd').toString(),
        url: ""
    }
});

client.socket.emit('vault', {
    type: "PEER_DISCOVERY",
    data: {
        id: sha256('dgfbr').toString(),
        url: ""
    }
});
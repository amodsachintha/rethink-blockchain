"use strict";
const sha256 = require('crypto-js/sha256');
const server = require('./util/server');
const client = require('./util/client');
const chain = require('./blockchain');
const models = require('./util/models');

server.on('connection', (connection) => {
    // console.log('Connection: ' + connection.id);
    connection.on('vault', (data) => {
        console.log('vault ' + JSON.stringify(data))
    });

});

client.addSocket('172.18.0.2');
client.addSocket('172.18.0.3');

client.sockArr.forEach((socket)=>{
    // socket.emit('vault', new models.Message('HELLO',{}));
});

chain.init();
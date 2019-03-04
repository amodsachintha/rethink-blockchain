"use strict";
const io = require('socket.io-client');
const portscanner = require('portscanner');

let ipArr = [];
let sockArr = [];
const protocol = 'http://';
const port = ':3000';


let addSocket = function (ip) {
    ipArr.push(ip);
    let sockAddr = protocol + ipArr[ipArr.length - 1] + port;
    let socket = io.connect(sockAddr);
    sockArr.push(socket);
};


module.exports = {
    addSocket,
    sockArr
};
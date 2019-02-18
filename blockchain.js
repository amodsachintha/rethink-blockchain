'use strict';

const crypto = require('crypto-js');
const socket = require('./util/server');

const thinky = require("./util/thinky");
const type = thinky.type;

const peer_list = [];

let Block = thinky.createModel("Block",{
    id: type.string(),
    index: type.number().integer(),
    previousHash: type.string(),
    timestamp: type.string(),
    data: {
        part_id: type.string(),
        part_name: type.string(),
        part_url: type.string(),
        part_host: type.string(),
    },
    hash: type.string(),
});

module.exports = {Block};






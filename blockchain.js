'use strict';

const crypto = require('crypto-js');
const socket = require('./util/server');
const _ = require('lodash');
const thinky = require("./util/thinky");
const r = thinky.r;
const type = thinky.type;


let Block = thinky.createModel("blockchain", {
    id: type.string(),
    index: type.number().integer(),
    previousHash: type.string(),
    hash: type.string(), // hash of block, timestamp and prev hash
    timestamp: type.date(),
    block: {
        filename: type.string(),
        filehash: type.string(),
        filesize: type.string(),
        fragment_count: type.number().integer(),
    },
    metadata: {
        owner: type.string(),
        deleted: type.boolean(),
        enc_key: type.string(),
    }
});
Block.ensureIndex('index');

let previousBlock;

let getGenesisBlock = () => {
    let genesisBlock = new Block({
        index: 0,
        previousHash: '0',
        hash: '',
        timestamp: new Date(2019, 2, 4, 3),
        block: {
            filename: 'vault',
            filehash: crypto.SHA256('vault').toString(),
            filesize: '0',
            fragment_count: 0
        },
        metadata: {
            owner: 'self',
            deleted: false,
            enc_key: '00000000',
        }
    });

    genesisBlock.hash = calculateHash(genesisBlock);
    genesisBlock.saveAll().then((result) => {
        previousBlock = result;
    });
    return genesisBlock;
};

let calculateHash = (block) => {
    let temp = block.previousHash + block.timestamp + block.block;
    return crypto.SHA256(temp).toString();
};

let pushToBlockchain = (block) => {
    if (isValidNewBlock(block)) {
        block.saveAll().then((result) => {
            previousBlock = result;
        });
    }
};

let isValidNewBlock = (newBlock) => {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (calculateHash(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHash(newBlock));
        console.log('invalid hash: ' + calculateHash(newBlock) + ' ' + newBlock.hash);
        return false;
    }
    return true;
};

let setPreviousBlock = (block) => {
    previousBlock = block;
};


let init = () => {
    console.log('initializing blockchain...');
    thinky.dbReady().then(() => {
        r.tableList().contains('blockchain').run().then(res => {
            if (res) {
                // table "blockchain" exists
                r.table('blockchain').count().run().then(count => {
                    r.table('blockchain').filter(r.row('index').eq(_.parseInt(count) - 1)).run((err, cursor) => {
                        if (err) console.log(err.message);
                        if (_.size(cursor) === 0) {
                            console.log('Table \"blockchain\" exists, but got no data :/' +
                                ' therefore, generating genesis block');
                            getGenesisBlock();
                        } else {
                            Block.get(cursor[0].id).run().then((res) => {
                                setPreviousBlock(res);
                                console.log('Got latest block from local chain with index: ' + res.index);

                                //todo QUERY REMOTES to get latest blockchain and update local chain and fragment_db accordingly

                            });
                        }
                    });
                });
            } else {
                // table "blockchain" is missing, so make one..
                getGenesisBlock();
            }
        });
    }).catch(err => {
        console.log(err);
    });
};

module.exports = {
    init,
    previousBlock,
};






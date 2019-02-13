const app = require('express');
let http = require('http').Server(app);
let socket = require('socket.io')(http);

http.listen(3000, () => {
    console.log('Listening on port 3000')
});

module.exports = socket;

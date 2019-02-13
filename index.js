const server = require('./util/server');
const client = require('./util/client');

server.on('connection', (socket) => {
    console.log('Connection: ' + socket.id);
    socket.on('one', (data) => {
        console.log('one ' + data)
    });
});

client.socket.emit('one', 'dgdg');
var service = require('express')();
var server = require('http').Server(service);
var io = require('socket.io')(server);
const ioClient = require('socket.io-client');
const LISTEN_PORT = 3001
server.listen(LISTEN_PORT);
console.log(`server listening on ${LISTEN_PORT}...`);


io.on('connection', function (socket) {
  socket.on('send_message_req', function (data) {
    console.log('文字列を受信');
    const res = {
      name: data.name + 'res by 1',
      message: data.message + 'res by 1'
    }
    io.emit('send_message_res', res);
  });
});

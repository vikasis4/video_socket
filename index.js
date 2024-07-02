var http = require("http");
var Server = require('socket.io').Server;
var io = new Server({
    cors: {
        allowedHeaders: ["*"],
        origin: "*",
    },
});
var httpServer = http.createServer();
var PORT = 9000;
io.attach(httpServer);
httpServer.listen(PORT, function () { return console.log("HTTP Server started at PORT:".concat(PORT)); });
io.on('connection', function (socket) {
    socket.join('room');
    socket.on('offer', function (data) {
        console.log('offer');
        socket.broadcast.to('room').emit('offer', data);
    });
    socket.on('answer', function (data) {
        console.log('ans');
        socket.broadcast.to('room').emit('answer', data);
    });
    socket.on('ice-candidates', function (data) {
        console.log('ice');
        socket.broadcast.to('room').emit('ice-candidates', data);
    });
});

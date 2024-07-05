var http = require("http");
var Server = require('socket.io').Server;
var io = new Server({
    cors: {
        allowedHeaders: ["*"],
        origin: "*",
    },
});
var httpServer = http.createServer();
var PORT = process.env.PORT || 9000;
io.attach(httpServer);

httpServer.listen(PORT, function () { return console.log("HTTP Server started at PORT:".concat(PORT)); });


io.on('connection', function (socket) {

    socket.on('room', function (data) {
        console.log('rom');
        socket.join(data)
        socket.broadcast.to(data).emit('room-joined', data);
    });
    socket.on('offer', function (data) {
        console.log('offer ', ' RoomId :- ', data.roomId);
        socket.broadcast.to(data.roomId).emit('offer', { offer: data.offer });
    });
    socket.on('answer', function (data) {
        console.log('Answer', ' RoomId :- ', data.roomId);
        socket.broadcast.to(data.roomId).emit('answer', { answer: data.answer });
    });
    socket.on('ice-candidates', function (data) {
        console.log('ice ', data.roomId);
        socket.broadcast.to(data.roomId).emit('ice-candidates', { data: data.data });
    });

});

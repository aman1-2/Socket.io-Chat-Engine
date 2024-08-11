const express = require('express');
const http = require('http');
const Socketio = require('socket.io');

const dbConnect = require('./config/dbconfig');

const PORT = 3002;

const startStopServer = async () => {
    const app = express();
    const server = http.createServer(app);
    const io = Socketio(server);

    io.on("connection", (socket) => {
        console.log("A new User Connected: ",socket.id);

        socket.on("Send_Msg", (data) => {
            io.emit("Rcvd_Msg", data);
        });
    });

    app.use('/' , express.static(__dirname + '/public'));

    server.listen(PORT, async () => {
        console.log(`Server Started at Port: ${PORT}`);
        await dbConnect();
    });
}

startStopServer();
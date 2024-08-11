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

    });

    app.set("view engine", "ejs"); //We can set a view engine -> ejs with the help of set method.

    app.use('/' , express.static(__dirname + '/public'));

    app.get('/chat/:roomid', (req, res) => {
        res.render("Index");
    });

    server.listen(PORT, async () => {
        console.log(`Server Started at Port: ${PORT}`);
        await dbConnect();
    });
}

startStopServer();
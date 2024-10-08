const express = require('express');
const http = require('http');
const Socketio = require('socket.io');
const Chat = require('./models/chat');

const dbConnect = require('./config/dbconfig');

const PORT = 3002;

const startStopServer = async () => {
    const app = express();
    const server = http.createServer(app);
    const io = Socketio(server);

    io.on("connection", (socket) => {
        console.log("A new User Connected: ",socket.id);

        socket.on("join_room", (data) => {
            console.log("Joined room: ",data.roomid);
            socket.join(data.roomid);
        });

        socket.on("Send_Msg", async (data) => {
            //Storing the message in DB before emitting it.
            const chat = Chat.create({
                content: data.msg,
                user: data.user,
                room: data.roomid
            });
            io.to(data.roomid).emit("Rcvd_Msg", data);
        });

        socket.on('typing', (data) => {
            socket.broadcast.to(data.roomid).emit('someone_typing');
        })
    });

    app.set("view engine", "ejs"); //We can set a view engine -> ejs with the help of set method.

    app.use('/' , express.static(__dirname + '/public'));

    app.get('/chat/:roomid', async (req, res) => { //With ejs we can now send the data which we can access in the ejs file.
        const chats = await Chat.find({room: req.params.roomid}).select("content user");
        res.render("Index",{
            id: req.params.roomid,
            chats: chats
        });
    });

    server.listen(PORT, async () => {
        console.log(`Server Started at Port: ${PORT}`);
        await dbConnect();
    });
}

startStopServer();
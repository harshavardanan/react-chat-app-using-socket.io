const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const socketio = require("socket.io")
const router = require("./router");
const PORT = process.env.PORT || 4000;
app.use(cors());

const {addUser, removeUser, getUser, getUsersInRoom} = require('./Users');
app.use(router);
const io = socketio(http,{cors:{origin:"*"}});
io.on("connect", socket => {
    console.log("user connected: " + socket.id);
    socket.on("join", ({ name, room }, callback) => {
        const {error, user} = addUser({id: socket.id, name, room });

        if(error) return callback(error);

        
        socket.emit("message",{user: "admin", text:`${user.name} welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit("message", {user:"admin", text:`${user.name} has joined!`});

        socket.join(user.room);
        io.to(user.room).emit("roomData", {room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });
   
    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit("message", { user: user.name, text: message });
        io.to(user.room).emit("roomData",{ room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });
    socket.on("disconnect", () => {
        console.log("received disconnect request");
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit("message", {user:'admin', text:`${user.name} has left!`});   
        }
    });
});
 
http.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
